import { TopProviderCard } from "@/components/home/TopProviderCard";
import { topProviders } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TopProvidersScreen() {
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
          Top Rated Providers
        </Text>
      </View>

      {/* Providers Grid */}
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap">
          {topProviders.map((provider) => (
            <View key={provider.id} className="w-1/3 items-center mb-6">
              <TopProviderCard
                name={provider.name}
                role={provider.role}
                rating={provider.rating}
                image={provider.image}
                onPress={() => {}}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
