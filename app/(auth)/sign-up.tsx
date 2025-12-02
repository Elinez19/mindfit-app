import { gradientColors } from "@/constants/data";
import { SignUpFormData, signUpSchema } from "@/validation/schemas";
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
    FadeInDown,
    FadeInUp,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function SignUpScreen() {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Animation values
  const buttonScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(1);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    try {
      // Validate form data using Zod
      const validatedData = signUpSchema.parse(formData);

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
          text1: "Account created successfully!",
          text2: "Please verify your email to continue",
        });

        // Navigate to OTP verification
        router.push("/(auth)/verify-otp");
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
          text1: "Sign Up Failed",
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
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <Animated.View
              entering={FadeInUp.delay(200).springify()}
              className="items-center pt-8 pb-6 px-6"
            >
              <View
                className="w-20 h-20 rounded-3xl bg-white/25 items-center justify-center mb-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 10,
                }}
              >
                <Text className="text-3xl font-bold text-purple-700">M</Text>
              </View>
              <Text className="text-3xl font-bold text-purple-800 mb-2">
                Create Account
              </Text>
              <Text className="text-purple-700 text-center text-base">
                Join MindFit and start your wellness journey
              </Text>
            </Animated.View>

            {/* Form */}
            <Animated.View
              entering={FadeInUp.delay(400).springify()}
              className="flex-1 px-6 mt-4"
            >
              <View className="space-y-5">
                {/* Full Name Input */}
                <Animated.View entering={FadeInDown.delay(600)}>
                  <Text className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                    Full Name
                  </Text>
                  <BlurView intensity={35} tint="light" className="rounded-2xl">
                    <View className="bg-white/50 rounded-2xl px-5 py-5 flex-row items-center">
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="rgba(0, 0, 0, 0.7)"
                      />
                      <TextInput
                        value={formData.fullName}
                        onChangeText={(value) =>
                          handleInputChange("fullName", value)
                        }
                        placeholder="Enter your full name"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        className="text-slate-800 text-base flex-1 ml-3"
                      />
                    </View>
                  </BlurView>
                </Animated.View>

                {/* Email Input */}
                <Animated.View entering={FadeInDown.delay(800)}>
                  <Text className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                    Email
                  </Text>
                  <BlurView intensity={35} tint="light" className="rounded-2xl">
                    <View className="bg-white/50 rounded-2xl px-5 py-5 flex-row items-center">
                      <Ionicons
                        name="mail-outline"
                        size={20}
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

                {/* Phone Input */}
                <Animated.View entering={FadeInDown.delay(1000)}>
                  <Text className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                    Phone Number
                  </Text>
                  <BlurView intensity={35} tint="light" className="rounded-2xl">
                    <View className="bg-white/50 rounded-2xl px-5 py-5 flex-row items-center">
                      <Ionicons
                        name="call-outline"
                        size={20}
                        color="rgba(0, 0, 0, 0.7)"
                      />
                      <TextInput
                        value={formData.phone}
                        onChangeText={(value) =>
                          handleInputChange("phone", value)
                        }
                        placeholder="Enter your phone number"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        keyboardType="phone-pad"
                        className="text-slate-800 text-base flex-1 ml-3"
                      />
                    </View>
                  </BlurView>
                </Animated.View>

                {/* Password Input */}
                <Animated.View entering={FadeInDown.delay(1200)}>
                  <Text className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                    Password
                  </Text>
                  <BlurView intensity={35} tint="light" className="rounded-2xl">
                    <View className="bg-white/50 rounded-2xl px-5 py-5 flex-row items-center">
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="rgba(0, 0, 0, 0.7)"
                      />
                      <TextInput
                        value={formData.password}
                        onChangeText={(value) =>
                          handleInputChange("password", value)
                        }
                        placeholder="Create a password"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        secureTextEntry
                        className="text-slate-800 text-base flex-1 ml-3"
                      />
                    </View>
                  </BlurView>
                </Animated.View>

                {/* Confirm Password Input */}
                <Animated.View entering={FadeInDown.delay(1400)}>
                  <Text className="text-slate-800 text-sm font-semibold mb-2 ml-1">
                    Confirm Password
                  </Text>
                  <BlurView intensity={35} tint="light" className="rounded-2xl">
                    <View className="bg-white/50 rounded-2xl px-5 py-5 flex-row items-center">
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="rgba(0, 0, 0, 0.7)"
                      />
                      <TextInput
                        value={formData.confirmPassword}
                        onChangeText={(value) =>
                          handleInputChange("confirmPassword", value)
                        }
                        placeholder="Confirm your password"
                        placeholderTextColor="rgba(0, 0, 0, 0.5)"
                        secureTextEntry
                        className="text-slate-800 text-base flex-1 ml-3"
                      />
                    </View>
                  </BlurView>
                </Animated.View>

                {/* Terms */}
                <Animated.View
                  entering={FadeInDown.delay(1600)}
                  className="flex-row items-start mt-2"
                >
                  <View className="w-5 h-5 rounded-md border-2 border-slate-700 mr-3 mt-0.5 bg-white/20" />
                  <Text className="text-slate-700 text-xs flex-1 leading-5">
                    By signing up, you agree to our{" "}
                    <Text className="text-slate-800 font-semibold">
                      Terms of Service
                    </Text>{" "}
                    and{" "}
                    <Text className="text-slate-800 font-semibold">
                      Privacy Policy
                    </Text>
                  </Text>
                </Animated.View>

                {/* Sign Up Button */}
                <Animated.View entering={FadeInUp.delay(1800)} className="mt-6">
                  <Animated.View style={buttonAnimatedStyle}>
                    <TouchableOpacity
                      onPress={handleSignUp}
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
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>
              </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              entering={FadeInUp.delay(2000)}
              className="px-6 pt-6 pb-4"
            >
              <View className="flex-row justify-center items-center">
                <Text className="text-slate-700 text-base">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-in")}
                >
                  <Text className="text-slate-800 text-base font-bold">
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
