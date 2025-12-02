import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type TrendingServiceCardProps = {
  title: string;
  category: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  onPress?: () => void;
};

export function TrendingServiceCard({
  title,
  category,
  price,
  rating,
  reviews,
  image,
  badge,
  onPress,
}: TrendingServiceCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-72 mr-4"
      style={({ pressed }) => [
        pressed && { opacity: 0.95, transform: [{ scale: 0.98 }] },
      ]}
    >
      <View className="bg-white rounded-3xl overflow-hidden shadow-sm shadow-slate-200 border border-slate-100">
        {/* Image */}
        <View className="relative">
          <Image
            source={{ uri: image }}
            className="w-full h-48 bg-slate-200"
            resizeMode="cover"
          />
          {badge && (
            <View className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-full">
              <Text className="text-xs font-bold text-slate-900">{badge}</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="p-4">
          <Text className="text-slate-500 text-xs font-medium mb-1">
            {category}
          </Text>
          <Text
            className="text-slate-900 text-lg font-bold leading-6 mb-2"
            numberOfLines={2}
          >
            {title}
          </Text>

          <View className="flex-row items-center justify-between">
            <Text className="text-slate-900 font-bold text-base">{price}</Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#f59e0b" />
              <Text className="text-slate-700 text-sm font-bold ml-1">
                {rating}
              </Text>
              <Text className="text-slate-400 text-xs ml-1">
                ({reviews})
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
