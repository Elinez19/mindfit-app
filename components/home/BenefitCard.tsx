import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Text, TouchableOpacity, View } from "react-native";

type BenefitCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
  onPress?: () => void;
};

export function BenefitCard({
  icon,
  title,
  description,
  color,
  onPress,
}: BenefitCardProps) {
  return (
    <BlurView intensity={30} tint="light" className="rounded-3xl flex-1">
      <TouchableOpacity
        activeOpacity={0.85}
        className="rounded-3xl bg-white/75 p-4"
        onPress={onPress}
      >
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center mb-3"
          style={{ backgroundColor: `${color}15` }}
        >
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <Text className="text-slate-900 text-sm font-bold mb-1">
          {title}
        </Text>
        <Text className="text-slate-600 text-xs leading-5">
          {description}
        </Text>
      </TouchableOpacity>
    </BlurView>
  );
}
