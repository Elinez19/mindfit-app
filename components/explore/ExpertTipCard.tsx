import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

type ExpertTipCardProps = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress?: () => void;
};

export function ExpertTipCard({
  title,
  description,
  icon,
  color,
  onPress,
}: ExpertTipCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm shadow-slate-200 border border-slate-100"
      style={({ pressed }) => [
        pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View className="flex-row items-start">
        {/* Icon */}
        <View
          className="w-12 h-12 rounded-2xl items-center justify-center mr-3"
          style={{ backgroundColor: `${color}20` }}
        >
          <Ionicons name={icon} size={24} color={color} />
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text className="text-slate-900 text-base font-bold mb-1">
            {title}
          </Text>
          <Text className="text-slate-600 text-sm leading-5">
            {description}
          </Text>
        </View>

        {/* Arrow */}
        <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
      </View>
    </Pressable>
  );
}
