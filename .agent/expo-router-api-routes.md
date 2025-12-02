# Expo Router API Routes - Reference Guide

## What are API Routes?

API Routes are functions that are executed on a server when a route is matched. They can be used to:
- Handle sensitive data (like API keys) securely
- Implement custom server logic (like exchanging auth codes for access tokens)
- Create server endpoints for your Expo app

API Routes should be executed in a [WinterCG](https://wintercg.org/)-compliant environment.

## File Naming Convention

In Expo, API Routes are defined by creating files in the `app` directory with the `+api.ts` extension.

**Example:**
- File: `app/hello+api.ts`
- Route: `/hello`

**With Route Groups:**
- File: `app/(api)/assessment+api.ts`
- Route: `/assessment`

## Creating an API Route

### 1. Configure Server Output

Ensure your project is using server output in `app.json`:

```json
{
  "web": {
    "output": "server"
  }
}
```

### 2. Create the API Route File

Create a file with the `+api.ts` extension:

```typescript
// app/hello+api.ts
export function GET(request: Request) {
  return Response.json({ hello: 'world' });
}
```

### 3. Supported HTTP Methods

You can export any of these functions:
- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`
- `HEAD`
- `OPTIONS`

Unsupported methods will automatically return `405: Method not allowed`.

### 4. Start Development Server

```bash
npx expo
```

### 5. Test the Route

```bash
curl http://localhost:8081/hello
```

Or from client code:

```typescript
import { Button } from 'react-native';

async function fetchHello() {
  const response = await fetch('/hello');
  const data = await response.json();
  alert('Hello ' + data.hello);
}

export default function App() {
  return <Button onPress={() => fetchHello()} title="Fetch hello" />;
}
```

## Working with Requests

### Request Object

Requests use the global, standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object.

```typescript
export async function GET(request: Request) {
  // Access request data
  return Response.json({ ... });
}
```

### Request Body

Use `request.json()` to access the request body:

```typescript
export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ ... });
}
```

### Query Parameters

Parse the request URL to access query parameters:

```typescript
export async function GET(request: Request) {
  const url = new URL(request.url);
  const post = url.searchParams.get('post');
  // fetch data for 'post'
  return Response.json({ ... });
}
```

## Working with Responses

Responses use the global, standard [Response](https://fetch.spec.whatwg.org/#response) object.

```typescript
export function GET() {
  return Response.json({ hello: 'universe' });
}
```

## Configuration

### Origin Configuration

Configure relative fetch requests using the `origin` field in `app.json`:

```json
{
  "plugins": [
    [
      "expo-router",
      {
        "origin": "https://evanbacon.dev/"
      }
    ]
  ]
}
```

### Automatic Server Deployment

During EAS Builds, set the `EXPO_UNSTABLE_DEPLOY_SERVER=1` environment variable to automatically configure the origin to a preview deploy URL.

## Project Structure

### Current Implementation

```
app/
├── (api)/
│   ├── assessment+api.ts       → /assessment
│   └── therapist-match+api.ts  → /therapist-match
├── (auth)/
│   ├── ai-assessment.tsx
│   └── assessment-results.tsx
└── (root)/
```

### API Endpoints

1. **Assessment Analysis** - `/assessment`
   - Method: `POST`
   - Purpose: Analyze mental health assessment data using Gemini AI
   - Request Body: `{ assessmentData: object }`
   - Response: Crisis analysis or detailed assessment results

2. **Therapist Matching** - `/therapist-match`
   - Method: `POST`
   - Purpose: Match users with therapists using AI
   - Request Body: `{ userProfile: object, assessmentAnalysis: object }`
   - Response: Therapist recommendations with match scores

## Notes

- In development, relative fetch requests automatically fetch relative to the dev server origin
- API routes are only available when using server output
- Route groups (like `(api)`) don't affect the URL path; they're just for organization
- The `+api.ts` suffix is what makes a file an API route

## Deployment

API Routes need to be deployed to a hosting provider that supports server functions. See the [official documentation](https://docs.expo.dev/router/web/api-routes#deployment) for details on:
- Native deployment
- Hosting on third-party services (Bun, Express, Netlify, Vercel)

## Known Limitations

- No dynamic imports in API routes
- ESM not currently supported
