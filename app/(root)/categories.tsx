import { categories } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesScreen() {
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
          All Categories
        </Text>
      </View>

      {/* Categories Grid */}
      <ScrollView
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between">
          {categories.map((category) => (
            <Pressable
              key={category.label}
              onPress={() => {
                // Navigate to explore tab
                router.push("/(root)/(tabs)/Explore");
              }}
              className="w-[48%] mb-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm shadow-slate-200"
              style={({ pressed }) => [
                pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
              ]}
            >
              <View className="w-16 h-16 rounded-2xl bg-slate-900 items-center justify-center mb-4">
                <Ionicons name={category.icon} size={28} color="#fff" />
              </View>
              <Text className="text-slate-900 font-bold text-base">
                {category.label}
              </Text>
              <Text className="text-slate-500 text-xs mt-1">
                View services
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
