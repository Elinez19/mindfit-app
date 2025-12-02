import { BenefitCard } from "@/components/home/BenefitCard";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";
import { FeaturedServiceCard } from "@/components/home/FeaturedServiceCard";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HowItWorksCard } from "@/components/home/HowItWorksCard";
import { RecommendedServiceCard } from "@/components/home/RecommendedServiceCard";
import { SearchBar } from "@/components/home/SearchBar";
import { SectionCard } from "@/components/home/SectionCard";
import { ServiceCard } from "@/components/home/ServiceCard";
import { SpecialOfferCard } from "@/components/home/SpecialOfferCard";
import { TopProviderCard } from "@/components/home/TopProviderCard";
import {
    benefits,
    categories,
    featuredServices,
    gradientColors,
    heroBanners,
    howItWorksSteps,
    specialOffers,
    topProviders
} from "@/constants/data";
import { services } from "@/constants/services";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Image, Modal, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const router = useRouter();
  
  // Animation Values
  const slideAnim = useRef(new Animated.Value(-320)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (sidebarVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [sidebarVisible]);

  const closeSidebar = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -320,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setSidebarVisible(false));
  };

  // Filter services based on search query
  const filteredServices = services.filter((service) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      service.provider.name.toLowerCase().includes(query) ||
      service.location.toLowerCase().includes(query)
    );
  });


  // Filter featured services based on search query
  const filteredFeaturedServices = featuredServices.filter((service) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query)
    );
  });

  // Filter categories based on search query
  const filteredCategories = categories.filter((category) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return category.label.toLowerCase().includes(query);
  });

  const menuItems = [
    { icon: "home-outline", label: "Home", route: "/" },
    { icon: "grid-outline", label: "All Services", route: "/all-services" },
    { icon: "cart-outline", label: "My Cart", route: "/cart" },
    { icon: "calendar-outline", label: "My Bookings", route: "/bookings" },
    { icon: "heart-outline", label: "Favorites", route: "/Favorites" },
    { icon: "person-outline", label: "Profile", route: "/profile" },
    { icon: "chatbubble-outline", label: "Messages", route: "/messages" },
    { icon: "help-circle-outline", label: "Help & Support", route: "/support" },
  ];

  return (
    <View className="flex-1">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        colors={gradientColors.primary}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <LinearGradient
        colors={gradientColors.secondary}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-6 pt-6">
            <HomeHeader
              avatarUrl="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=200&q=60"
              onMenuPress={() => setSidebarVisible(true)}
              onNotificationPress={() => Alert.alert("Notifications", "No new notifications")}
              onCartPress={() => router.push("/(root)/cart")}
            />
          </View>

          <View className="px-6 mt-5">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search for cleaning, electrical..."
            />
          </View>

          <View className="px-6 mt-6">
            <SectionCard
              title="Highlights"
              actionLabel="View All"
              contentClassName="pb-0"
            >
              <HeroCarousel
                banners={heroBanners}
                containerStyle={{ marginTop: 0, marginBottom: 12, height: 210 }}
                horizontalInset={0}
              />
            </SectionCard>
          </View>

          {/* Categories */}
          <View className="px-6 mt-6">
            <SectionCard
              title="All Categories"
              actionLabel="View All"
              onActionPress={() => router.push("/categories")}
            >
              <CategoriesCarousel categories={filteredCategories} />
            </SectionCard>
          </View>

          {/* Featured Services - Vertical Cards */}
          <View className="px-6 mt-6">
            <SectionCard
              title="Featured Services"
              actionLabel="View All"
              onActionPress={() => router.push("/popular-services")}
            >
              <View className="mt-2">
                {filteredFeaturedServices.map((service) => (
                  <FeaturedServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.description}
                    image={service.image}
                    price={service.price}
                    rating={service.rating}
                    icon={service.icon as any}
                    onPress={() =>
                      router.push({
                        pathname: "/service/[serviceId]",
                        params: { serviceId: service.id },
                      })
                    }
                  />
                ))}
              </View>
            </SectionCard>
          </View>

          {/* Special Offers */}
          <View className="px-6 mt-6">
            <SectionCard
              title="Special Offers"
              actionLabel="View All"
              onActionPress={() => router.push("/popular-services")}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {specialOffers.map((offer) => (
                  <SpecialOfferCard
                    key={offer.id}
                    title={offer.title}
                    discount={offer.discount}
                    description={offer.description}
                    code={offer.code}
                    color={offer.color as [string, string]}
                    icon={offer.icon as any}
                    onPress={() => router.push("/popular-services")}
                  />
                ))}
              </ScrollView>
            </SectionCard>
          </View>

          {/* Recommended */}
          <View className="px-6 mt-6">
            <SectionCard
              title="Recommended for You"
              actionLabel="See All"
              onActionPress={() => router.push("/popular-services")}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {services.slice().reverse().map((service) => (
                  <RecommendedServiceCard
                    key={service.id}
                    service={service}
                    onPress={() =>
                      router.push({
                        pathname: "/service/[serviceId]",
                        params: { serviceId: service.id },
                      })
                    }
                  />
                ))}
              </ScrollView>
            </SectionCard>
          </View>

          {/* Why Choose Us - Benefits */}
          <View className="px-6 mt-6">
            <SectionCard
              title="Why Choose Us"
              actionLabel="Learn More"
              onActionPress={() => router.push("/popular-services")}
            >
              <View className="flex-row flex-wrap gap-3 mt-2">
                {benefits.map((benefit) => (
                  <View key={benefit.id} className="w-[48%]">
                    <BenefitCard
                      icon={benefit.icon as any}
                      title={benefit.title}
                      description={benefit.description}
                      color={benefit.color}
                      onPress={() => router.push("/popular-services")}
                    />
                  </View>
                ))}
              </View>
            </SectionCard>
          </View>

          {/* Top Providers */}
          <View className="px-6 mt-6">
            <SectionCard
              title="Top Rated Providers"
              actionLabel="View All"
              onActionPress={() => router.push("/top-providers")}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {topProviders.map((provider) => (
                  <TopProviderCard
                    key={provider.id}
                    name={provider.name}
                    role={provider.role}
                    rating={provider.rating}
                    image={provider.image}
                    onPress={() => router.push("/top-providers")}
                  />
                ))}
              </ScrollView>
            </SectionCard>
          </View>

          {/* How It Works */}
          <View className="px-6 mt-6">
            <SectionCard
              title="How It Works"
              actionLabel="Get Started"
              onActionPress={() => router.push("/popular-services")}
            >
              <View className="mt-2">
                {howItWorksSteps.map((step, index) => (
                  <HowItWorksCard
                    key={step.id}
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    icon={step.icon as any}
                    isLast={index === howItWorksSteps.length - 1}
                    onPress={() => router.push("/popular-services")}
                  />
                ))}
              </View>
            </SectionCard>
          </View>

          {/* Services */}
          <View className="px-6 mt-6">
            <SectionCard
              title="Popular Services"
              actionLabel="View All"
              onActionPress={() => router.push("/popular-services")}
            >
              <View className="space-y-5">
                {filteredServices.map((service) => (
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
            </SectionCard>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Sidebar Modal */}
      <Modal
        visible={sidebarVisible}
        transparent
        onRequestClose={closeSidebar}
      >
        <View className="flex-1 flex-row">
          {/* Overlay */}
          <Animated.View 
            style={{ opacity: fadeAnim }}
            className="absolute inset-0 bg-black/50"
          >
            <Pressable
              className="flex-1"
              onPress={closeSidebar}
            />
          </Animated.View>
          
          {/* Sidebar Content */}
          <Animated.View 
            style={{ transform: [{ translateX: slideAnim }] }}
            className="w-80 bg-white h-full shadow-2xl"
          >
            <SafeAreaView className="flex-1">
              {/* Header */}
              <View className="px-6 py-6 border-b border-slate-100">
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-2xl font-bold text-slate-900">Menu</Text>
                  <Pressable
                    onPress={closeSidebar}
                    className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center"
                  >
                    <Ionicons name="close" size={24} color="#1e293b" />
                  </Pressable>
                </View>
                
                {/* Profile Section */}
                <View className="flex-row items-center mt-2">
                  <Image
                    source={{ uri: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=200&q=60" }}
                    className="w-16 h-16 rounded-2xl"
                  />
                  <View className="ml-3 flex-1">
                    <Text className="text-lg font-bold text-slate-900">John Doe</Text>
                    <Text className="text-sm text-slate-500">john.doe@email.com</Text>
                  </View>
                </View>
              </View>

              {/* Menu Items */}
              <ScrollView className="flex-1 px-3 py-4">
                {menuItems.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      closeSidebar();
                      if (item.route !== "/") {
                        router.push(item.route as any);
                      }
                    }}
                    className="flex-row items-center px-4 py-4 rounded-2xl mb-2 active:bg-slate-50"
                  >
                    <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center">
                      <Ionicons name={item.icon as any} size={22} color="#475569" />
                    </View>
                    <Text className="ml-4 text-base font-semibold text-slate-700">
                      {item.label}
                    </Text>
                  </Pressable>
                ))}

                {/* Divider */}
                <View className="h-px bg-slate-200 my-4" />

                {/* Settings & Logout */}
                <Pressable
                  onPress={() => {
                    closeSidebar();
                    Alert.alert("Settings", "Settings screen coming soon");
                  }}
                  className="flex-row items-center px-4 py-4 rounded-2xl mb-2 active:bg-slate-50"
                >
                  <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center">
                    <Ionicons name="settings-outline" size={22} color="#475569" />
                  </View>
                  <Text className="ml-4 text-base font-semibold text-slate-700">
                    Settings
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    closeSidebar();
                    Alert.alert("Logout", "Are you sure you want to logout?", [
                      { text: "Cancel", style: "cancel" },
                      { text: "Logout", style: "destructive" }
                    ]);
                  }}
                  className="flex-row items-center px-4 py-4 rounded-2xl active:bg-red-50"
                >
                  <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center">
                    <Ionicons name="log-out-outline" size={22} color="#ef4444" />
                  </View>
                  <Text className="ml-4 text-base font-semibold text-red-600">
                    Logout
                  </Text>
                </Pressable>
              </ScrollView>

              {/* Footer */}
              <View className="px-6 py-4 border-t border-slate-100">
                <Text className="text-xs text-slate-400 text-center">
                  MindFit v1.0.0
                </Text>
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}
