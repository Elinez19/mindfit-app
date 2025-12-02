import { defaultOnboarding } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const swiperRef = useRef<Swiper>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastSlide = currentIndex === defaultOnboarding.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      router.push("/(auth)/ai-assessment" as any);
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  const handleSkip = () => {
    router.push("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Skip Button */}
      <View className="absolute top-12 right-6 z-10">
        <TouchableOpacity onPress={handleSkip} className="px-4 py-2">
          <Text className="text-gray-500 font-semibold">Skip</Text>
        </TouchableOpacity>
      </View>

      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={setCurrentIndex}
        dot={
          <View className="w-2 h-2 rounded-full bg-gray-300 mx-1" />
        }
        activeDot={
          <View className="w-8 h-2 rounded-full bg-purple-600 mx-1" />
        }
        paginationStyle={{
          bottom: 180,
        }}
      >
        {defaultOnboarding.map((item) => (
          <View key={item.id} className="flex-1 items-center justify-center px-6">
            {/* Image Container with Gradient */}
            <View className="w-full h-96 mb-8 rounded-3xl overflow-hidden">
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="cover"
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.3)"]}
                className="absolute inset-0"
              />
              
              {/* Badge Overlay */}
              <View className="absolute top-4 right-4 bg-white/90 px-3 py-1.5 rounded-full flex-row items-center">
                <Ionicons name="star" size={14} color="#F59E0B" />
                <Text className="text-xs font-bold text-gray-800 ml-1">{item.rating}</Text>
              </View>
            </View>

            {/* Content */}
            <View className="items-center">
              {/* Category Badge */}
              <View className="bg-purple-100 px-4 py-1.5 rounded-full mb-4">
                <Text className="text-purple-700 font-semibold text-sm">{item.category}</Text>
              </View>

              {/* Title */}
              <Text className="text-3xl font-bold text-center text-gray-900 mb-3">
                {item.title}
              </Text>

              {/* Description */}
              <Text className="text-center text-gray-600 text-base leading-6 px-4 mb-4">
                {item.description}
              </Text>

              {/* Price */}
              <View className="bg-purple-50 px-6 py-2 rounded-full">
                <Text className="text-purple-700 font-bold text-lg">{item.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </Swiper>

      {/* Bottom Action Buttons */}
      <View className="px-6 pb-8">
        <TouchableOpacity
          onPress={handleNext}
          className="w-full bg-purple-600 py-4 rounded-2xl items-center shadow-lg shadow-purple-200"
        >
          <Text className="text-white font-bold text-lg">
            {isLastSlide ? "Let's Get Started" : "Next"}
          </Text>
        </TouchableOpacity>

        {!isLastSlide && (
          <TouchableOpacity
            onPress={handleSkip}
            className="w-full py-4 items-center mt-3"
          >
            <Text className="text-gray-500 font-semibold">Already have an account? Log In</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
