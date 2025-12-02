import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

type HomeHeaderProps = {
  avatarUrl: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onCartPress?: () => void;
};

export function HomeHeader({
  avatarUrl,
  onMenuPress,
  onNotificationPress,
  onCartPress,
}: HomeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={onMenuPress}
          className="w-11 h-11 rounded-2xl bg-white/80 items-center justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="menu-outline" size={24} color="#0f172a" />
        </TouchableOpacity>
        <View>
          <Text className="text-xs uppercase tracking-widest text-slate-500">
            Welcome Back
          </Text>
          <Text className="text-base font-semibold text-slate-900 mt-0.5">
            HomeVerse
          </Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={onCartPress}
          className="w-11 h-11 rounded-2xl bg-white/80 items-center justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="cart-outline" size={20} color="#0f172a" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNotificationPress}
          className="w-11 h-11 rounded-2xl bg-white/80 items-center justify-center"
          activeOpacity={0.8}
        >
          <Ionicons name="notifications-outline" size={20} color="#0f172a" />
        </TouchableOpacity>
        <Image source={{ uri: avatarUrl }} className="w-11 h-11 rounded-2xl" />
      </View>
    </View>
  );
}

