import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AnalysisSection {
  primaryConcerns: string;
  recommendedTherapy: string;
  therapistSpecialization: string;
  wellnessPlan: string;
  urgencyLevel: string;
  additionalResources: string;
}

export default function AssessmentResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [analysis, setAnalysis] = useState<AnalysisSection | null>(null);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);

  useEffect(() => {
    if (params.analysis) {
      try {
        const parsedAnalysis = JSON.parse(params.analysis as string);
        setAnalysis(parsedAnalysis);
      } catch (error) {
        console.error("Failed to parse analysis:", error);
      }
    }
  }, [params.analysis]);

  const handleFindTherapist = async () => {
    setIsLoadingMatches(true);

    try {
      // Call therapist matching API
      const response = await fetch("/therapist-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userProfile: {
            concerns: analysis?.primaryConcerns,
            preferredTherapy: analysis?.recommendedTherapy,
          },
          assessmentAnalysis: analysis,
        }),
      });

      const result = await response.json();

      // Navigate to therapist matches
      router.push({
        pathname: "/(auth)/therapist-matches" as any,
        params: {
          matches: JSON.stringify(result.recommendations),
        },
      });
    } catch (error) {
      console.error("Therapist matching error:", error);
    } finally {
      setIsLoadingMatches(false);
    }
  };

  const getUrgencyColor = (level: string) => {
    const lowerLevel = level.toLowerCase();
    if (lowerLevel.includes("high") || lowerLevel.includes("critical"))
      return "#EF4444";
    if (lowerLevel.includes("medium")) return "#F59E0B";
    return "#10B981";
  };

  const getUrgencyIcon = (level: string) => {
    const lowerLevel = level.toLowerCase();
    if (lowerLevel.includes("high") || lowerLevel.includes("critical"))
      return "alert-circle";
    if (lowerLevel.includes("medium")) return "warning";
    return "checkmark-circle";
  };

  if (!analysis) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#9333EA" />
        <Text className="mt-4 text-gray-600">Loading your results...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-4 pb-4 bg-white">
        <View className="flex-row items-center mb-2">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#9333EA" />
          </TouchableOpacity>
          <Text className="flex-1 text-center font-bold text-xl text-gray-900">
            Your Assessment Results
          </Text>
          <View className="w-6" />
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* AI Analysis Badge */}
        <View className="px-6 pt-6 pb-4">
          <View className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-2xl border border-purple-200">
            <View className="flex-row items-center mb-2">
              <View className="w-10 h-10 bg-purple-600 rounded-full items-center justify-center mr-3">
                <Ionicons name="sparkles" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-purple-900 text-base">
                  AI-Powered Analysis
                </Text>
                <Text className="text-purple-700 text-sm">
                  Analyzed by Gemini 3 Pro
                </Text>
              </View>
            </View>
            <Text className="text-purple-800 text-sm leading-5">
              This personalized assessment was analyzed using advanced AI to
              provide you with the most relevant recommendations.
            </Text>
          </View>
        </View>

        {/* Urgency Level */}
        <View className="px-6 pb-4">
          <View
            className="p-4 rounded-2xl"
            style={{
              backgroundColor: `${getUrgencyColor(analysis.urgencyLevel)}15`,
              borderWidth: 2,
              borderColor: getUrgencyColor(analysis.urgencyLevel),
            }}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={getUrgencyIcon(analysis.urgencyLevel) as any}
                size={24}
                color={getUrgencyColor(analysis.urgencyLevel)}
              />
              <View className="flex-1 ml-3">
                <Text className="font-semibold text-gray-700 text-sm">
                  Priority Level
                </Text>
                <Text
                  className="font-bold text-base"
                  style={{ color: getUrgencyColor(analysis.urgencyLevel) }}
                >
                  {analysis.urgencyLevel}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Analysis Sections */}
        <View className="px-6 gap-4">
          {/* Primary Concerns */}
          <AnalysisCard
            icon="heart-outline"
            iconColor="#9333EA"
            title="Primary Concerns"
            content={analysis.primaryConcerns}
          />

          {/* Recommended Therapy */}
          <AnalysisCard
            icon="medical-outline"
            iconColor="#0EA5E9"
            title="Recommended Therapy Type"
            content={analysis.recommendedTherapy}
          />

          {/* Therapist Specialization */}
          <AnalysisCard
            icon="people-outline"
            iconColor="#059669"
            title="Ideal Therapist Profile"
            content={analysis.therapistSpecialization}
          />

          {/* Wellness Plan */}
          <AnalysisCard
            icon="clipboard-outline"
            iconColor="#F59E0B"
            title="Initial Wellness Plan"
            content={analysis.wellnessPlan}
          />

          {/* Additional Resources */}
          {analysis.additionalResources && (
            <AnalysisCard
              icon="book-outline"
              iconColor="#DB2777"
              title="Recommended Resources"
              content={analysis.additionalResources}
            />
          )}
        </View>

        {/* Spacer for footer */}
        <View className="h-32" />
      </ScrollView>

      {/* Footer CTA */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <TouchableOpacity
          onPress={handleFindTherapist}
          disabled={isLoadingMatches}
          className="bg-purple-600 py-4 rounded-2xl shadow-lg shadow-purple-200"
        >
          {isLoadingMatches ? (
            <View className="flex-row items-center justify-center">
              <ActivityIndicator color="white" size="small" />
              <Text className="ml-2 font-bold text-lg text-white">
                Finding Your Match...
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center justify-center">
              <Ionicons name="search" size={20} color="white" />
              <Text className="ml-2 font-bold text-lg text-white">
                Find My Therapist
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-up")}
          className="mt-3 py-3"
        >
          <Text className="text-center text-purple-600 font-semibold">
            Save Results & Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Analysis Card Component
interface AnalysisCardProps {
  icon: string;
  iconColor: string;
  title: string;
  content: string;
}

function AnalysisCard({ icon, iconColor, title, content }: AnalysisCardProps) {
  return (
    <View className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <View className="flex-row items-center mb-3">
        <View
          className="w-10 h-10 rounded-xl items-center justify-center mr-3"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Ionicons name={icon as any} size={20} color={iconColor} />
        </View>
        <Text className="font-bold text-gray-900 text-base flex-1">
          {title}
        </Text>
      </View>
      <Text className="text-gray-700 text-sm leading-6">{content}</Text>
    </View>
  );
}
