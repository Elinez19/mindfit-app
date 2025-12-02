import { gradientColors } from "@/constants/data";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/validation/schemas";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function ForgotPasswordScreen() {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const buttonScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(1);

  const handleInputChange = (
    field: keyof ForgotPasswordFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetPassword = async () => {
    try {
      // Validate form data using Zod
      forgotPasswordSchema.parse(formData);
      setIsLoading(true);

      // Animate button press
      buttonScale.value = withSpring(0.95);
      buttonOpacity.value = withTiming(0.7);

      // Simulate API call
      setTimeout(() => {
        buttonScale.value = withSpring(1);
        buttonOpacity.value = withTiming(1);
        setIsLoading(false);

        // Show success toast
        Toast.show({
          type: "success",
          text1: "Reset Link Sent!",
          text2: "Please check your email for password reset instructions",
        });

        // Navigate to sign in
        router.push("/(auth)/sign-in");
      }, 2000);
    } catch (error: any) {
      setIsLoading(false);

      if (error.errors && error.errors.length > 0) {
        // Show validation errors
        const firstError = error.errors[0];
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: firstError.message,
        });
      } else {
        // Show generic error
        Toast.show({
          type: "error",
          text1: "Request Failed",
          text2: "Please try again later",
        });
      }
    }
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
    opacity: buttonOpacity.value,
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

      {/* Secondary gradient overlay */}
      <LinearGradient
        colors={gradientColors.secondary}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <Animated.View
              entering={FadeInUp.delay(200).springify()}
              className="items-center pt-12 pb-8 px-6"
            >
              <View
                className="w-24 h-24 rounded-3xl bg-white/25 items-center justify-center mb-5"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 10,
                }}
              >
                <Text className="text-4xl font-bold text-slate-800">🔒</Text>
              </View>
              <Text className="text-3xl font-bold text-slate-800 mb-2 text-center">
                Forgot Password?
              </Text>
              <Text className="text-slate-700 text-center text-base px-4">
                Enter your email and we&apos;ll send you a secure reset link.
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View
              entering={FadeInUp.delay(400).springify()}
              className="flex-1 px-6"
            >
              <View className="space-y-6">
                {/* Email Input */}
                <Animated.View entering={FadeInDown.delay(600)}>
                  <Text className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                    Email Address
                  </Text>
                  <BlurView intensity={35} tint="light" className="rounded-2xl">
                    <View className="bg-white/60 rounded-2xl px-5 py-5 flex-row items-center">
                      <Ionicons
                        name="mail-outline"
                        size={22}
                        color="rgba(0, 0, 0, 0.7)"
                      />
                      <TextInput
                        value={formData.email}
                        onChangeText={(value) =>
                          handleInputChange("email", value)
                        }
                        placeholder="Enter your email address"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        className="text-slate-800 text-base flex-1 ml-3"
                      />
                    </View>
                  </BlurView>
                </Animated.View>

                {/* Reset Button */}
                <Animated.View entering={FadeInUp.delay(800)}>
                  <Animated.View style={buttonAnimatedStyle}>
                    <TouchableOpacity
                      onPress={handleResetPassword}
                      disabled={isLoading}
                      className="bg-slate-800 rounded-2xl py-4 items-center"
                      activeOpacity={0.8}
                      style={{
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                        elevation: 8,
                      }}
                    >
                      <Text className="text-white text-lg font-bold">
                        {isLoading ? "Sending..." : "Send Reset Link"}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>

                {/* Help Text */}
                <Animated.View
                  entering={FadeIn.delay(1000)}
                  className="bg-white/80 rounded-2xl p-4"
                >
                  <Text className="text-slate-700 text-sm text-center leading-5">
                    💡 Make sure to check your spam folder if you don&apos;t
                    receive the email within a few minutes.
                  </Text>
                </Animated.View>
              </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              entering={FadeInUp.delay(1200)}
              className="px-6 pb-8 pt-4"
            >
              <View className="flex-row justify-center items-center">
                <Text className="text-slate-600 text-sm">
                  Remember your password?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-in")}
                >
                  <Text className="text-slate-800 text-sm font-semibold">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
