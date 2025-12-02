/* ---------- AI-Powered Assessment Questions ---------- */
export const aiAssessmentQuestions = [
  {
    id: 'step-1',
    type: 'single-select',
    question: 'What brings you to MindFit today?',
    subtitle: 'Select your primary reason for seeking support',
    options: [
      {
        id: 'reason-1',
        title: 'Managing Anxiety',
        description: 'Feeling worried, stressed, or overwhelmed',
        icon: 'alert-circle-outline',
      },
      {
        id: 'reason-2',
        title: 'Depression Support',
        description: 'Low mood, lack of motivation, or sadness',
        icon: 'rainy-outline',
      },
      {
        id: 'reason-3',
        title: 'Relationship Issues',
        description: 'Challenges with partner, family, or friends',
        icon: 'people-outline',
      },
      {
        id: 'reason-4',
        title: 'Stress Management',
        description: 'Work stress, life transitions, or burnout',
        icon: 'flame-outline',
      },
      {
        id: 'reason-5',
        title: 'Personal Growth',
        description: 'Self-improvement and building confidence',
        icon: 'trending-up-outline',
      },
      {
        id: 'reason-6',
        title: 'Trauma or PTSD',
        description: 'Processing past experiences or trauma',
        icon: 'shield-outline',
      },
    ],
  },
  {
    id: 'step-2',
    type: 'multi-select',
    question: 'What symptoms are you experiencing?',
    subtitle: 'Select all that apply',
    options: [
      {
        id: 'symptom-1',
        title: 'Difficulty Sleeping',
        description: '',
        icon: 'moon-outline',
      },
      {
        id: 'symptom-2',
        title: 'Racing Thoughts',
        description: '',
        icon: 'flash-outline',
      },
      {
        id: 'symptom-3',
        title: 'Low Energy',
        description: '',
        icon: 'battery-dead-outline',
      },
      {
        id: 'symptom-4',
        title: 'Social Withdrawal',
        description: '',
        icon: 'person-remove-outline',
      },
      {
        id: 'symptom-5',
        title: 'Irritability',
        description: '',
        icon: 'warning-outline',
      },
      {
        id: 'symptom-6',
        title: 'Loss of Interest',
        description: '',
        icon: 'heart-dislike-outline',
      },
      {
        id: 'symptom-7',
        title: 'Physical Tension',
        description: '',
        icon: 'body-outline',
      },
      {
        id: 'symptom-8',
        title: 'Difficulty Concentrating',
        description: '',
        icon: 'eye-off-outline',
      },
    ],
  },
  {
    id: 'step-3',
    type: 'single-select',
    question: 'How long have you been experiencing these challenges?',
    subtitle: 'This helps us understand the timeline',
    options: [
      {
        id: 'duration-1',
        title: 'Less than a month',
        description: '',
        icon: 'calendar-outline',
      },
      {
        id: 'duration-2',
        title: '1-3 months',
        description: '',
        icon: 'calendar-outline',
      },
      {
        id: 'duration-3',
        title: '3-6 months',
        description: '',
        icon: 'calendar-outline',
      },
      {
        id: 'duration-4',
        title: '6-12 months',
        description: '',
        icon: 'calendar-outline',
      },
      {
        id: 'duration-5',
        title: 'More than a year',
        description: '',
        icon: 'calendar-outline',
      },
    ],
  },
  {
    id: 'step-4',
    type: 'single-select',
    question: 'Have you tried therapy before?',
    subtitle: 'Your experience helps us personalize your care',
    options: [
      {
        id: 'therapy-1',
        title: 'Yes, and it was helpful',
        description: 'I found therapy beneficial',
        icon: 'checkmark-circle-outline',
      },
      {
        id: 'therapy-2',
        title: 'Yes, but it wasn\'t helpful',
        description: 'My previous experience wasn\'t great',
        icon: 'close-circle-outline',
      },
      {
        id: 'therapy-3',
        title: 'No, this is my first time',
        description: 'I\'m new to therapy',
        icon: 'star-outline',
      },
      {
        id: 'therapy-4',
        title: 'Currently in therapy',
        description: 'I\'m looking for additional support',
        icon: 'heart-outline',
      },
    ],
  },
  {
    id: 'step-5',
    type: 'single-select',
    question: 'What type of therapy are you interested in?',
    subtitle: 'We can help you find the right approach',
    options: [
      {
        id: 'type-1',
        title: 'Talk Therapy',
        description: 'Traditional one-on-one counseling',
        icon: 'chatbubbles-outline',
      },
      {
        id: 'type-2',
        title: 'Cognitive Behavioral Therapy (CBT)',
        description: 'Focus on changing thought patterns',
        icon: 'bulb-outline',
      },
      {
        id: 'type-3',
        title: 'Mindfulness-Based Therapy',
        description: 'Meditation and present-moment awareness',
        icon: 'leaf-outline',
      },
      {
        id: 'type-4',
        title: 'Couples or Family Therapy',
        description: 'Work on relationships together',
        icon: 'people-outline',
      },
      {
        id: 'type-5',
        title: 'Not sure yet',
        description: 'Help me decide what\'s best',
        icon: 'help-circle-outline',
      },
    ],
  },
  {
    id: 'step-6',
    type: 'single-select',
    question: 'What is your preferred session format?',
    subtitle: 'Choose what works best for you',
    options: [
      {
        id: 'format-1',
        title: 'Video Sessions',
        description: 'Face-to-face online therapy',
        icon: 'videocam-outline',
      },
      {
        id: 'format-2',
        title: 'In-Person Sessions',
        description: 'Meet at our office locations',
        icon: 'location-outline',
      },
      {
        id: 'format-3',
        title: 'Phone Sessions',
        description: 'Audio-only conversations',
        icon: 'call-outline',
      },
      {
        id: 'format-4',
        title: 'Flexible',
        description: 'I\'m open to any format',
        icon: 'swap-horizontal-outline',
      },
    ],
  },
];

/* ---------- Assessment Response Types ---------- */
export interface AssessmentResponse {
  questionId: string;
  selectedOptions: string[];
}

export interface AssessmentData {
  responses: AssessmentResponse[];
  completedAt: string;
}
