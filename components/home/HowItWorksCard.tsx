import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Text, TouchableOpacity, View } from "react-native";

type HowItWorksCardProps = {
  step: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  isLast?: boolean;
  onPress?: () => void;
};

export function HowItWorksCard({
  step,
  title,
  description,
  icon,
  isLast = false,
  onPress,
}: HowItWorksCardProps) {
  return (
    <View className="flex-row mb-6">
      {/* Left side - Step indicator */}
      <View className="items-center mr-4">
        <BlurView intensity={30} tint="light" className="rounded-2xl">
          <View className="bg-slate-900 rounded-2xl w-14 h-14 items-center justify-center">
            <Ionicons name={icon} size={24} color="#fff" />
          </View>
        </BlurView>
        {!isLast && (
          <View className="w-0.5 bg-slate-300 flex-1 mt-2" style={{ minHeight: 40 }} />
        )}
      </View>

      {/* Right side - Content */}
      <View className="flex-1">
        <BlurView intensity={30} tint="light" className="rounded-3xl">
          <TouchableOpacity
            activeOpacity={0.85}
            className="rounded-3xl bg-white/75 p-4"
            onPress={onPress}
          >
            <View className="flex-row items-center mb-2">
              <Text className="text-slate-400 text-xs font-bold mr-2">
                STEP {step}
              </Text>
            </View>
            <Text className="text-slate-900 text-base font-bold mb-1">
              {title}
            </Text>
            <Text className="text-slate-600 text-sm leading-5">
              {description}
            </Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
}
