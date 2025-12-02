import { ArticleCard } from "@/components/explore/ArticleCard";
import { CategoryImageCard } from "@/components/explore/CategoryImageCard";
import { ExpertTipCard } from "@/components/explore/ExpertTipCard";
import { ExploreServiceCard } from "@/components/explore/ExploreServiceCard";
import { TrendingServiceCard } from "@/components/explore/TrendingServiceCard";
import { SearchBar } from "@/components/home/SearchBar";
import {
  expertTips,
  exploreCategoriesWithImages,
  homeArticles,
  trendingServices,
} from "@/constants/data";
import { services } from "@/constants/services";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  "All",
  "Repairing",
  "Electrical",
  "Plumbing",
  "Cleaning",
  "Painting",
];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Filter services based on selected category and search query
  const filteredServices = services.filter((service) => {
    // Get the service detail to access the category
    const serviceDetail = require("@/constants/services").getServiceDetail(service.id);
    if (!serviceDetail) return false;
    
    // Category filter
    let categoryMatch = true;
    if (activeCategory !== "All") {
      const categoryMap: { [key: string]: string[] } = {
        "Repairing": ["Repair", "Repairs"],
        "Electrical": ["Electrical", "Home Automation"],
        "Plumbing": ["Plumbing"],
        "Cleaning": ["Cleaning", "Home Cleaning"],
        "Painting": ["Painting"],
      };
      
      const matchCategories = categoryMap[activeCategory] || [activeCategory];
      categoryMatch = matchCategories.some(cat => 
        serviceDetail.category.toLowerCase().includes(cat.toLowerCase())
      );
    }
    
    // Search query filter
    let searchMatch = true;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      searchMatch = (
        service.title.toLowerCase().includes(query) ||
        serviceDetail.category.toLowerCase().includes(query) ||
        service.provider.name.toLowerCase().includes(query) ||
        service.location.toLowerCase().includes(query)
      );
    }
    
    return categoryMatch && searchMatch;
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="px-6 py-4 flex-row items-center justify-between bg-white">
        <View>
          <Text className="text-2xl font-bold text-slate-900">Explore</Text>
          <Text className="text-slate-500 text-sm mt-0.5">
            Discover services & tips
          </Text>
        </View>

        <View className="flex-row gap-3">
          <Pressable 
            onPress={() => setShowSearchModal(true)}
            className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center active:bg-slate-100"
          >
            <Ionicons name="search-outline" size={22} color="#1e293b" />
          </Pressable>
          <Pressable className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center active:bg-slate-100">
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#1e293b"
            />
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Home Care Articles Section */}
        <View className="mt-6">
          <View className="px-6 flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-xl font-bold text-slate-900">
                Home Care Articles
              </Text>
              <Text className="text-slate-500 text-sm mt-0.5">
                Tips & guides for your home
              </Text>
            </View>
            <Pressable onPress={() => router.push("/all-articles")}>
              <Text className="text-blue-600 font-semibold text-sm">
                View All
              </Text>
            </Pressable>
          </View>

          <View className="px-6">
            {homeArticles.slice(0, 3).map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                readTime={article.readTime}
                category={article.category}
                image={article.image}
                color={article.color}
                onPress={() =>
                  router.push({
                    pathname: "/article/[id]",
                    params: { id: article.id, title: article.title },
                  })
                }
              />
            ))}
          </View>
        </View>

        {/* Trending Services Section */}
        <View className="mt-6">
          <View className="px-6 flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-xl font-bold text-slate-900">
                Trending Now
              </Text>
              <Text className="text-slate-500 text-sm mt-0.5">
                Popular services this week
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {trendingServices.map((service) => (
              <TrendingServiceCard
                key={service.id}
                title={service.title}
                category={service.category}
                price={service.price}
                rating={service.rating}
                reviews={service.reviews}
                image={service.image}
                badge={service.badge}
                onPress={() => router.push(`/service/${service.id}`)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Service Categories Section */}
        <View className="mt-8">
          <View className="px-6 flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-xl font-bold text-slate-900">
                Browse by Category
              </Text>
              <Text className="text-slate-500 text-sm mt-0.5">
                Find the right service for you
              </Text>
            </View>
            <Pressable onPress={() => router.push("/categories")}>
              <Text className="text-blue-600 font-semibold text-sm">
                View All
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          >
            {exploreCategoriesWithImages.map((category) => (
              <CategoryImageCard
                key={category.id}
                name={category.name}
                serviceCount={category.serviceCount}
                image={category.image}
                icon={category.icon as any}
                color={category.color}
                onPress={() => router.push("/categories")}
              />
            ))}
          </ScrollView>
        </View>

        {/* Expert Tips Section */}
        <View className="mt-8">
          <View className="px-6 flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-xl font-bold text-slate-900">
                Expert Tips
              </Text>
              <Text className="text-slate-500 text-sm mt-0.5">
                Quick advice from professionals
              </Text>
            </View>
            <Pressable onPress={() => router.push("/expert-tips")}>
              <Text className="text-blue-600 font-semibold text-sm">
                View All
              </Text>
            </Pressable>
          </View>

          <View className="px-6">
            {expertTips.slice(0, 3).map((tip) => (
              <ExpertTipCard
                key={tip.id}
                title={tip.title}
                description={tip.description}
                icon={tip.icon as any}
                color={tip.color}
                onPress={() => router.push("/expert-tips")}
              />
            ))}
          </View>
        </View>

        {/* Popular Services Section */}
        <View className="mt-8 bg-white pt-6">
          <View className="px-6 flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-xl font-bold text-slate-900">
                Popular Services
              </Text>
              <Text className="text-slate-500 text-sm mt-0.5">
                Most booked this month
              </Text>
            </View>
          </View>

          {/* Categories Filter */}
          <View className="mb-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
              className="py-2"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <Pressable
                    key={cat}
                    onPress={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full border ${
                      isActive
                        ? "bg-slate-900 border-slate-900"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <Text
                      className={`font-semibold ${
                        isActive ? "text-white" : "text-slate-500"
                      }`}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          {/* Service List */}
          <View className="px-6">
            {filteredServices.slice(0, 4).map((service) => (
              <ExploreServiceCard
                key={service.id}
                service={service}
                onPress={() => router.push(`/service/${service.id}`)}
                onBookmarkPress={() => {}}
              />
            ))}
          </View>

          {/* View All Button */}
          <Pressable
            onPress={() => router.push("/all-services")}
            className="mx-6 mt-4 mb-6 bg-slate-900 py-4 rounded-2xl items-center active:bg-slate-800"
          >
            <Text className="text-white font-bold text-base">
              View All Services
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Search Modal */}
      <Modal
        visible={showSearchModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowSearchModal(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="px-6 py-4 border-b border-slate-200">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold text-slate-900">Search</Text>
              <Pressable
                onPress={() => {
                  setShowSearchModal(false);
                  setSearchQuery("");
                }}
                className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center"
              >
                <Ionicons name="close" size={24} color="#1e293b" />
              </Pressable>
            </View>
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search services, categories..."
            />
          </View>

          <ScrollView className="flex-1 px-6 py-4">
            {searchQuery.trim() ? (
              <>
                <Text className="text-lg font-bold text-slate-900 mb-4">
                  Found {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                </Text>
                {filteredServices.map((service) => (
                  <ExploreServiceCard
                    key={service.id}
                    service={service}
                    onPress={() => {
                      setShowSearchModal(false);
                      router.push(`/service/${service.id}`);
                    }}
                    onBookmarkPress={() => {}}
                  />
                ))}
                {filteredServices.length === 0 && (
                  <View className="items-center justify-center py-12">
                    <Ionicons name="search-outline" size={64} color="#cbd5e1" />
                    <Text className="text-slate-500 text-lg mt-4">No services found</Text>
                    <Text className="text-slate-400 text-sm mt-2">Try a different search term</Text>
                  </View>
                )}
              </>
            ) : (
              <View className="items-center justify-center py-12">
                <Ionicons name="search-outline" size={64} color="#cbd5e1" />
                <Text className="text-slate-500 text-lg mt-4">Start typing to search</Text>
                <Text className="text-slate-400 text-sm mt-2">Search for services, categories, or providers</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
