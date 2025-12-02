import { ArticleCard } from "@/components/explore/ArticleCard";
import { homeArticles } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AllArticlesScreen() {
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
          Home Care Articles
        </Text>

        <Pressable>
          <Ionicons name="search-outline" size={24} color="#1e293b" />
        </Pressable>
      </View>

      {/* Articles List */}
      <FlatList
        data={homeArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard
            title={item.title}
            readTime={item.readTime}
            category={item.category}
            image={item.image}
            color={item.color}
            onPress={() =>
              router.push({
                pathname: "/article/[id]",
                params: { id: item.id, title: item.title },
              })
            }
          />
        )}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
