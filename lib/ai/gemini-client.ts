import { google } from '@ai-sdk/google';

/**
 * Gemini 3 Pro Model Configuration
 * Using the latest Gemini 3 Pro Preview with enhanced reasoning
 */
export const geminiModel = google('gemini-3-pro-preview');

/**
 * Gemini configuration with thinking mode for deep reasoning
 */
export const geminiWithThinking = {
  model: geminiModel,
  providerOptions: {
    google: {
      thinkingConfig: {
        includeThoughts: true,
        thinkingLevel: 'high' as const, // Deep reasoning for mental health analysis
      },
    },
  },
};

/**
 * Standard Gemini configuration without thinking mode
 * Use for faster, less complex tasks
 */
export const geminiStandard = {
  model: geminiModel,
};
