import { ServiceCard } from "@/components/home/ServiceCard";
import { services } from "@/constants/services";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PopularServicesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center active:bg-slate-100 mr-4"
        >
          <Ionicons name="chevron-back" size={24} color="#1e293b" />
        </Pressable>

        <Text className="text-xl font-bold text-slate-900">
          Popular Services
        </Text>
      </View>

      {/* Services List */}
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="space-y-5">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() =>
                router.push({
                  pathname: "/service/[serviceId]",
                  params: { serviceId: service.id },
                })
              }
              onBookPress={() =>
                router.push({
                  pathname: "/service/[serviceId]",
                  params: { serviceId: service.id },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
