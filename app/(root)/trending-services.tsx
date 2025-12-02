import { TrendingServiceCard } from "@/components/explore/TrendingServiceCard";
import { trendingServices } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrendingServicesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-100">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center active:bg-slate-100"
        >
          <Ionicons name="chevron-back" size={24} color="#1e293b" />
        </Pressable>

        <Text className="text-lg font-bold text-slate-900">
          Trending Services
        </Text>

        <Pressable>
          <Ionicons name="funnel-outline" size={22} color="#1e293b" />
        </Pressable>
      </View>

      {/* Services Grid */}
      <FlatList
        data={trendingServices}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <View className="px-6 mb-4">
            <TrendingServiceCard
              title={item.title}
              category={item.category}
              price={item.price}
              rating={item.rating}
              reviews={item.reviews}
              image={item.image}
              badge={item.badge}
              onPress={() => router.push(`/service/${item.id}`)}
            />
          </View>
        )}
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
