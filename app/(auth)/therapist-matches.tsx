import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TherapistMatch {
  therapist: {
    id: string;
    name: string;
    role: string;
    rating: number;
    image: string;
  };
  reasoning: string;
  matchScore: number;
}

export default function TherapistMatchesScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [matches, setMatches] = useState<TherapistMatch[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (params.matches) {
      try {
        const parsedMatches = JSON.parse(params.matches as string);
        setMatches(parsedMatches);
      } catch (error) {
        console.error("Failed to parse matches:", error);
      }
    }
  }, [params.matches]);

  const handleBookSession = () => {
    if (selectedTherapist) {
      // Navigate to booking or sign-up
      router.push("/(auth)/sign-up");
    }
  };

  if (matches.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#9333EA" />
        <Text className="mt-4 text-gray-600">Finding your perfect match...</Text>
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
            Your Therapist Matches
          </Text>
          <View className="w-6" />
        </View>
        <Text className="text-center text-gray-600 text-sm mt-1">
          AI-matched based on your assessment
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* AI Matching Info */}
        <View className="px-6 pt-6 pb-4">
          <View className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-purple-600 rounded-full items-center justify-center mr-3">
                <Ionicons name="sparkles" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-purple-900 text-sm">
                  AI-Powered Matching
                </Text>
                <Text className="text-purple-700 text-xs mt-1">
                  These therapists are specially selected for your unique needs
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Therapist Cards */}
        <View className="px-6 gap-4 pb-32">
          {matches.map((match, index) => (
            <TherapistCard
              key={match.therapist.id}
              match={match}
              rank={index + 1}
              isSelected={selectedTherapist === match.therapist.id}
              onSelect={() => setSelectedTherapist(match.therapist.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6">
        <TouchableOpacity
          onPress={handleBookSession}
          disabled={!selectedTherapist}
          className={`py-4 rounded-2xl ${
            selectedTherapist
              ? "bg-purple-600 shadow-lg shadow-purple-200"
              : "bg-gray-200"
          }`}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons
              name="calendar"
              size={20}
              color={selectedTherapist ? "white" : "#9CA3AF"}
            />
            <Text
              className={`ml-2 font-bold text-lg ${
                selectedTherapist ? "text-white" : "text-gray-400"
              }`}
            >
              Book First Session
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(root)/(tabs)/Explore" as any)}
          className="mt-3 py-3"
        >
          <Text className="text-center text-purple-600 font-semibold">
            Browse All Therapists
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Therapist Card Component
interface TherapistCardProps {
  match: TherapistMatch;
  rank: number;
  isSelected: boolean;
  onSelect: () => void;
}

function TherapistCard({
  match,
  rank,
  isSelected,
  onSelect,
}: TherapistCardProps) {
  const { therapist, reasoning, matchScore } = match;

  const getRankBadge = (rank: number) => {
    if (rank === 1)
      return { label: "Best Match", color: "#9333EA", icon: "star" };
    if (rank === 2)
      return { label: "Great Match", color: "#0EA5E9", icon: "heart" };
    return { label: "Good Match", color: "#059669", icon: "checkmark-circle" };
  };

  const badge = getRankBadge(rank);

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.9}
      className={`bg-white rounded-2xl overflow-hidden border-2 ${
        isSelected ? "border-purple-600" : "border-gray-100"
      } shadow-sm`}
    >
      {/* Rank Badge */}
      <View
        className="px-4 py-2 flex-row items-center justify-between"
        style={{ backgroundColor: `${badge.color}15` }}
      >
        <View className="flex-row items-center">
          <Ionicons name={badge.icon as any} size={16} color={badge.color} />
          <Text
            className="ml-2 font-bold text-sm"
            style={{ color: badge.color }}
          >
            {badge.label}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="analytics" size={14} color={badge.color} />
          <Text
            className="ml-1 font-semibold text-xs"
            style={{ color: badge.color }}
          >
            {matchScore}% Match
          </Text>
        </View>
      </View>

      {/* Therapist Info */}
      <View className="p-5">
        <View className="flex-row items-start mb-4">
          <Image
            source={{ uri: therapist.image }}
            className="w-20 h-20 rounded-2xl mr-4"
          />
          <View className="flex-1">
            <Text className="font-bold text-lg text-gray-900 mb-1">
              {therapist.name}
            </Text>
            <Text className="text-purple-600 text-sm font-semibold mb-2">
              {therapist.role}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text className="ml-1 font-semibold text-gray-700">
                {therapist.rating}
              </Text>
              <Text className="ml-1 text-gray-500 text-sm">(4.9)</Text>
            </View>
          </View>
        </View>

        {/* AI Reasoning */}
        <View className="bg-gray-50 p-4 rounded-xl">
          <View className="flex-row items-center mb-2">
            <Ionicons name="bulb-outline" size={16} color="#9333EA" />
            <Text className="ml-2 font-semibold text-gray-900 text-sm">
              Why this match?
            </Text>
          </View>
          <Text className="text-gray-700 text-sm leading-5">{reasoning}</Text>
        </View>

        {/* Selection Indicator */}
        {isSelected && (
          <View className="mt-4 bg-purple-50 p-3 rounded-xl flex-row items-center justify-center">
            <Ionicons name="checkmark-circle" size={20} color="#9333EA" />
            <Text className="ml-2 font-semibold text-purple-900">
              Selected for booking
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
