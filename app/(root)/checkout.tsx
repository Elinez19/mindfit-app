import { cartItems } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checkout() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePayment = () => {
    Alert.alert(
      "Order Placed!",
      "Your booking has been confirmed successfully.",
      [
        {
          text: "OK",
          onPress: () => router.push("/(root)/(tabs)/Home"),
        },
      ]
    );
  };

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
        <Text className="text-2xl font-bold text-slate-900">Checkout</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingBottom: 120 }}
      >
        {/* Address Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-slate-900 mb-4">Service Address</Text>
          <View className="bg-white p-4 rounded-2xl border border-slate-100 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-3">
                <Ionicons name="location" size={20} color="#3b82f6" />
              </View>
              <View>
                <Text className="font-bold text-slate-900">Home</Text>
                <Text className="text-slate-500 text-sm">123 Main Street, San Francisco, CA</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="text-blue-600 font-bold text-sm">Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-slate-900 mb-4">Payment Method</Text>
          
          <TouchableOpacity 
            onPress={() => setPaymentMethod("card")}
            className={`bg-white p-4 rounded-2xl border mb-3 flex-row items-center justify-between ${
              paymentMethod === "card" ? "border-blue-600 bg-blue-50/50" : "border-slate-100"
            }`}
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="card" size={20} color="#0f172a" />
              </View>
              <Text className="font-bold text-slate-900">Credit Card</Text>
            </View>
            {paymentMethod === "card" && (
              <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setPaymentMethod("apple")}
            className={`bg-white p-4 rounded-2xl border mb-3 flex-row items-center justify-between ${
              paymentMethod === "apple" ? "border-blue-600 bg-blue-50/50" : "border-slate-100"
            }`}
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="logo-apple" size={20} color="#0f172a" />
              </View>
              <Text className="font-bold text-slate-900">Apple Pay</Text>
            </View>
            {paymentMethod === "apple" && (
              <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setPaymentMethod("cash")}
            className={`bg-white p-4 rounded-2xl border flex-row items-center justify-between ${
              paymentMethod === "cash" ? "border-blue-600 bg-blue-50/50" : "border-slate-100"
            }`}
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-3">
                <Ionicons name="cash" size={20} color="#0f172a" />
              </View>
              <Text className="font-bold text-slate-900">Cash on Service</Text>
            </View>
            {paymentMethod === "cash" && (
              <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
            )}
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View className="bg-white p-6 rounded-3xl border border-slate-100">
          <Text className="text-lg font-bold text-slate-900 mb-4">Order Summary</Text>
          
          {cartItems.map((item) => (
            <View key={item.id} className="flex-row justify-between mb-3">
              <Text className="text-slate-500 flex-1 mr-4" numberOfLines={1}>{item.title}</Text>
              <Text className="text-slate-900 font-medium">${item.price}</Text>
            </View>
          ))}
          
          <View className="h-[1px] bg-slate-100 my-3" />
          
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
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 pb-8">
        <TouchableOpacity
          onPress={handlePayment}
          className="bg-blue-600 w-full py-4 rounded-2xl flex-row items-center justify-center shadow-lg shadow-blue-200"
        >
          <Text className="text-white font-bold text-lg mr-2">
            Pay ${total.toFixed(2)}
          </Text>
          <Ionicons name="checkmark-circle-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
