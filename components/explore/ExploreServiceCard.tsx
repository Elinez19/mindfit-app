import { ServiceSummary } from "@/types/service";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type ExploreServiceCardProps = {
  service: ServiceSummary;
  onPress?: () => void;
  onBookmarkPress?: () => void;
};

export function ExploreServiceCard({
  service,
  onPress,
  onBookmarkPress,
}: ExploreServiceCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row bg-white p-3 rounded-3xl mb-4 shadow-sm shadow-slate-200 border border-slate-100"
      style={({ pressed }) => [
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
    >
      <Image
        source={{ uri: service.image }}
        className="w-28 h-28 rounded-2xl bg-slate-200"
        resizeMode="cover"
      />
      
      <View className="flex-1 ml-4 justify-between py-1">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-2">
            <Text className="text-slate-500 text-xs font-medium mb-1" numberOfLines={1}>
              {service.provider.name}
            </Text>
            <Text className="text-slate-900 text-base font-bold leading-5" numberOfLines={2}>
              {service.title}
            </Text>
          </View>
          <Pressable onPress={onBookmarkPress} hitSlop={8}>
            <Ionicons name="bookmark-outline" size={22} color="#94a3b8" />
          </Pressable>
        </View>

        <View>
          <Text className="text-slate-900 font-bold text-lg">
            {service.price}
            <Text className="text-slate-400 text-xs font-normal">/Day</Text>
          </Text>
          
          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={14} color="#ef4444" />
            <Text className="text-slate-700 text-xs font-bold ml-1">
              {service.rating}
            </Text>
            <Text className="text-slate-400 text-xs ml-1">
              (120 Reviews)
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
