import { ServiceSummary } from "@/types/service";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type RecommendedServiceCardProps = {
  service: ServiceSummary;
  onPress?: () => void;
};

export function RecommendedServiceCard({
  service,
  onPress,
}: RecommendedServiceCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-40 mr-4 bg-white rounded-2xl overflow-hidden shadow-sm shadow-slate-200 border border-slate-100"
      style={({ pressed }) => [
        pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
      ]}
    >
      <Image
        source={{ uri: service.image }}
        className="w-full h-28 bg-slate-200"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text className="text-slate-900 font-semibold text-sm mb-1" numberOfLines={1}>
          {service.title}
        </Text>
        <View className="flex-row items-center mb-2">
          <Ionicons name="star" size={12} color="#fbbf24" />
          <Text className="text-slate-600 text-xs ml-1 font-medium">
            {service.rating}
          </Text>
        </View>
        <Text className="text-emerald-600 font-bold text-sm">
          {service.price}
        </Text>
      </View>
    </Pressable>
  );
}
