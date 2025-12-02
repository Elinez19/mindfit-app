# 🏗️ AI Assessment System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│                      (React Native + Expo)                       │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ASSESSMENT FLOW                             │
│                                                                   │
│  Onboarding → AI Assessment → AI Analysis → Results → Matching  │
│     (6 Q's)      (Gemini 3)    (Display)    (Therapists)        │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API LAYER                                │
│                                                                   │
│  ┌──────────────────┐         ┌──────────────────┐             │
│  │ /api/assessment  │         │ /api/therapist-  │             │
│  │                  │         │     match        │             │
│  │ • Receives data  │         │ • Matches users  │             │
│  │ • Crisis check   │         │ • AI reasoning   │             │
│  │ • AI analysis    │         │ • Top 3 picks    │             │
│  └──────────────────┘         └──────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      AI PROCESSING                               │
│                                                                   │
│  ┌──────────────────┐         ┌──────────────────┐             │
│  │ Crisis Detection │         │   Gemini 3 Pro   │             │
│  │                  │         │                  │             │
│  │ • Keyword scan   │────────▶│ • Thinking mode  │             │
│  │ • Risk level     │         │ • Deep reasoning │             │
│  │ • Resources      │         │ • Personalized   │             │
│  └──────────────────┘         └──────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      OUTPUT & RESULTS                            │
│                                                                   │
│  • Primary Concerns      • Recommended Therapy                   │
│  • Therapist Profile     • Wellness Plan                         │
│  • Urgency Level         • Resources                             │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Input Collection
```
User answers 6 questions
        ↓
Data stored in state
        ↓
Validation checks
        ↓
Submit to API
```

### 2. Crisis Detection Pipeline
```
User responses
        ↓
Extract all text
        ↓
Keyword matching
        ↓
Risk assessment (none/low/medium/high/critical)
        ↓
If critical → Immediate intervention
If safe → Continue to AI analysis
```

### 3. AI Analysis Pipeline
```
Assessment data
        ↓
Format for Gemini 3
        ↓
Send to Gemini with thinking mode
        ↓
Receive structured analysis
        ↓
Parse into sections
        ↓
Return to frontend
```

### 4. Therapist Matching Pipeline
```
User profile + AI analysis
        ↓
Format therapist data
        ↓
Send to Gemini for matching
        ↓
Receive recommendations with reasoning
        ↓
Calculate match scores
        ↓
Return top 3 matches
```

## Component Structure

```
app/
├── (auth)/
│   ├── ai-assessment.tsx
│   │   ├── State: currentStep, responses, isAnalyzing
│   │   ├── Functions: handleSelectOption, handleContinue, analyzeAssessment
│   │   └── UI: Questions, Options, Progress, CTA
│   │
│   ├── assessment-results.tsx
│   │   ├── State: analysis, isLoadingMatches
│   │   ├── Functions: handleFindTherapist
│   │   └── UI: Analysis Cards, Urgency Badge, CTAs
│   │
│   └── therapist-matches.tsx
│       ├── State: matches, selectedTherapist
│       ├── Functions: handleBookSession
│       └── UI: Therapist Cards, Match Scores, Selection
│
├── api/
│   ├── assessment/route.ts
│   │   ├── Crisis detection
│   │   ├── Gemini 3 analysis
│   │   └── Response formatting
│   │
│   └── therapist-match/route.ts
│       ├── Data preparation
│       ├── Gemini 3 matching
│       └── Score calculation
│
lib/ai/
├── gemini-client.ts       # Gemini configuration
├── prompts.ts             # System prompts
└── crisis-detection.ts    # Safety system

constants/
└── ai-assessment.ts       # Question data
```

## Security & Safety Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                      LAYER 1: INPUT                              │
│  • Client-side validation                                        │
│  • Required field checks                                         │
│  • Data sanitization                                             │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LAYER 2: CRISIS DETECTION                      │
│  • Keyword scanning (40+ crisis terms)                           │
│  • Multi-level risk assessment                                   │
│  • Immediate resource provision                                  │
│  • Escalation protocols                                          │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LAYER 3: AI SAFEGUARDS                         │
│  • Ethical system prompts                                        │
│  • No diagnosis/prescription rules                               │
│  • Professional encouragement                                    │
│  • Evidence-based responses                                      │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                   LAYER 4: OUTPUT VALIDATION                     │
│  • Response parsing                                              │
│  • Content filtering                                             │
│  • Disclaimer inclusion                                          │
│  • Professional referral                                         │
└─────────────────────────────────────────────────────────────────┘
```

## State Management

### Assessment Screen State
```typescript
{
  currentStep: number,              // 0-5
  responses: AssessmentResponse[],  // User answers
  isAnalyzing: boolean,             // Loading state
  selectedOptions: string[],        // Current question selections
}
```

### Results Screen State
```typescript
{
  analysis: {
    primaryConcerns: string,
    recommendedTherapy: string,
    therapistSpecialization: string,
    wellnessPlan: string,
    urgencyLevel: string,
    additionalResources: string,
  },
  isLoadingMatches: boolean,
}
```

### Matches Screen State
```typescript
{
  matches: TherapistMatch[],  // Top 3 therapists
  selectedTherapist: string,  // Selected ID
}
```

## API Request/Response Format

### Assessment API

**Request:**
```json
{
  "assessmentData": {
    "What brings you to MindFit today?": "Managing Anxiety",
    "What symptoms are you experiencing?": "Difficulty Sleeping, Racing Thoughts",
    "How long have you been experiencing these challenges?": "3-6 months",
    "Have you tried therapy before?": "No, this is my first time",
    "What type of therapy are you interested in?": "Cognitive Behavioral Therapy (CBT)",
    "What is your preferred session format?": "Video Sessions"
  }
}
```

**Response (Normal):**
```json
{
  "isCrisis": false,
  "crisisLevel": "low",
  "analysis": {
    "primaryConcerns": "The user is experiencing anxiety...",
    "recommendedTherapy": "Cognitive Behavioral Therapy (CBT)...",
    "therapistSpecialization": "Licensed therapist with CBT expertise...",
    "wellnessPlan": "1. Practice deep breathing...",
    "urgencyLevel": "Medium - recommend starting within 2 weeks",
    "additionalResources": "Anxiety workbooks, mindfulness apps..."
  },
  "rawAnalysis": "Full AI response text..."
}
```

**Response (Crisis):**
```json
{
  "isCrisis": true,
  "crisisLevel": "critical",
  "crisisResponse": "I'm very concerned about what you've shared...",
  "resources": {
    "suicide": {
      "name": "988 Suicide & Crisis Lifeline",
      "number": "988",
      "text": "Text HELLO to 741741"
    }
  }
}
```

### Therapist Match API

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
      "therapist": {
        "id": "1",
        "name": "Dr. Sarah Mitchell",
        "role": "Clinical Psychologist",
        "rating": 4.9,
        "image": "https://..."
      },
      "reasoning": "Dr. Mitchell specializes in CBT for anxiety...",
      "matchScore": 95
    }
  ]
}
```

## Performance Considerations

### Optimization Strategies
1. **Caching**: Cache common AI responses
2. **Batching**: Group similar requests
3. **Lazy Loading**: Load therapist data on demand
4. **Debouncing**: Prevent duplicate API calls
5. **Error Handling**: Graceful fallbacks

### Expected Response Times
- Assessment submission: < 3 seconds
- AI analysis: 3-8 seconds
- Therapist matching: 2-5 seconds
- Total flow: < 15 seconds

## Error Handling

```
User Action
    ↓
Try API Call
    ↓
Success? ──Yes──▶ Display Results
    │
    No
    ↓
Retry (3 attempts)
    ↓
Still Failed?
    ↓
Show Error Message
    ↓
Offer Alternatives:
• Try again
• Skip to sign up
• Contact support
```

## Monitoring & Logging

### Key Metrics to Track
1. **User Metrics**
   - Assessment completion rate
   - Average completion time
   - Drop-off points

2. **AI Metrics**
   - API response times
   - Error rates
   - Token usage

3. **Safety Metrics**
   - Crisis detections
   - False positives/negatives
   - Resource provision rate

4. **Business Metrics**
   - Sign-up conversion
   - Therapist booking rate
   - User satisfaction

---

**This architecture ensures:**
- ✅ User safety (multi-layer crisis detection)
- ✅ AI quality (Gemini 3 with thinking mode)
- ✅ Scalability (modular design)
- ✅ Maintainability (clear separation of concerns)
- ✅ Performance (optimized data flow)
