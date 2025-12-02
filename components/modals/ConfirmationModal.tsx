import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "success" | "danger" | "warning" | "info";
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "success",
}) => {
  const getIcon = () => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "danger":
        return "alert-circle";
      case "warning":
        return "warning";
      case "info":
        return "information-circle";
      default:
        return "checkmark-circle";
    }
  };

  const getColor = () => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "danger":
        return "text-red-500";
      case "warning":
        return "text-yellow-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-green-500";
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "danger":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <BlurView intensity={20} className="absolute inset-0" />
        <View className="bg-white w-[85%] rounded-3xl p-6 items-center shadow-2xl">
          <View className={`h-16 w-16 rounded-full ${getBgColor()} bg-opacity-10 justify-center items-center mb-4`}>
            <Ionicons name={getIcon()} size={32} className={getColor()} color={type === 'success' ? '#22c55e' : type === 'danger' ? '#ef4444' : type === 'warning' ? '#eab308' : '#3b82f6'} />
          </View>
          
          <Text className="text-xl font-bold text-slate-900 text-center mb-2">
            {title}
          </Text>
          
          <Text className="text-slate-500 text-center mb-8 leading-5">
            {message}
          </Text>

          <View className="flex-row w-full space-x-3 gap-3">
            <TouchableOpacity
              onPress={onCancel}
              className="flex-1 py-3.5 rounded-xl bg-slate-300 border border-gray-200"
            >
              <Text className="text-slate-700 font-semibold text-center">
                {cancelText}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onConfirm}
              className={`flex-1 py-3.5 rounded-xl ${getBgColor()} shadow-lg shadow-${type === 'success' ? 'green' : type === 'danger' ? 'red' : 'blue'}-500/30`}
            >
              <Text className="text-slate-100 font-semibold text-center">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
