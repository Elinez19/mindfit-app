import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import {
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface LanguageModalProps {
  isVisible: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  isVisible,
  onClose,
  selectedLanguage,
  onSelectLanguage,
}) => {
  const languages = [
    { code: "en-US", name: "English (US)" },
    { code: "en-UK", name: "English (UK)" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
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

        <View className="bg-white rounded-t-3xl p-6 h-[50%] shadow-2xl">
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-slate-900">
              Select Language
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 bg-slate-100 rounded-full justify-center items-center"
            >
              <Ionicons name="close" size={20} color="#334155" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                onPress={() => {
                  onSelectLanguage(lang.name);
                  onClose();
                }}
                className={`flex-row items-center justify-between p-4 mb-2 rounded-xl ${
                  selectedLanguage === lang.name
                    ? "bg-slate-50 border border-slate-200"
                    : "bg-transparent"
                }`}
              >
                <Text
                  className={`text-base ${
                    selectedLanguage === lang.name
                      ? "font-bold text-slate-900"
                      : "font-medium text-slate-600"
                  }`}
                >
                  {lang.name}
                </Text>
                {selectedLanguage === lang.name && (
                  <Ionicons name="checkmark-circle" size={24} color="#0f172a" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;
