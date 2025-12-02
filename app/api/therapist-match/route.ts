import { topProviders } from '@/constants/data';
import { geminiWithThinking } from '@/lib/ai/gemini-client';
import { THERAPIST_MATCHING_PROMPT } from '@/lib/ai/prompts';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { userProfile, assessmentAnalysis } = await req.json();

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

    return Response.json({
      recommendations,
      rawAnalysis: text,
    });
  } catch (error) {
    console.error('Therapist matching error:', error);
    return Response.json(
      { error: 'Failed to match therapists' },
      { status: 500 }
    );
  }
}

/**
 * Parse AI recommendations and match with actual therapist data
 */
function parseTherapistRecommendations(text: string, therapists: any[]) {
  // Extract recommended therapist names from the AI response
  const recommendations = [];
  
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
