# 🤖 AI-Powered Mental Health Assessment - Implementation Guide

## Overview

This document explains the Gemini 3 AI integration for the MindFit mental wellness application. We've implemented an intelligent assessment system that uses Google's latest Gemini 3 Pro model with enhanced reasoning capabilities.

## 🎯 What We've Built

### Phase 1: AI-Powered Assessment System ✅

We've successfully implemented:

1. **Intelligent Mental Health Assessment**
   - 6-step conversational questionnaire
   - Multi-select and single-select questions
   - Real-time progress tracking
   - Crisis detection system

2. **AI Analysis with Gemini 3**
   - Deep reasoning using "thinking mode"
   - Personalized recommendations
   - Therapist specialization matching
   - Urgency level assessment
   - Custom wellness plans

3. **Therapist Matching**
   - AI-powered matching algorithm
   - Match score calculation
   - Detailed reasoning for each recommendation
   - Top 3 therapist suggestions

4. **Crisis Detection & Safety**
   - Keyword-based crisis detection
   - Multi-level urgency assessment (none/low/medium/high/critical)
   - Immediate resource provision (988 hotline, crisis text line)
   - Automatic escalation protocols

## 📁 File Structure

```
mindfit-app/
├── lib/
│   └── ai/
│       ├── gemini-client.ts          # Gemini 3 configuration
│       ├── prompts.ts                # System prompts for mental health
│       └── crisis-detection.ts       # Crisis detection system
├── app/
│   ├── api/
│   │   ├── assessment/
│   │   │   └── route.ts              # AI assessment analysis endpoint
│   │   └── therapist-match/
│   │       └── route.ts              # Therapist matching endpoint
│   └── (auth)/
│       ├── ai-assessment.tsx         # Main assessment screen
│       ├── assessment-results.tsx    # AI analysis results
│       └── therapist-matches.tsx     # Matched therapists display
└── constants/
    └── ai-assessment.ts              # Assessment questions data
```

## 🚀 Setup Instructions

### 1. Install Dependencies

The following packages are required (installation in progress):

```bash
npm install ai @ai-sdk/google zod
```

### 2. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
```

**Important:** Never commit your `.env` file to version control!

### 4. Update Expo Configuration

For Expo projects, you'll need to use `expo-constants` to access environment variables:

```typescript
// lib/ai/gemini-client.ts
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.GOOGLE_GENERATIVE_AI_API_KEY;
```

And update your `app.json`:

```json
{
  "expo": {
    "extra": {
      "GOOGLE_GENERATIVE_AI_API_KEY": process.env.GOOGLE_GENERATIVE_AI_API_KEY
    }
  }
}
```

## 🎨 Features Implemented

### 1. AI Assessment Screen (`ai-assessment.tsx`)

**Features:**
- 6-step mental health questionnaire
- Visual progress indicator
- Single and multi-select questions
- Skip option for optional questions
- Real-time validation
- Loading state during AI analysis
- Crisis detection integration

**User Flow:**
1. User answers 6 questions about their mental health
2. System collects responses
3. On completion, data is sent to AI for analysis
4. Crisis detection runs automatically
5. Results displayed on next screen

### 2. Assessment Results Screen (`assessment-results.tsx`)

**Features:**
- AI-generated analysis display
- Urgency level indicator with color coding
- Structured sections:
  - Primary Concerns
  - Recommended Therapy Type
  - Ideal Therapist Profile
  - Initial Wellness Plan
  - Additional Resources
- "Find My Therapist" CTA
- "Save & Sign Up" option

### 3. Therapist Matches Screen (`therapist-matches.tsx`)

**Features:**
- Top 3 AI-matched therapists
- Match score percentage
- Detailed AI reasoning for each match
- Therapist profiles with ratings
- Selection interface
- "Book First Session" CTA

### 4. Crisis Detection System

**Safety Features:**
- Automatic keyword detection
- 5-level urgency assessment
- Crisis resources (988, Crisis Text Line)
- Immediate intervention protocols
- Logging and monitoring

**Crisis Keywords Monitored:**
- Suicidal ideation
- Self-harm intentions
- Immediate danger indicators
- Severe distress signals

## 🔧 API Endpoints

### POST `/api/assessment`

Analyzes user assessment data using Gemini 3.

**Request:**
```json
{
  "assessmentData": {
    "What brings you to MindFit today?": "Managing Anxiety",
    "What symptoms are you experiencing?": "Difficulty Sleeping, Racing Thoughts",
    ...
  }
}
```

**Response:**
```json
{
  "isCrisis": false,
  "crisisLevel": "low",
  "analysis": {
    "primaryConcerns": "...",
    "recommendedTherapy": "...",
    "therapistSpecialization": "...",
    "wellnessPlan": "...",
    "urgencyLevel": "...",
    "additionalResources": "..."
  }
}
```

### POST `/api/therapist-match`

Matches user with suitable therapists using AI.

**Request:**
```json
{
  "userProfile": {
    "concerns": "Anxiety, stress management",
    "preferredTherapy": "CBT"
  },
  "assessmentAnalysis": { ... }
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "therapist": { ... },
      "reasoning": "...",
      "matchScore": 95
    }
  ]
}
```

## 🧠 AI Configuration

### Gemini 3 Pro with Thinking Mode

We use Gemini 3's enhanced reasoning capabilities:

```typescript
const geminiWithThinking = {
  model: google('gemini-3-pro-preview'),
  providerOptions: {
    google: {
      thinkingConfig: {
        includeThoughts: true,
        thinkingLevel: 'high', // Deep reasoning for mental health
      },
    },
  },
};
```

**Why "high" thinking level?**
- Mental health requires nuanced understanding
- Complex pattern recognition
- Empathetic response generation
- Multi-factor decision making

### System Prompts

All AI interactions use carefully crafted prompts that:
- Emphasize ethical guidelines
- Prevent misuse (no diagnosis, no prescriptions)
- Ensure empathetic responses
- Mandate crisis escalation
- Follow evidence-based practices

## ⚠️ Important Considerations

### Ethical Guidelines

1. **AI is NOT a replacement for professional therapy**
   - Always include disclaimers
   - Encourage professional help
   - Never diagnose conditions

2. **Crisis Protocol**
   - Immediate escalation for high-risk situations
   - Provide crisis hotlines
   - Log all crisis events

3. **Privacy & HIPAA Compliance**
   - Encrypt all data
   - Secure API endpoints
   - Implement proper authentication
   - Follow HIPAA guidelines

### Safety Measures

```typescript
// Example crisis detection
const crisisAnalysis = analyzeCrisisRisk(userMessage);

if (crisisAnalysis.level === 'critical') {
  // Immediate intervention
  showCrisisResources();
  notifySupportTeam();
  logCrisisEvent();
}
```

## 🎯 Next Steps

### Immediate (Required for Production)

1. **Add API Key**
   - Get Gemini API key
   - Configure environment variables
   - Test API connectivity

2. **Test the Flow**
   - Complete assessment
   - Verify AI responses
   - Test crisis detection
   - Check therapist matching

3. **Add Authentication**
   - Protect API routes
   - Implement user sessions
   - Save assessment results

### Future Enhancements (Phase 2-4)

1. **AI Crisis Chat** (Phase 2)
   - 24/7 support chatbot
   - Real-time streaming responses
   - Conversation history

2. **Personalized Content** (Phase 3)
   - AI-curated articles
   - Custom meditation scripts
   - Google Search integration

3. **AI Journaling** (Phase 4)
   - Guided prompts
   - Mood tracking
   - Pattern analysis

## 📊 Cost Estimation

**Gemini 3 Pro Pricing** (estimated):
- Assessment analysis: ~$0.01-0.05 per user
- Therapist matching: ~$0.01-0.03 per request
- Monthly cost (1000 users): ~$30-80

**Optimization Tips:**
- Cache common responses
- Batch similar requests
- Use standard model for simple tasks
- Reserve thinking mode for complex analysis

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module 'ai'"**
   - Wait for npm install to complete
   - Run `npm install ai @ai-sdk/google zod`

2. **API Key Error**
   - Check `.env` file exists
   - Verify API key is correct
   - Ensure environment variables are loaded

3. **TypeScript Errors**
   - Routes not recognized: Restart TypeScript server
   - Type mismatches: Check data structures

4. **Crisis Detection Not Working**
   - Verify keywords are lowercase
   - Check message preprocessing
   - Test with known crisis phrases

## 📚 Resources

- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Google AI Studio](https://makersuite.google.com/)
- [Mental Health Crisis Resources](https://988lifeline.org/)

## 🎉 Success Metrics

Track these metrics to measure success:

1. **Assessment Completion Rate**
   - Target: >80% completion

2. **AI Analysis Quality**
   - User satisfaction with recommendations
   - Therapist match accuracy

3. **Crisis Detection Accuracy**
   - False positive rate
   - False negative rate (critical!)

4. **User Engagement**
   - Time spent on results
   - Therapist booking rate

## 📝 Notes

- The AI implementation is currently in **development mode**
- API routes need to be tested with actual Gemini API key
- Crisis detection system requires monitoring and refinement
- All mental health content should be reviewed by licensed professionals

---

**Built with ❤️ using Gemini 3 Pro and the AI SDK**
