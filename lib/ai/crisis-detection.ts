/**
 * Crisis Detection System
 * Identifies mental health crisis situations and provides appropriate resources
 */

export const CRISIS_KEYWORDS = [
  // Suicidal ideation
  'suicide', 'kill myself', 'end my life', 'want to die', 'better off dead',
  'no reason to live', 'take my life', 'end it all', 'suicidal',
  
  // Self-harm
  'self harm', 'self-harm', 'hurt myself', 'cut myself', 'harm myself',
  'cutting', 'burning myself',
  
  // Immediate danger
  'going to hurt', 'plan to', 'tonight', 'right now', 'can\'t go on',
  'goodbye forever', 'final message',
  
  // Severe distress
  'can\'t take it anymore', 'unbearable', 'hopeless', 'no way out',
];

export const CRISIS_RESOURCES = {
  us: {
    suicide: {
      name: '988 Suicide & Crisis Lifeline',
      number: '988',
      text: 'Text "HELLO" to 741741',
      description: '24/7 free and confidential support',
    },
    emergency: {
      name: 'Emergency Services',
      number: '911',
      description: 'For immediate life-threatening emergencies',
    },
    domestic_violence: {
      name: 'National Domestic Violence Hotline',
      number: '1-800-799-7233',
      description: '24/7 support for domestic violence',
    },
  },
};

export type CrisisLevel = 'none' | 'low' | 'medium' | 'high' | 'critical';

export interface CrisisDetectionResult {
  level: CrisisLevel;
  indicators: string[];
  resources: typeof CRISIS_RESOURCES.us;
  recommendedAction: string;
  responseTemplate: string;
}

/**
 * Detect crisis keywords in a message
 */
export function detectCrisisKeywords(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  return CRISIS_KEYWORDS.filter(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
}

/**
 * Determine crisis level based on detected keywords
 */
export function assessCrisisLevel(indicators: string[]): CrisisLevel {
  if (indicators.length === 0) return 'none';
  
  const criticalKeywords = ['suicide', 'kill myself', 'end my life', 'plan to', 'tonight', 'right now'];
  const hasCritical = indicators.some(ind => 
    criticalKeywords.some(critical => ind.includes(critical))
  );
  
  if (hasCritical) return 'critical';
  if (indicators.length >= 3) return 'high';
  if (indicators.length >= 2) return 'medium';
  return 'low';
}

/**
 * Get crisis response template
 */
export function getCrisisResponse(level: CrisisLevel): string {
  switch (level) {
    case 'critical':
      return `I'm very concerned about what you've shared. Your safety is the top priority right now.

**Please reach out for immediate help:**
📞 Call 988 (Suicide & Crisis Lifeline) - Available 24/7
💬 Text "HELLO" to 741741 (Crisis Text Line)
🚨 If you're in immediate danger, call 911

You don't have to face this alone. These trained counselors are ready to help you right now. Please reach out to them immediately.

Would you like me to help you find additional support resources?`;

    case 'high':
      return `I hear that you're going through a really difficult time, and I want you to know that support is available.

**Crisis Support Resources:**
📞 988 Suicide & Crisis Lifeline - Free, confidential, 24/7
💬 Text "HELLO" to 741741

These trained counselors can provide immediate support. Please consider reaching out to them.

I'm here to listen, but for the level of distress you're experiencing, speaking with a crisis counselor would be really helpful. Would you like to talk about what's been going on?`;

    case 'medium':
      return `Thank you for sharing what you're going through. It takes courage to open up about difficult feelings.

If you're having thoughts of harming yourself, please know that help is available 24/7:
📞 988 Suicide & Crisis Lifeline
💬 Text "HELLO" to 741741

I'm here to support you in finding the right professional help. Would you like to explore therapy options or talk about what's been troubling you?`;

    case 'low':
      return `I appreciate you sharing your feelings with me. If things ever feel overwhelming, remember that support is always available:

📞 988 Suicide & Crisis Lifeline (24/7)

Let's work together to find the right support for you. What kind of help are you looking for?`;

    default:
      return '';
  }
}

/**
 * Complete crisis detection analysis
 */
export function analyzeCrisisRisk(message: string): CrisisDetectionResult {
  const indicators = detectCrisisKeywords(message);
  const level = assessCrisisLevel(indicators);
  const responseTemplate = getCrisisResponse(level);
  
  let recommendedAction = '';
  switch (level) {
    case 'critical':
      recommendedAction = 'IMMEDIATE ESCALATION: Alert support team, provide crisis resources, log incident';
      break;
    case 'high':
      recommendedAction = 'URGENT: Provide crisis resources, encourage immediate professional help, monitor closely';
      break;
    case 'medium':
      recommendedAction = 'CAUTION: Provide resources, encourage professional support, document conversation';
      break;
    case 'low':
      recommendedAction = 'AWARENESS: Mention available resources, continue supportive conversation';
      break;
    default:
      recommendedAction = 'STANDARD: Continue normal conversation flow';
  }
  
  return {
    level,
    indicators,
    resources: CRISIS_RESOURCES.us,
    recommendedAction,
    responseTemplate,
  };
}
