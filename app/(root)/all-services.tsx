import { ExploreServiceCard } from "@/components/explore/ExploreServiceCard";
import { ServiceDetail } from "@/types/service";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import service details directly since we need category field
const serviceDetails: ServiceDetail[] = [
  {
    id: "deep-house-cleaning",
    title: "Deep House Cleaning",
    category: "Cleaning",
    rating: 4.5,
    reviews: 365,
    price: "$65.00 / hr",
    totalPrice: "$180.00",
    priceLabel: "Total Price",
    location: "New York, USA",
    address: "1012 Ocean Avenue, New York, USA",
    image: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&w=900&q=60",
    summary: "Premium deep clean for apartments and family homes with attention to every detail, using eco-friendly supplies.",
    description: "Our Deep House Cleaning service covers every corner of your home.",
    highlights: [],
    gallery: [],
    provider: {
      name: "Jenny Wilson",
      role: "Service Provider",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=60",
      phone: "+1 516-503-1111",
    },
    duration: "Up to 4 hrs",
    availability: "Mon - Sun",
  },
  {
    id: "smart-home-installation",
    title: "Smart Home Installation",
    category: "Electrical",
    rating: 4.9,
    reviews: 192,
    price: "$120.00 / hr",
    totalPrice: "$320.00",
    priceLabel: "Starting At",
    location: "Queens, NY",
    address: "4109 Queen Street, Queens, NY",
    image: "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&w=900&q=60",
    summary: "Upgrade your apartment or townhouse with professional installation of smart locks, thermostats, and lighting.",
    description: "Certified installers configure every device, integrate voice assistants, and provide training.",
    highlights: [],
    gallery: [],
    provider: {
      name: "Calvin Flores",
      role: "Lead Technician",
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=200&q=60",
      phone: "+1 718-244-8892",
    },
    duration: "2 - 5 hrs",
    availability: "Mon - Sat",
  },
  {
    id: "landscape-refresh",
    title: "Landscape Refresh",
    category: "Repairing",
    rating: 4.7,
    reviews: 88,
    price: "$180.00 / project",
    totalPrice: "$480.00",
    priceLabel: "Package Price",
    location: "Jersey City, NJ",
    address: "88 Liberty Drive, Jersey City, NJ",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&w=900&q=60",
    summary: "Seasonal refresh for lawns and small gardens. Includes trimming, mulching, and planter styling.",
    description: "Our crew revitalizes front yards, patios, and rooftop terraces.",
    highlights: [],
    gallery: [],
    provider: {
      name: "Patricia Ortega",
      role: "Lead Gardener",
      avatar: "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&w=200&q=60",
      phone: "+1 201-325-2240",
    },
    duration: "1 day",
    availability: "Tue - Sun",
  },
];

const categories = [
  "All",
  "Repairing",
  "Electrical",
  "Plumbing",
  "Cleaning",
  "Painting",
  "HVAC",
];

const sortOptions = ["Popular", "Rating", "Price: Low to High", "Price: High to Low"];

export default function AllServicesScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Popular");

  // Filter services based on search and category
  const filteredServices = serviceDetails.filter((service) => {
    const matchesSearch =
      searchQuery === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.provider.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || service.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="px-6 py-4 border-b border-slate-100">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center flex-1">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center active:bg-slate-100 mr-4"
            >
              <Ionicons name="chevron-back" size={24} color="#1e293b" />
            </Pressable>

            <View className="flex-1">
              <Text className="text-2xl font-bold text-slate-900">
                All Services
              </Text>
              <Text className="text-slate-500 text-sm mt-0.5">
                {filteredServices.length} services available
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => setShowFilters(!showFilters)}
            className="w-10 h-10 rounded-full bg-slate-900 items-center justify-center active:bg-slate-800"
          >
            <Ionicons name="options-outline" size={20} color="white" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-slate-50 rounded-2xl px-4 py-3">
          <Ionicons name="search-outline" size={20} color="#94a3b8" />
          <TextInput
            placeholder="Search services or providers..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-slate-900 text-base"
          />
          {searchQuery !== "" && (
            <Pressable onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </Pressable>
          )}
        </View>
      </View>

      {/* Filter Panel */}
      {showFilters && (
        <View className="bg-slate-50 border-b border-slate-200 px-6 py-4">
          <Text className="text-sm font-bold text-slate-900 mb-3">
            Sort By
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {sortOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => setSelectedSort(option)}
                className={`px-4 py-2 rounded-full border ${
                  selectedSort === option
                    ? "bg-slate-900 border-slate-900"
                    : "bg-white border-slate-200"
                }`}
              >
                <Text
                  className={`text-sm font-semibold ${
                    selectedSort === option ? "text-white" : "text-slate-600"
                  }`}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Categories */}
      <View className="mt-2 bg-white">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
          className="py-3"
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

      {/* Services List */}
      {filteredServices.length > 0 ? (
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExploreServiceCard
              service={{
                id: item.id,
                title: item.title,
                provider: item.provider,
                rating: item.rating,
                price: item.price,
                location: item.location,
                image: item.image,
              }}
              onPress={() => router.push(`/service/${item.id}`)}
              onBookmarkPress={() => {}}
            />
          )}
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-20 h-20 rounded-full bg-slate-100 items-center justify-center mb-4">
            <Ionicons name="search-outline" size={32} color="#94a3b8" />
          </View>
          <Text className="text-slate-900 text-lg font-bold mb-2">
            No services found
          </Text>
          <Text className="text-slate-500 text-center">
            Try adjusting your search or filters to find what you're looking for
          </Text>
          <Pressable
            onPress={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="mt-6 bg-slate-900 px-6 py-3 rounded-full active:bg-slate-800"
          >
            <Text className="text-white font-semibold">Clear Filters</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
