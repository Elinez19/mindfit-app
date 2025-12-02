import { Stack } from "expo-router";
import React from "react";

export default function QuizLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="goal" />
      <Stack.Screen name="focus" />
      <Stack.Screen name="gender" />
    </Stack>
  );
}
