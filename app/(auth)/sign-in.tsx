import { gradientColors } from "@/constants/data";
import { SignInFormData, signInSchema } from "@/validation/schemas";
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

export default function SignInScreen() {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const buttonScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(1);

  const handleInputChange = (field: keyof SignInFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignIn = async () => {
    try {
      // Validate form data using Zod
      const validatedData = signInSchema.parse(formData);

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
          text1: "Welcome back!",
          text2: "You have successfully signed in",
        });

        // Navigate to main app
        router.replace("/(root)/(tabs)/Home");
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
          text1: "Sign In Failed",
          text2: "Please check your credentials and try again",
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
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
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
                <Text className="text-4xl font-bold text-purple-700">M</Text>
              </View>
              <Text className="text-3xl font-bold text-purple-800 mb-2">
                Welcome Back
              </Text>
              <Text className="text-purple-700 text-center text-base px-4">
                Sign in to continue with MindFit
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View
              entering={FadeInUp.delay(400).springify()}
              className="flex-1 px-6 mt-4"
            >
              <View className="space-y-5">
                {/* Email Input */}
                <Animated.View entering={FadeInDown.delay(600)}>
                  <Text className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                    Email
                  </Text>
                  <BlurView intensity={35} tint="light" className="rounded-2xl">
                    <View className="bg-white/50 rounded-2xl px-5 py-5 flex-row items-center">
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
                        placeholder="Enter your email"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        className="text-slate-800 text-base flex-1 ml-3"
                      />
                    </View>
                  </BlurView>
                </Animated.View>

                {/* Password Input */}
                <Animated.View entering={FadeInDown.delay(800)}>
                  <Text className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                    Password
                  </Text>
                  <BlurView intensity={35} tint="light" className="rounded-2xl">
                    <View className="bg-white/50 rounded-2xl px-5 py-5 flex-row items-center">
                      <Ionicons
                        name="lock-closed-outline"
                        size={22}
                        color="rgba(0, 0, 0, 0.7)"
                      />
                      <TextInput
                        value={formData.password}
                        onChangeText={(value) =>
                          handleInputChange("password", value)
                        }
                        placeholder="Enter your password"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        secureTextEntry
                        className="text-slate-800 text-base flex-1 ml-3"
                      />
                    </View>
                  </BlurView>
                </Animated.View>

                {/* Forgot Password */}
                <Animated.View
                  entering={FadeInDown.delay(1000)}
                  className="items-end mt-2"
                >
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/forgot-password")}
                  >
                    <Text className="text-slate-800 text-sm font-semibold">
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </Animated.View>

                {/* Sign In Button */}
                <Animated.View entering={FadeInUp.delay(1200)} className="mt-6">
                  <Animated.View style={buttonAnimatedStyle}>
                    <TouchableOpacity
                      onPress={handleSignIn}
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
                        {isLoading ? "Signing In..." : "Sign In"}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>

                {/* Divider */}
                <Animated.View
                  entering={FadeIn.delay(1400)}
                  className="flex-row items-center my-8"
                >
                  <View className="flex-1 h-px bg-slate-700/30" />
                  <Text className="text-slate-700 text-sm mx-4 font-medium">
                    or
                  </Text>
                  <View className="flex-1 h-px bg-slate-700/30" />
                </Animated.View>

                {/* Social Sign In */}
                <Animated.View entering={FadeInUp.delay(1600)}>
                  <TouchableOpacity className="bg-white/30 rounded-2xl py-4 flex-row items-center justify-center border border-white/40">
                    <Ionicons name="logo-google" size={24} color="#DB4437" />
                    <Text className="text-slate-800 text-base font-semibold ml-3">
                      Continue with Google
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              entering={FadeInUp.delay(1800)}
              className="px-6 pt-8 pb-4"
            >
              <View className="flex-row justify-center items-center">
                <Text className="text-slate-700 text-base">
                  Don&apos;t have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-up")}
                >
                  <Text className="text-slate-800 text-base font-bold">
                    Sign Up
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
