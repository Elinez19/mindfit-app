import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface PaymentMethodsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const PaymentMethodsModal: React.FC<PaymentMethodsModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [methods, setMethods] = useState([
    {
      id: "1",
      type: "Visa",
      last4: "4242",
      expiry: "12/24",
      icon: "card-outline",
    },
    {
      id: "2",
      type: "Mastercard",
      last4: "8888",
      expiry: "09/25",
      icon: "card-outline",
    },
  ]);

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

        <View className="bg-white rounded-t-3xl p-6 h-[70%] shadow-2xl">
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-slate-900">
              Payment Methods
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 bg-slate-100 rounded-full justify-center items-center"
            >
              <Ionicons name="close" size={20} color="#334155" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {methods.map((method) => (
              <View
                key={method.id}
                className="flex-row items-center p-4 mb-3 bg-white border border-gray-200 rounded-2xl"
              >
                <View className="w-12 h-12 bg-slate-50 rounded-full justify-center items-center">
                  <Ionicons name={method.icon as any} size={24} color="#334155" />
                </View>
                <View className="ml-4 flex-1">
                  <Text className="text-base font-bold text-slate-900">
                    {method.type} •••• {method.last4}
                  </Text>
                  <Text className="text-sm text-slate-500">
                    Expires {method.expiry}
                  </Text>
                </View>
                <TouchableOpacity className="p-2">
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              className="flex-row items-center justify-center p-4 mt-2 border-2 border-dashed border-slate-300 rounded-2xl"
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color="#64748b" />
              <Text className="ml-2 text-slate-600 font-semibold">
                Add New Card
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentMethodsModal;
