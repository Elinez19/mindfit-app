import { quizGender } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GenderScreen() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedGender) {
        // Proceed to sign up or next step
        router.push("/(auth)/sign-up");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-2 pb-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.push("/(auth)/quiz/focus")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-semibold text-lg">Body Data</Text>
          <View className="w-6" /> 
        </View>
        
        {/* Progress Bar */}
        <View className="flex-row h-1 gap-2 px-2">
          <View className="flex-1 bg-red-500 rounded-full" />
          <View className="flex-1 bg-red-500 rounded-full" />
          <View className="flex-1 bg-red-500 rounded-full" />
          <View className="flex-1 bg-gray-100 rounded-full" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        <Text className="text-3xl font-bold text-center mt-4 mb-2">
          What's your gender?
        </Text>
        <Text className="text-center text-gray-400 mb-12 px-4 leading-5">
            Using this information , we can access you basal metabolic rate and personalize your plan.
        </Text>

        <View className="gap-4">
          {quizGender.map((item) => {
            const isSelected = selectedGender === item.id;
            const containerClass = `flex-row items-center p-4 rounded-2xl border ${
              isSelected ? "border-red-500 bg-white" : "border-gray-100 bg-white"
            } shadow-sm shadow-gray-100`;

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelectedGender(item.id)}
                activeOpacity={0.8}
                className={containerClass}
              >
                <View className="w-12 h-12 rounded-xl bg-gray-100 items-center justify-center mr-4">
                  <Ionicons 
                    name={item.icon as any} 
                    size={24} 
                    color="black" 
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-base text-gray-900">{item.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6">
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selectedGender}
          className={`w-full py-4 rounded-2xl items-center ${
            selectedGender ? "bg-red-500 shadow-lg shadow-red-200" : "bg-gray-200"
          }`}
        >
          <Text className={`font-bold text-lg ${selectedGender ? "text-white" : "text-gray-400"}`}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
