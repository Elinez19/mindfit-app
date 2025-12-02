import { topProviders } from '@/constants/data';
import { geminiWithThinking } from '@/lib/ai/gemini-client';
import { THERAPIST_MATCHING_PROMPT } from '@/lib/ai/prompts';
import { generateText } from 'ai';

export interface TherapistRecommendation {
  therapist: any;
  reasoning: string;
  matchScore: number;
}

export interface TherapistMatchResult {
  recommendations: TherapistRecommendation[];
  rawAnalysis: string;
}

export async function matchTherapists(
  userProfile: any,
  assessmentAnalysis: any
): Promise<TherapistMatchResult> {
  try {
    // Prepare therapist data for AI matching
    const therapistsData = topProviders.map(provider => ({
      id: provider.id,
      name: provider.name,
      role: provider.role,
      rating: provider.rating,
      // In a real app, you'd include more details like:
      // specializations, approach, availability, bio, etc.
    }));

    // Generate AI-powered therapist matching
    const prompt = THERAPIST_MATCHING_PROMPT
      .replace('{userProfile}', JSON.stringify(userProfile, null, 2))
      .replace('{therapists}', JSON.stringify(therapistsData, null, 2));

    const { text } = await generateText({
      ...geminiWithThinking,
      prompt,
    });

    // Parse the recommendations
    const recommendations = parseTherapistRecommendations(text, therapistsData);

    return {
      recommendations,
      rawAnalysis: text,
    };
  } catch (error) {
    console.error('Therapist matching error:', error);
    throw new Error('Failed to match therapists');
  }
}

/**
 * Parse AI recommendations and match with actual therapist data
 */
function parseTherapistRecommendations(text: string, therapists: any[]) {
  // Extract recommended therapist names from the AI response
  const recommendations: TherapistRecommendation[] = [];
  
  for (const therapist of therapists) {
    if (text.includes(therapist.name)) {
      // Extract the reasoning for this therapist
      const reasoningRegex = new RegExp(
        `${therapist.name}[\\s\\S]*?(?=\\d+\\.|$)`,
        'i'
      );
      const match = text.match(reasoningRegex);
      
      recommendations.push({
        therapist,
        reasoning: match ? match[0].trim() : '',
        matchScore: calculateMatchScore(text, therapist.name),
      });
    }
  }

  // Sort by match score
  recommendations.sort((a, b) => b.matchScore - a.matchScore);

  return recommendations.slice(0, 3); // Return top 3
}

/**
 * Calculate a simple match score based on mention frequency and context
 */
function calculateMatchScore(text: string, therapistName: string): number {
  const mentions = (text.match(new RegExp(therapistName, 'gi')) || []).length;
  const hasTopRecommendation = text.toLowerCase().includes(`1. ${therapistName.toLowerCase()}`);
  
  let score = mentions * 10;
  if (hasTopRecommendation) score += 50;
  
  return score;
}
