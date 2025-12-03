import { animationConfig, appConfig, gradientColors } from "@/constants/data";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, Text, View } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen() {
  // Animation values
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(30);

  useEffect(() => {
    // Start animations sequence
    logoScale.value = withSequence(
      withTiming(1.1, { duration: 800 }),
      withTiming(1, { duration: 200 })
    );

    logoOpacity.value = withTiming(1, { duration: 1000 });

    textOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(600, withTiming(0, { duration: 800 }));

    // Navigate to onboarding after configured delay
    const timer = setTimeout(() => {
      router.replace("/(auth)/onboarding");
    }, animationConfig.splashDelay);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Main gradient background */}
      <LinearGradient
        colors={gradientColors.primary}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Secondary gradient overlay for depth */}
      <LinearGradient
        colors={gradientColors.secondary}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1 justify-center items-center">
        {/* Logo Container */}
        <Animated.View
          style={logoAnimatedStyle}
          className="items-center justify-center mb-8"
        >
          {/* App Icon/Logo */}
          <View className="w-24 h-24 rounded-3xl bg-white/20 items-center justify-center mb-6 shadow-lg">
            <View className="w-16 h-16 rounded-2xl bg-white/30 items-center justify-center">
              <Text className="text-3xl font-bold text-red-600">M</Text>
            </View>
          </View>

          {/* App Name */}
          <Text className="text-4xl font-bold text-red-700 mb-2">
            {appConfig.name}
          </Text>
          <Text className="text-lg text-red-600/80 font-medium">
            {appConfig.tagline}
          </Text>
        </Animated.View>

        {/* Animated tagline */}
        <Animated.View style={textAnimatedStyle} className="items-center px-8">
          <Text className="text-center text-red-600/90 text-lg font-medium leading-6">
            {appConfig.description}
          </Text>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View
          entering={FadeIn.delay(1500)}
          className="absolute bottom-20 items-center"
        >
          <View className="w-8 h-8 rounded-full border-2 border-red-300 border-t-red-600 animate-spin" />
        </Animated.View>
      </SafeAreaView>

      {/* Decorative elements */}
      <View className="absolute top-20 left-8 w-16 h-16 rounded-full bg-red-200/30" />
      <View className="absolute top-40 right-12 w-12 h-12 rounded-full bg-red-300/40" />
      <View className="absolute bottom-40 left-16 w-20 h-20 rounded-full bg-red-200/30" />
      <View className="absolute bottom-60 right-8 w-14 h-14 rounded-full bg-red-300/40" />
    </View>
  );
}
