import { favoriteItems } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="px-6 pt-2 pb-6 bg-white border-b border-slate-100">
        <Text className="text-2xl font-bold text-slate-900">Favorites</Text>
        <Text className="text-slate-500 mt-1">
          {favoriteItems.length} saved services
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
      >
        {favoriteItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push(`/service/${item.id}`)}
            className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 flex-row"
          >
            <Image
              source={{ uri: item.image }}
              className="w-24 h-24 rounded-xl bg-slate-200"
            />
            
            <View className="flex-1 ml-4 justify-between py-1">
              <View>
                <View className="flex-row justify-between items-start">
                  <View className="bg-blue-50 self-start px-2 py-1 rounded-lg mb-2">
                    <Text className="text-blue-600 text-xs font-medium">
                      {item.category}
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="heart" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
                
                <Text className="text-slate-900 font-bold text-lg leading-tight" numberOfLines={2}>
                  {item.title}
                </Text>
              </View>

              <View className="flex-row items-center justify-between mt-2">
                <View className="flex-row items-center">
                  <Ionicons name="star" size={14} color="#f59e0b" />
                  <Text className="text-slate-700 font-medium ml-1">
                    {item.rating}
                  </Text>
                  <Text className="text-slate-400 text-sm ml-1">
                    ({item.reviews})
                  </Text>
                </View>
                <Text className="text-blue-600 font-bold text-lg">
                  {item.price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {favoriteItems.length === 0 && (
          <View className="items-center justify-center py-20">
            <View className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="heart-outline" size={40} color="#94a3b8" />
            </View>
            <Text className="text-slate-900 font-bold text-lg mb-2">
              No favorites yet
            </Text>
            <Text className="text-slate-500 text-center px-10">
              Save services you like to find them easily later
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
