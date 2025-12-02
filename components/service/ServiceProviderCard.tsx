import { ServiceProviderInfo } from "@/types/service";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type ServiceProviderCardProps = {
  provider: ServiceProviderInfo;
};

export function ServiceProviderCard({ provider }: ServiceProviderCardProps) {
  return (
    <View className="mt-6 bg-white rounded-3xl p-4 border border-slate-100">
      <Text className="text-lg font-semibold text-slate-900">
        Service Provider
      </Text>
      <View className="flex-row items-center mt-4">
        <Image
          source={{ uri: provider.avatar }}
          className="h-14 w-14 rounded-full"
        />
        <View className="flex-1 ml-4">
          <Text className="text-base font-semibold text-slate-900">
            {provider.name}
          </Text>
          <Text className="text-slate-500 text-sm">{provider.role}</Text>
        </View>
        <View className="flex-row gap-3">
          <Pressable
            className="h-11 w-11 rounded-full bg-emerald-50 items-center justify-center active:opacity-85"
          >
            <Ionicons name="chatbubble-ellipses" size={20} color="#059669" />
          </Pressable>
          <Pressable
            className="h-11 w-11 rounded-full bg-slate-900 items-center justify-center active:opacity-85"
          >
            <Ionicons name="call" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
      <Text className="text-slate-400 text-xs mt-3">Phone</Text>
      <Text className="text-slate-900 font-semibold text-sm">{provider.phone}</Text>
    </View>
  );
}

