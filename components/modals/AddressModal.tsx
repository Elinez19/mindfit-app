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

interface AddressModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [addresses, setAddresses] = useState([
    {
      id: "1",
      label: "Home",
      address: "123 Main St, San Francisco, CA 94105",
      isDefault: true,
    },
    {
      id: "2",
      label: "Office",
      address: "456 Market St, San Francisco, CA 94103",
      isDefault: false,
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
              My Addresses
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 bg-slate-100 rounded-full justify-center items-center"
            >
              <Ionicons name="close" size={20} color="#334155" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {addresses.map((addr) => (
              <View
                key={addr.id}
                className="flex-row items-center p-4 mb-3 bg-white border border-gray-200 rounded-2xl"
              >
                <View className="w-10 h-10 bg-slate-50 rounded-full justify-center items-center">
                  <Ionicons
                    name={addr.label === "Home" ? "home-outline" : "business-outline"}
                    size={20}
                    color="#334155"
                  />
                </View>
                <View className="ml-4 flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-base font-bold text-slate-900">
                      {addr.label}
                    </Text>
                    {addr.isDefault && (
                      <View className="ml-2 px-2 py-0.5 bg-slate-100 rounded text-xs">
                        <Text className="text-slate-600 text-[10px] font-bold">DEFAULT</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-sm text-slate-500 mt-0.5">
                    {addr.address}
                  </Text>
                </View>
                <TouchableOpacity className="p-2">
                  <Ionicons name="pencil-outline" size={20} color="#64748b" />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              className="flex-row items-center justify-center p-4 mt-2 border-2 border-dashed border-slate-300 rounded-2xl"
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={24} color="#64748b" />
              <Text className="ml-2 text-slate-600 font-semibold">
                Add New Address
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddressModal;
