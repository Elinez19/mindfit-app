import { gradientColors } from "@/constants/data";
import { OTPFormData } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
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

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState<OTPFormData["otp"]>(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<TextInput[]>([]);

  // Animation values
  const buttonScale = useSharedValue(1);
  const buttonOpacity = useSharedValue(1);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);

    // Animate button press
    buttonScale.value = withSpring(0.95);
    buttonOpacity.value = withTiming(0.7);

    setTimeout(() => {
      buttonScale.value = withSpring(1);
      buttonOpacity.value = withTiming(1);
      setIsLoading(false);

      Alert.alert(
        "Verification Successful",
        "Your account has been verified successfully!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(root)/(tabs)/Home"),
          },
        ]
      );
    }, 2000);
  };

  const handleResendOTP = () => {
    setTimeLeft(60);
    Alert.alert(
      "OTP Sent",
      "A new verification code has been sent to your phone"
    );
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
                <Text className="text-4xl font-bold text-slate-800">📱</Text>
              </View>
              <Text className="text-3xl font-bold text-slate-800 mb-2 text-center">
                Verify Phone
              </Text>
              <Text className="text-slate-700 text-center text-base px-4">
                Enter the 6-digit code sent to your phone number.
              </Text>
            </Animated.View>

            {/* OTP Input */}
            <Animated.View
              entering={FadeInUp.delay(400).springify()}
              className="flex-1 px-6"
            >
              <View className="space-y-6">
                {/* OTP Input Fields */}
                <Animated.View
                  entering={FadeInDown.delay(600)}
                  className="flex-row justify-center space-x-3"
                >
                  {otp.map((digit, index) => (
                    <BlurView
                      key={index}
                      intensity={35}
                      tint="light"
                      className="rounded-2xl"
                    >
                      <TextInput
                        ref={(ref) => {
                          if (ref) inputRefs.current[index] = ref;
                        }}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        onKeyPress={({ nativeEvent }) =>
                          handleKeyPress(nativeEvent.key, index)
                        }
                        keyboardType="numeric"
                        maxLength={1}
                        className="w-12 h-12 text-slate-800 text-center text-xl font-bold"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.85)",
                          borderRadius: 16,
                        }}
                        placeholderTextColor="rgba(0, 0, 0, 0.4)"
                      />
                    </BlurView>
                  ))}
                </Animated.View>

                {/* Timer */}
                <Animated.View
                  entering={FadeInDown.delay(800)}
                  className="items-center"
                >
                  <Text className="text-slate-600 text-sm">
                    Resend code in {timeLeft}s
                  </Text>
                </Animated.View>

                {/* Verify Button */}
                <Animated.View
                  entering={FadeInUp.delay(1000)}
                  style={buttonAnimatedStyle}
                >
                  <TouchableOpacity
                    onPress={handleVerifyOTP}
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
                      {isLoading ? "Verifying..." : "Verify Code"}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>

                {/* Resend Button */}
                <Animated.View entering={FadeInUp.delay(1200)}>
                  <TouchableOpacity
                    onPress={handleResendOTP}
                    disabled={timeLeft > 0}
                    className="items-center py-3"
                  >
                    <Text
                      className={`text-sm font-medium ${
                        timeLeft > 0 ? "text-slate-400" : "text-slate-800"
                      }`}
                    >
                      Didn't receive the code? Resend
                    </Text>
                  </TouchableOpacity>
                </Animated.View>

                {/* Help Text */}
                <Animated.View
                  entering={FadeIn.delay(1400)}
                  className="bg-white/80 rounded-2xl p-4"
                >
                  <Text className="text-slate-700 text-sm text-center leading-5">
                    💡 Make sure your phone has a good signal and check for any
                    SMS messages.
                  </Text>
                </Animated.View>
              </View>
            </Animated.View>

            {/* Footer */}
            <Animated.View
              entering={FadeInUp.delay(1600)}
              className="px-6 pb-8 pt-4"
            >
              <View className="flex-row justify-center items-center">
                <Text className="text-slate-600 text-sm">Wrong number? </Text>
                <TouchableOpacity
                  onPress={() => router.push("/(auth)/sign-up")}
                >
                  <Text className="text-slate-800 text-sm font-semibold">
                    Change Number
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
