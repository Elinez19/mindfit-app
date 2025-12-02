import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  navigateTo?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isVisible,
  onClose,
  title,
  message,
  buttonText = "Done",
  navigateTo,
}) => {
  const router = useRouter();

  const handlePress = () => {
    onClose();
    if (navigateTo) {
      // @ts-ignore
      router.push(navigateTo);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <BlurView intensity={20} className="absolute inset-0" />
        <View className="bg-white w-[85%] rounded-3xl p-8 items-center shadow-2xl">
          <View className="h-20 w-20 rounded-full bg-green-100 justify-center items-center mb-6">
            <Ionicons name="checkmark" size={40} color="#22c55e" />
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
            {title}
          </Text>
          
          <Text className="text-gray-500 text-center mb-8 leading-6 text-base">
            {message}
          </Text>

          <TouchableOpacity
            onPress={handlePress}
            className="w-full py-4 rounded-xl bg-green-500 shadow-lg shadow-green-500/30"
          >
            <Text className="text-white font-bold text-center text-lg">
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
