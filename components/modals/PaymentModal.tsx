import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface PaymentModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPay: () => void;
  amount: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isVisible,
  onClose,
  onPay,
  amount,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("card");

  const paymentMethods = [
    {
      id: "card",
      name: "Credit / Debit Card",
      icon: "card-outline",
      subtitle: "**** **** **** 4242",
    },
    {
      id: "apple",
      name: "Apple Pay",
      icon: "logo-apple",
      subtitle: "Connected",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: "logo-paypal",
      subtitle: "user@example.com",
    },
    {
      id: "cash",
      name: "Cash on Service",
      icon: "cash-outline",
      subtitle: "Pay when service is done",
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <TouchableOpacity
          className="absolute inset-0 bg-black/50"
          onPress={onClose}
          activeOpacity={1}
        >
          <BlurView intensity={10} className="absolute inset-0" />
        </TouchableOpacity>

        <View className="bg-white rounded-t-3xl p-6 h-[60%] shadow-2xl">
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-slate-900">
              Payment Method
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 bg-slate-400 rounded-full justify-center items-center"
            >
              <Ionicons name="close" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedMethod(method.id)}
                className={`flex-row items-center p-4 mb-3 rounded-2xl border ${
                  selectedMethod === method.id
                    ? "bg-primary-50 border-primary-500"
                    : "bg-white border-gray-200"
                }`}
              >
                <View
                  className={`w-12 h-12 rounded-full justify-center items-center ${
                    selectedMethod === method.id
                      ? "bg-primary-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Ionicons
                    name={method.icon as any}
                    size={24}
                    color={selectedMethod === method.id ? "#3b82f6" : "#6b7280"}
                  />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-base font-bold text-slate-900">
                    {method.name}
                  </Text>
                  <Text className="text-sm text-slate-500">
                    {method.subtitle}
                  </Text>
                </View>
                <View
                  className={`w-6 h-6 rounded-full border-2 justify-center items-center ${
                    selectedMethod === method.id
                      ? "border-slate-500 bg-slate-500"
                      : "border-gray-300"
                  }`}
                >
                  {selectedMethod === method.id && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View className="pt-4 border-t border-gray-100">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-500 text-base">Total Amount</Text>
              <Text className="text-xl font-bold text-slate-900">{amount}</Text>
            </View>
            <TouchableOpacity
              onPress={onPay}
              className="w-full py-4 rounded-xl items-center bg-slate-500 shadow-lg shadow-slate-500/30"
            >
              <Text className="text-white font-bold text-lg">Pay Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;
