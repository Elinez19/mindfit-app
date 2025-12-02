import { aiAssessmentQuestions } from "@/constants/ai-assessment";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AssessmentResponse {
  questionId: string;
  selectedOptions: string[];
}

export default function AIAssessmentScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentQuestion = aiAssessmentQuestions[currentStep];
  const totalSteps = aiAssessmentQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  // Get current response for this question
  const currentResponse = responses.find(
    (r) => r.questionId === currentQuestion.id
  );
  const selectedOptions = currentResponse?.selectedOptions || [];

  const handleSelectOption = (optionId: string) => {
    const existingResponseIndex = responses.findIndex(
      (r) => r.questionId === currentQuestion.id
    );

    let newSelectedOptions: string[];

    if (currentQuestion.type === "single-select") {
      // Single select: replace the selection
      newSelectedOptions = [optionId];
    } else {
      // Multi-select: toggle the option
      if (selectedOptions.includes(optionId)) {
        newSelectedOptions = selectedOptions.filter((id) => id !== optionId);
      } else {
        newSelectedOptions = [...selectedOptions, optionId];
      }
    }

    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      selectedOptions: newSelectedOptions,
    };

    if (existingResponseIndex >= 0) {
      const updatedResponses = [...responses];
      updatedResponses[existingResponseIndex] = newResponse;
      setResponses(updatedResponses);
    } else {
      setResponses([...responses, newResponse]);
    }
  };

  const handleContinue = async () => {
    if (currentStep < totalSteps - 1) {
      // Move to next question
      setCurrentStep(currentStep + 1);
    } else {
      // Assessment complete - analyze with AI
      await analyzeAssessment();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const analyzeAssessment = async () => {
    setIsAnalyzing(true);

    try {
      // Prepare assessment data for AI analysis
      const assessmentData = prepareAssessmentData();

      // Call AI assessment API
      const response = await fetch("/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assessmentData }),
      });

      const result = await response.json();

      if (result.isCrisis) {
        // Handle crisis situation
        Alert.alert(
          "Immediate Support Available",
          result.crisisResponse,
          [
            {
              text: "Call 988",
              onPress: () => {
                // In a real app, this would initiate a phone call
                console.log("Calling 988...");
              },
            },
            {
              text: "Continue",
              style: "cancel",
            },
          ]
        );
      } else {
        // Navigate to results screen with AI analysis
        router.push({
          pathname: "/(auth)/assessment-results" as any,
          params: {
            analysis: JSON.stringify(result.analysis),
          },
        });
      }
    } catch (error) {
      console.error("Assessment analysis error:", error);
      Alert.alert(
        "Error",
        "We couldn't analyze your assessment. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const prepareAssessmentData = () => {
    const data: any = {};

    responses.forEach((response) => {
      const question = aiAssessmentQuestions.find(
        (q) => q.id === response.questionId
      );
      if (question) {
        const selectedTitles = response.selectedOptions.map((optionId) => {
          const option = question.options.find((opt) => opt.id === optionId);
          return option?.title || optionId;
        });

        data[question.question] = selectedTitles.join(", ");
      }
    });

    return data;
  };

  const canContinue = selectedOptions.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-2 pb-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#9333EA" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-semibold text-lg text-gray-900">
            Mental Health Assessment
          </Text>
          <View className="w-6" />
        </View>

        {/* Progress Bar */}
        <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <View
            className="h-full bg-purple-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </View>
        <Text className="text-center text-xs text-gray-500 mt-2">
          Step {currentStep + 1} of {totalSteps}
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Question */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {currentQuestion.question}
          </Text>
          <Text className="text-gray-500 text-base">
            {currentQuestion.subtitle}
          </Text>
        </View>

        {/* Options */}
        <View className="gap-3 mb-6">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <TouchableOpacity
                key={option.id}
                onPress={() => handleSelectOption(option.id)}
                activeOpacity={0.8}
                className={`flex-row items-center p-4 rounded-2xl border-2 ${
                  isSelected
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <View
                  className={`w-14 h-14 rounded-xl items-center justify-center mr-4 ${
                    isSelected ? "bg-purple-600" : "bg-gray-100"
                  }`}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={26}
                    color={isSelected ? "white" : "#6B7280"}
                  />
                </View>
                <View className="flex-1 mr-2">
                  <Text className="font-bold text-base text-gray-900 mb-1">
                    {option.title}
                  </Text>
                  {option.description && (
                    <Text className="text-gray-500 text-sm leading-5">
                      {option.description}
                    </Text>
                  )}
                </View>

                {isSelected && (
                  <View className="w-6 h-6 bg-purple-600 rounded-full items-center justify-center">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Multi-select hint */}
        {currentQuestion.type === "multi-select" && (
          <View className="bg-purple-50 p-4 rounded-xl mb-6">
            <View className="flex-row items-center">
              <Ionicons name="information-circle" size={20} color="#9333EA" />
              <Text className="ml-2 text-purple-900 text-sm">
                You can select multiple options
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View className="p-6 border-t border-gray-100">
        <TouchableOpacity
          onPress={handleContinue}
          disabled={!canContinue || isAnalyzing}
          className={`w-full py-4 rounded-2xl items-center ${
            canContinue && !isAnalyzing
              ? "bg-purple-600 shadow-lg shadow-purple-200"
              : "bg-gray-200"
          }`}
        >
          {isAnalyzing ? (
            <View className="flex-row items-center">
              <ActivityIndicator color="white" size="small" />
              <Text className="ml-2 font-bold text-lg text-white">
                Analyzing with AI...
              </Text>
            </View>
          ) : (
            <Text
              className={`font-bold text-lg ${
                canContinue ? "text-white" : "text-gray-400"
              }`}
            >
              {currentStep < totalSteps - 1 ? "Continue" : "Complete Assessment"}
            </Text>
          )}
        </TouchableOpacity>

        {/* Skip option for non-required questions */}
        {currentQuestion.type === "multi-select" && (
          <TouchableOpacity
            onPress={handleContinue}
            className="mt-3 py-2"
            disabled={isAnalyzing}
          >
            <Text className="text-center text-purple-600 font-semibold">
              Skip this question
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
