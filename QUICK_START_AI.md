# 🚀 Quick Start: Setting Up Gemini AI

## Step 1: Get Your API Key (2 minutes)

1. Visit **[Google AI Studio](https://makersuite.google.com/app/apikey)**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated key

## Step 2: Configure Your Environment

### Option A: For Development (Recommended)

Create a `.env` file in your project root:

```bash
# .env
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...your-actual-key-here
```

### Option B: For Expo Projects

Update `app.json`:

```json
{
  "expo": {
    "extra": {
      "GOOGLE_GENERATIVE_AI_API_KEY": "AIzaSy...your-actual-key-here"
    }
  }
}
```

Then update `lib/ai/gemini-client.ts`:

```typescript
import Constants from 'expo-constants';
import { google } from '@ai-sdk/google';

// Get API key from environment
const apiKey = Constants.expoConfig?.extra?.GOOGLE_GENERATIVE_AI_API_KEY 
  || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
  throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not set');
}

// Configure the Google AI provider
export const geminiModel = google('gemini-3-pro-preview', {
  apiKey: apiKey,
});

// ... rest of the file
```

## Step 3: Test the Integration

Run your app and try the assessment:

```bash
npm start
```

1. Navigate through onboarding
2. Click "Let's Get Started"
3. Complete the AI assessment
4. View your personalized results!

## 🔒 Security Best Practices

### ❌ DON'T:
- Commit `.env` file to Git
- Share your API key publicly
- Use the same key for production and development

### ✅ DO:
- Add `.env` to `.gitignore`
- Use environment variables
- Rotate keys regularly
- Monitor API usage

## 📊 Verify It's Working

You should see:
- ✅ Assessment completes without errors
- ✅ AI analysis appears on results screen
- ✅ Therapist matches are generated
- ✅ No console errors about missing API key

## 🐛 Troubleshooting

### "API key not found"
- Check `.env` file exists in project root
- Verify the key is correct (starts with `AIzaSy`)
- Restart your development server

### "Cannot find module 'ai'"
- Wait for `npm install` to complete
- Manually run: `npm install ai @ai-sdk/google zod`

### "Quota exceeded"
- Check your API usage in Google AI Studio
- Free tier has limits (60 requests/minute)
- Consider upgrading for production

## 💰 API Costs

**Free Tier:**
- 60 requests per minute
- 1,500 requests per day
- Perfect for development!

**Paid Tier:**
- Pay-as-you-go pricing
- ~$0.01-0.05 per assessment
- Scale as needed

## 🎯 Next Steps

Once your API key is working:

1. ✅ Test the full assessment flow
2. ✅ Customize the AI prompts in `lib/ai/prompts.ts`
3. ✅ Add more therapist data in `constants/data.ts`
4. ✅ Implement user authentication
5. ✅ Deploy to production

---

**Need help?** Check `AI_IMPLEMENTATION.md` for detailed documentation.
