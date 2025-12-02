import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "card",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="verify-otp" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="quiz-focus" />
      <Stack.Screen name="quiz-gender" />
      <Stack.Screen name="quiz-goal" />
      <Stack.Screen name="ai-assessment" />
      <Stack.Screen name="assessment-results" />
      <Stack.Screen name="therapist-matches" />
    </Stack>
  );
}
