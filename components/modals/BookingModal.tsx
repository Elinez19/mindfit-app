import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface BookingModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (date: string, time: string) => void;
  serviceTitle: string;
  servicePrice: string;
  serviceImage: any;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  serviceTitle,
  servicePrice,
  serviceImage,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      fullDate: date.toISOString().split("T")[0],
    };
  });

  const times = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm(selectedDate, selectedTime);
    }
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

        <View className="bg-white rounded-t-3xl p-6 h-[80%] shadow-2xl">
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

          <View className="flex-row items-center mb-6">
            <Image
              source={typeof serviceImage === 'string' ? { uri: serviceImage } : serviceImage}
              className="w-16 h-16 rounded-xl bg-gray-200"
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-slate-900">
                {serviceTitle}
              </Text>
              <Text className="text-slate-500 font-semibold text-base">
                {servicePrice}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 bg-slate-400 rounded-full justify-center items-center"
            >
              <Ionicons name="close" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className="text-lg font-bold text-slate-900 mb-4">
              Select Date
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              {dates.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedDate(item.fullDate)}
                  className={`mr-3 w-16 h-20 rounded-2xl justify-center items-center border ${
                    selectedDate === item.fullDate
                      ? "bg-slate-500 border-slate-500"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium mb-1 ${
                      selectedDate === item.fullDate
                        ? "text-white"
                        : "text-slate-500"
                    }`}
                  >
                    {item.day}
                  </Text>
                  <Text
                    className={`text-lg font-bold ${
                      selectedDate === item.fullDate
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {item.date}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text className="text-lg font-bold text-slate-900 mb-4">
              Select Time
            </Text>
            <View className="flex-row flex-wrap gap-3 mb-8">
              {times.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedTime(time)}
                  className={`px-4 py-3 rounded-xl border ${
                    selectedTime === time
                      ? "bg-slate-500 border-slate-500"
                      : "bg-white border-gray-200"
                  } w-[30%] items-center`}
                >
                  <Text
                    className={`font-medium ${
                      selectedTime === time ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <View className="pt-4 border-t border-gray-100">
            <TouchableOpacity
              onPress={handleConfirm}
              disabled={!selectedDate || !selectedTime}
              className={`w-full py-4 rounded-xl items-center shadow-lg ${
                selectedDate && selectedTime
                  ? "bg-slate-500 shadow-slate-500/30"
                  : "bg-gray-300"
              }`}
            >
              <Text className="text-white font-bold text-lg">
                Continue to Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BookingModal;
