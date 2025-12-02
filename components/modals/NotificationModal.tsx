import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface NotificationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [settings, setSettings] = useState([
    {
      id: "push",
      title: "Push Notifications",
      description: "Receive push notifications for new messages and updates",
      enabled: true,
    },
    {
      id: "email",
      title: "Email Notifications",
      description: "Receive email updates about your bookings",
      enabled: true,
    },
    {
      id: "sms",
      title: "SMS Notifications",
      description: "Receive text messages for urgent updates",
      enabled: false,
    },
    {
      id: "promo",
      title: "Promotional Offers",
      description: "Receive emails about new sales and special offers",
      enabled: true,
    },
  ]);

  const toggleSwitch = (id: string) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

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
              Notifications
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 bg-slate-100 rounded-full justify-center items-center"
            >
              <Ionicons name="close" size={20} color="#334155" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="space-y-6">
              {settings.map((item) => (
                <View
                  key={item.id}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex-1 mr-4">
                    <Text className="text-base font-semibold text-slate-900">
                      {item.title}
                    </Text>
                    <Text className="text-sm text-slate-500 mt-1">
                      {item.description}
                    </Text>
                  </View>
                  <Switch
                    trackColor={{ false: "#e2e8f0", true: "#0f172a" }}
                    thumbColor={"#ffffff"}
                    ios_backgroundColor="#e2e8f0"
                    onValueChange={() => toggleSwitch(item.id)}
                    value={item.enabled}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;
