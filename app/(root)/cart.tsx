import { cartItems } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cart() {
  const router = useRouter();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="px-6 pt-2 pb-4 bg-white border-b border-slate-100 flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-4"
        >
          <Ionicons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-slate-900">My Cart</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
      >
        {cartItems.map((item) => (
          <View
            key={item.id}
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
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
                
                <Text className="text-slate-900 font-bold text-lg leading-tight" numberOfLines={2}>
                  {item.title}
                </Text>
              </View>

              <View className="flex-row items-center justify-between mt-2">
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={14} color="#64748b" />
                  <Text className="text-slate-500 text-sm ml-1">
                    {item.date} • {item.time}
                  </Text>
                </View>
                <Text className="text-blue-600 font-bold text-lg">
                  ${item.price}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {cartItems.length > 0 ? (
          <View className="mt-6 bg-white p-6 rounded-3xl border border-slate-100">
            <Text className="text-lg font-bold text-slate-900 mb-4">Order Summary</Text>
            
            <View className="flex-row justify-between mb-3">
              <Text className="text-slate-500">Subtotal</Text>
              <Text className="text-slate-900 font-semibold">${subtotal.toFixed(2)}</Text>
            </View>
            
            <View className="flex-row justify-between mb-3">
              <Text className="text-slate-500">Tax (8%)</Text>
              <Text className="text-slate-900 font-semibold">${tax.toFixed(2)}</Text>
            </View>
            
            <View className="h-[1px] bg-slate-100 my-3" />
            
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold text-slate-900">Total</Text>
              <Text className="text-xl font-bold text-blue-600">${total.toFixed(2)}</Text>
            </View>
          </View>
        ) : (
          <View className="items-center justify-center py-20">
            <View className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="cart-outline" size={40} color="#94a3b8" />
            </View>
            <Text className="text-slate-900 font-bold text-lg mb-2">
              Your cart is empty
            </Text>
            <Text className="text-slate-500 text-center px-10">
              Browse services and add them to your cart to book appointments
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/Explore")}
              className="mt-6 bg-blue-600 px-6 py-3 rounded-full"
            >
              <Text className="text-white font-bold">Explore Services</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 pb-8">
          <TouchableOpacity
            onPress={() => router.push("/(root)/checkout")}
            className="bg-blue-600 w-full py-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-blue-200"
          >
            <Text className="text-white font-bold text-lg mr-2">
              Proceed to Checkout
            </Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
