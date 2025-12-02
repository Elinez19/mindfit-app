import { ExpertTipCard } from "@/components/explore/ExpertTipCard";
import { expertTips } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpertTipsScreen() {
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
          Expert Tips
        </Text>

        <View className="w-10" />
      </View>

      {/* Tips List */}
      <FlatList
        data={expertTips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpertTipCard
            title={item.title}
            description={item.description}
            icon={item.icon as any}
            color={item.color}
            onPress={() => {}}
          />
        )}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
