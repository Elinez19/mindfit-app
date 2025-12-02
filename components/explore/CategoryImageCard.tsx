import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";

type CategoryImageCardProps = {
  name: string;
  serviceCount: number;
  image: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress?: () => void;
};

export function CategoryImageCard({
  name,
  serviceCount,
  image,
  icon,
  color,
  onPress,
}: CategoryImageCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-44 mr-4"
      style={({ pressed }) => [
        pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View className="bg-white rounded-3xl overflow-hidden shadow-sm shadow-slate-200 border border-slate-100">
        {/* Image with gradient overlay */}
        <View className="relative h-32">
          <Image
            source={{ uri: image }}
            className="w-full h-full bg-slate-200"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.7)"]}
            className="absolute inset-0"
          />
          
          {/* Icon */}
          <View
            className="absolute top-3 right-3 w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <Ionicons name={icon} size={20} color="white" />
          </View>
        </View>

        {/* Content */}
        <View className="p-4">
          <Text className="text-slate-900 text-base font-bold mb-1" numberOfLines={1}>
            {name}
          </Text>
          <Text className="text-slate-500 text-xs">
            {serviceCount} services
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
