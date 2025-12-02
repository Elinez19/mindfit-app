import { ServiceSummary } from "@/types/service";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ServiceCardProps = {
  service: ServiceSummary;
  onPress?: () => void;
  onBookPress?: () => void;
};

export function ServiceCard({
  service,
  onPress,
  onBookPress,
}: ServiceCardProps) {
  return (
    <BlurView intensity={30} tint="light" className="rounded-3xl">
      <TouchableOpacity
        activeOpacity={0.85}
        className="rounded-3xl bg-white/75 overflow-hidden"
        onPress={onPress}
      >
        <Image source={{ uri: service.image }} className="h-44 w-full" />
        <View className="p-4 space-y-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-900 text-lg font-semibold flex-1 pr-4">
              {service.title}
            </Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={16} color="#fbbf24" />
              <Text className="text-slate-700 text-sm font-semibold">
                {service.rating}
              </Text>
            </View>
          </View>
          <Text className="text-slate-600 text-sm">
            by {service.provider.name} • {service.location}
          </Text>
          <View className="flex-row items-center justify-between mt-2">
            <Text className="text-slate-900 text-base font-semibold">
              {service.price}
            </Text>
            <TouchableOpacity
              onPress={onBookPress}
              className="bg-slate-900 rounded-2xl px-4 py-2"
              activeOpacity={0.85}
            >
              <Text className="text-white text-sm font-semibold">Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </BlurView>
  );
}
