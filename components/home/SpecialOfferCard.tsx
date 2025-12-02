import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";

type SpecialOfferCardProps = {
  title: string;
  discount: string;
  description: string;
  code: string;
  color: [string, string];
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export function SpecialOfferCard({
  title,
  discount,
  description,
  code,
  color,
  icon,
  onPress,
}: SpecialOfferCardProps) {
  return (
    <BlurView intensity={30} tint="light" className="rounded-3xl mr-4 w-72">
      <TouchableOpacity
        activeOpacity={0.85}
        className="rounded-3xl overflow-hidden"
        onPress={onPress}
      >
        <LinearGradient
          colors={color}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-5"
        >
          <View className="flex-row items-start justify-between mb-3">
            <View className="bg-white/20 rounded-2xl p-3">
              <Ionicons name={icon} size={28} color="#fff" />
            </View>
            <View className="bg-white/20 rounded-xl px-3 py-1.5">
              <Text className="text-white text-xs font-bold">{discount}</Text>
            </View>
          </View>
          <Text className="text-white text-xl font-bold mb-2">{title}</Text>
          <Text className="text-white/90 text-sm mb-4 leading-5">
            {description}
          </Text>
          <View className="bg-white/20 rounded-xl px-4 py-2 self-start">
            <Text className="text-white text-xs font-mono font-bold">
              Code: {code}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </BlurView>
  );
}
