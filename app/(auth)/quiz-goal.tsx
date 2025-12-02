import { quizGoals } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalScreen() {
  const router = useRouter();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedGoal) {
      router.push("/(auth)/quiz-focus");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-2 pb-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-semibold text-lg">Set Your Goal</Text>
          <View className="w-6" /> 
        </View>
        
        {/* Progress Bar */}
        <View className="flex-row h-1 gap-2 px-2">
          <View className="flex-1 bg-red-500 rounded-full" />
          <View className="flex-1 bg-gray-100 rounded-full" />
          <View className="flex-1 bg-gray-100 rounded-full" />
          <View className="flex-1 bg-gray-100 rounded-full" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        <Text className="text-3xl font-bold text-center mt-4 mb-12 leading-tight">
          What is your primary{"\n"}goal?
        </Text>

        <View className="gap-4">
          {quizGoals.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            return (
              <TouchableOpacity
                key={goal.id}
                onPress={() => setSelectedGoal(goal.id)}
                activeOpacity={0.8}
                className={`flex-row items-center p-4 rounded-2xl border ${
                  isSelected ? "border-red-500 bg-white" : "border-gray-100 bg-white"
                } shadow-sm shadow-gray-100`}
              >
                <View className="w-12 h-12 rounded-xl bg-gray-100 items-center justify-center mr-4">
                  <Ionicons 
                    name={goal.icon as any} 
                    size={24} 
                    color="black" 
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-base text-gray-900 mb-1">{goal.title}</Text>
                  <Text className="text-gray-400 text-xs">{goal.description}</Text>
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
          disabled={!selectedGoal}
          className={`w-full py-4 rounded-2xl items-center ${
            selectedGoal ? "bg-red-500 shadow-lg shadow-red-200" : "bg-gray-200"
          }`}
        >
          <Text className={`font-bold text-lg ${selectedGoal ? "text-white" : "text-gray-400"}`}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
