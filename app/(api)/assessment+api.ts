 import { analyzeCrisisRisk } from '@/lib/ai/crisis-detection';
import { geminiWithThinking } from '@/lib/ai/gemini-client';
import { ASSESSMENT_ANALYSIS_PROMPT } from '@/lib/ai/prompts';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { assessmentData } = await req.json();

    // First, check for crisis indicators in the assessment
    const allResponses = Object.values(assessmentData).join(' ');
    const crisisAnalysis = analyzeCrisisRisk(allResponses);

    // If critical crisis detected, return immediate crisis response
    if (crisisAnalysis.level === 'critical' || crisisAnalysis.level === 'high') {
      return Response.json({
        isCrisis: true,
        crisisLevel: crisisAnalysis.level,
        crisisResponse: crisisAnalysis.responseTemplate,
        resources: crisisAnalysis.resources,
      });
    }

    // Generate AI analysis using Gemini 3 with deep reasoning
    const prompt = ASSESSMENT_ANALYSIS_PROMPT.replace(
      '{assessmentData}',
      JSON.stringify(assessmentData, null, 2)
    );

    const { text } = await generateText({
      ...geminiWithThinking,
      prompt,
    });

    // Parse the AI response
    const analysis = parseAssessmentAnalysis(text);

    return Response.json({
      isCrisis: false,
      crisisLevel: crisisAnalysis.level,
      analysis,
      rawAnalysis: text,
    });
  } catch (error) {
    console.error('Assessment analysis error:', error);
    return Response.json(
      { error: 'Failed to analyze assessment' },
      { status: 500 }
    );
  }
}

/**
 * Parse the AI-generated analysis into structured data
 */
function parseAssessmentAnalysis(text: string) {
  // Extract sections from the AI response
  const sections = {
    primaryConcerns: extractSection(text, 'Primary Concerns'),
    recommendedTherapy: extractSection(text, 'Recommended Therapy Type'),
    therapistSpecialization: extractSection(text, 'Therapist Specialization'),
    wellnessPlan: extractSection(text, 'Initial Wellness Plan'),
    urgencyLevel: extractSection(text, 'Urgency Level'),
    additionalResources: extractSection(text, 'Additional Resources'),
  };

  return sections;
}

/**
 * Extract a specific section from the AI response
 */
function extractSection(text: string, sectionName: string): string {
  const regex = new RegExp(`\\*\\*${sectionName}\\*\\*:?\\s*([\\s\\S]*?)(?=\\n\\*\\*|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}
