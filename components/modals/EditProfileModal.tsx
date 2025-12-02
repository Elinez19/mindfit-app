import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
  };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isVisible,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, isVisible]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-end">
          <TouchableOpacity
            className="absolute inset-0 bg-black/50"
            onPress={onClose}
            activeOpacity={1}
          >
            <BlurView intensity={10} className="absolute inset-0" />
          </TouchableOpacity>

          <View className="bg-white rounded-t-3xl p-6 h-[80%] shadow-2xl">
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-bold text-slate-900">
                Edit Profile
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="w-8 h-8 bg-slate-100 rounded-full justify-center items-center"
              >
                <Ionicons name="close" size={20} color="#334155" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="space-y-4 gap-4">
                <View>
                  <Text className="text-sm font-medium text-slate-700 mb-2">
                    Profile Image URL
                  </Text>
                  <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <Ionicons name="image-outline" size={20} color="#64748b" />
                    <TextInput
                      className="flex-1 ml-3 text-slate-900 text-base"
                      value={formData.avatar}
                      onChangeText={(text) => handleChange("avatar", text)}
                      placeholder="Enter image URL"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </Text>
                  <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <Ionicons name="person-outline" size={20} color="#64748b" />
                    <TextInput
                      className="flex-1 ml-3 text-slate-900 text-base"
                      value={formData.name}
                      onChangeText={(text) => handleChange("name", text)}
                      placeholder="Enter your full name"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </Text>
                  <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <Ionicons name="mail-outline" size={20} color="#64748b" />
                    <TextInput
                      className="flex-1 ml-3 text-slate-900 text-base"
                      value={formData.email}
                      onChangeText={(text) => handleChange("email", text)}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </Text>
                  <View className="flex-row items-center bg-slate-50 border border-gray-200 rounded-xl px-4 py-3">
                    <Ionicons name="call-outline" size={20} color="#64748b" />
                    <TextInput  
                      className="flex-1 ml-3 text-slate-900 text-base"
                      value={formData.phone}
                      onChangeText={(text) => handleChange("phone", text)}
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    Location
                  </Text>
                  <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color="#64748b"
                    />
                    <TextInput
                      className="flex-1 ml-3 text-slate-900 text-base"
                      value={formData.location}
                      onChangeText={(text) => handleChange("location", text)}
                      placeholder="Enter your location"
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            <View className="pt-4 border-t border-gray-100 mt-auto">
              <TouchableOpacity
                onPress={handleSave}
                className="w-full py-4 rounded-xl items-center bg-slate-900 shadow-lg shadow-slate-900/20"
              >
                <Text className="text-white font-bold text-lg">
                  Save Changes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditProfileModal;
