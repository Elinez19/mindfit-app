import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type ArticleCardProps = {
  title: string;
  readTime: string;
  category: string;
  image: string;
  color: string;
  onPress?: () => void;
};

export function ArticleCard({
  title,
  readTime,
  category,
  image,
  color,
  onPress,
}: ArticleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-3xl overflow-hidden shadow-sm shadow-slate-200 border border-slate-100 mb-4"
      style={({ pressed }) => [
        pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View className="flex-row items-center p-4">
        {/* Image with colored background */}
        <View
          className="w-20 h-20 rounded-2xl items-center justify-center mr-4"
          style={{ backgroundColor: color }}
        >
          <Image
            source={{ uri: image }}
            className="w-16 h-16 rounded-xl"
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <View className="flex-1 mr-2">
          <Text
            className="text-slate-900 text-base font-bold leading-5 mb-2"
            numberOfLines={2}
          >
            {title}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={14} color="#94a3b8" />
            <Text className="text-slate-500 text-xs ml-1">{readTime}</Text>
          </View>
        </View>

        {/* Arrow */}
        <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
      </View>
    </Pressable>
  );
}
