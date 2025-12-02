import { homeArticles } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;

  // Find the article by ID
  const article = homeArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-slate-500">Article not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Image with Title Overlay */}
        <View className="relative h-80">
          <Image
            source={{ uri: article.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          
          {/* Gradient Overlay */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
            className="absolute inset-0"
          />

          {/* Back Button */}
          <SafeAreaView edges={["top"]} className="absolute top-0 left-0 right-0">
            <View className="px-6 py-4">
              <Pressable
                onPress={() => router.back()}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-lg items-center justify-center active:bg-white/30"
                style={{ backdropFilter: "blur(10px)" }}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </Pressable>
            </View>
          </SafeAreaView>

          {/* Title and Read Time Overlay */}
          <View className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            <Text className="text-white text-3xl font-bold leading-10 mb-3">
              {article.title}
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={16} color="white" />
              <Text className="text-white text-sm ml-2">{article.readTime}</Text>
            </View>
          </View>
        </View>

        {/* Article Content */}
        <View className="px-6 py-8">
          {/* Introduction Section */}
          <View className="mb-8">
            <Text className="text-2xl font-bold text-slate-900 mb-4">
              Introduction
            </Text>
            <Text className="text-slate-700 text-base leading-7">
              {article.content.introduction}
            </Text>
          </View>

          {/* Content Sections */}
          {article.content.sections.map((section, index) => (
            <View key={index} className="mb-8">
              <Text className="text-xl font-bold text-slate-900 mb-3">
                {section.title}
              </Text>
              <Text className="text-slate-700 text-base leading-7">
                {section.content}
              </Text>
            </View>
          ))}

          {/* Related Articles Section */}
          <View className="mt-8 pt-8 border-t border-slate-200">
            <Text className="text-xl font-bold text-slate-900 mb-4">
              Related Articles
            </Text>
            <View className="space-y-4">
              {homeArticles
                .filter((a) => a.id !== id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Pressable
                    key={relatedArticle.id}
                    onPress={() =>
                      router.push({
                        pathname: "/article/[id]",
                        params: { id: relatedArticle.id },
                      })
                    }
                    className="flex-row bg-slate-50 rounded-2xl p-4 mb-3"
                    style={({ pressed }) => [
                      pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] },
                    ]}
                  >
                    <View
                      className="w-16 h-16 rounded-xl items-center justify-center mr-4"
                      style={{ backgroundColor: relatedArticle.color }}
                    >
                      <Image
                        source={{ uri: relatedArticle.image }}
                        className="w-14 h-14 rounded-lg"
                        resizeMode="cover"
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-slate-900 text-base font-bold leading-5 mb-1"
                        numberOfLines={2}
                      >
                        {relatedArticle.title}
                      </Text>
                      <View className="flex-row items-center">
                        <Ionicons name="time-outline" size={12} color="#94a3b8" />
                        <Text className="text-slate-500 text-xs ml-1">
                          {relatedArticle.readTime}
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                  </Pressable>
                ))}
            </View>
          </View>

          {/* Bottom Spacing */}
          <View className="h-12" />
        </View>
      </ScrollView>

      {/* Floating Action Buttons */}
      <View className="absolute bottom-8 right-6 space-y-3">
        <Pressable
          className="w-14 h-14 rounded-full bg-white shadow-lg shadow-slate-300 items-center justify-center active:bg-slate-50"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name="bookmark-outline" size={24} color="#1e293b" />
        </Pressable>
        <Pressable
          className="w-14 h-14 rounded-full bg-white shadow-lg shadow-slate-300 items-center justify-center active:bg-slate-50"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name="share-outline" size={24} color="#1e293b" />
        </Pressable>
      </View>
    </View>
  );
}
