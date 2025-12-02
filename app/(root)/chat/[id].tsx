import { chatList, chatMessages, gradientColors } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [messageText, setMessageText] = useState("");

  const chat = chatList.find((c) => c.id === id);
  const messages = chatMessages[id as keyof typeof chatMessages] || [];

  if (!chat) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Chat not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={gradientColors.primary}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-4 py-3 flex-row items-center border-b border-slate-100 bg-white/50">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
          
          <View className="flex-row items-center flex-1">
            <View className="relative">
              <Image
                source={{ uri: chat.avatar }}
                className="w-10 h-10 rounded-full bg-slate-200"
              />
              {chat.online && (
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </View>
            <View className="ml-3">
              <Text className="text-slate-900 font-bold text-base">
                {chat.name}
              </Text>
              <Text className="text-slate-500 text-xs">
                {chat.online ? "Online" : "Offline"} • {chat.role}
              </Text>
            </View>
          </View>

          <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-white shadow-sm ml-2">
            <Ionicons name="call-outline" size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingVertical: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => {
            const isUser = msg.sender === "user";
            return (
              <View
                key={msg.id}
                className={`mb-4 flex-row ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <Image
                    source={{ uri: chat.avatar }}
                    className="w-8 h-8 rounded-full bg-slate-200 mr-2 self-end mb-1"
                  />
                )}
                <View
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    isUser
                      ? "bg-blue-500 rounded-tr-none"
                      : "bg-white shadow-sm rounded-tl-none"
                  }`}
                >
                  <Text
                    className={`text-base ${
                      isUser ? "text-white" : "text-slate-800"
                    }`}
                  >
                    {msg.text}
                  </Text>
                  <Text
                    className={`text-[10px] mt-1 ${
                      isUser ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          <View className="px-4 py-3 bg-white/80 border-t border-slate-100 flex-row items-center pb-8">
            <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-slate-100 mr-3">
              <Ionicons name="add" size={24} color="#64748b" />
            </TouchableOpacity>
            
            <View className="flex-1 bg-slate-100 rounded-full px-4 py-2 flex-row items-center">
              <TextInput
                className="flex-1 text-slate-900 text-base max-h-24"
                placeholder="Type a message..."
                placeholderTextColor="#94a3b8"
                multiline
                value={messageText}
                onChangeText={setMessageText}
              />
            </View>

            <TouchableOpacity 
              className={`w-10 h-10 items-center justify-center rounded-full ml-3 ${
                messageText.trim() ? "bg-blue-500" : "bg-slate-200"
              }`}
              disabled={!messageText.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={messageText.trim() ? "white" : "#94a3b8"} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
