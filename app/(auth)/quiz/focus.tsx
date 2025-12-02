import { quizFocus } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FocusScreen() {
  const router = useRouter();
  const [selectedFocus, setSelectedFocus] = useState<string[]>([]);

  const toggleFocus = (id: string) => {
    if (selectedFocus.includes(id)) {
      setSelectedFocus(selectedFocus.filter((item) => item !== id));
    } else {
      setSelectedFocus([...selectedFocus, id]);
    }
  };

  const handleContinue = () => {
    router.push("/(auth)/quiz/gender");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-2 pb-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={() => router.push("/(auth)/quiz/goal")}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-semibold text-lg">Set Your Goal</Text>
          <View className="w-6" /> 
        </View>
        
        {/* Progress Bar */}
        <View className="flex-row h-1 gap-2 px-2">
          <View className="flex-1 bg-red-500 rounded-full" />
          <View className="flex-1 bg-red-500 rounded-full" />
          <View className="flex-1 bg-gray-100 rounded-full" />
          <View className="flex-1 bg-gray-100 rounded-full" />
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        <Text className="text-3xl font-bold text-center mt-4 mb-12 leading-tight">
          What would you like to{"\n"}focus on?
        </Text>

        <View className="gap-4">
          {quizFocus.map((item) => {
            const isSelected = selectedFocus.includes(item.id);
            const containerClass = `flex-row items-center p-4 rounded-2xl border ${
              isSelected ? "border-red-500 bg-red-50" : "border-gray-100 bg-white"
            } shadow-sm shadow-gray-100`;

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => toggleFocus(item.id)}
                activeOpacity={0.8}
                className={containerClass}
              >
                <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                    isSelected ? "bg-white" : "bg-gray-100"
                }`}>
                  <Ionicons 
                    name={item.icon as any} 
                    size={24} 
                    color={isSelected ? "#EF4444" : "black"} 
                  />
                </View>
                <View className="flex-1 mr-2">
                  <Text className="font-bold text-base text-gray-900 mb-1">{item.title}</Text>
                  <Text className="text-gray-400 text-xs leading-4">{item.description}</Text>
                </View>
                
                {isSelected ? (
                    <View className="w-6 h-6 bg-black rounded-full items-center justify-center">
                        <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                ) : (
                    <View className="w-6 h-6 rounded-full border border-gray-200" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6">
        <TouchableOpacity
          onPress={handleContinue}
          disabled={selectedFocus.length === 0}
          className={`w-full py-4 rounded-2xl items-center ${
            selectedFocus.length > 0 ? "bg-red-500 shadow-lg shadow-red-200" : "bg-gray-200"
          }`}
        >
          <Text className={`font-bold text-lg ${selectedFocus.length > 0 ? "text-white" : "text-gray-400"}`}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
