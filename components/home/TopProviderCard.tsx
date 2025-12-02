import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

type TopProviderCardProps = {
  name: string;
  role: string;
  rating: number;
  image: string;
  onPress?: () => void;
};

export function TopProviderCard({
  name,
  role,
  rating,
  image,
  onPress,
}: TopProviderCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="items-center mr-5 w-20"
      style={({ pressed }) => [
        pressed && { opacity: 0.8 },
      ]}
    >
      <View className="relative">
        <Image
          source={{ uri: image }}
          className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-sm"
        />
        <View className="absolute -bottom-1 -right-1 bg-white rounded-full px-1.5 py-0.5 flex-row items-center shadow-sm border border-slate-100">
          <Ionicons name="star" size={8} color="#fbbf24" />
          <Text className="text-[10px] font-bold text-slate-900 ml-0.5">
            {rating}
          </Text>
        </View>
      </View>
      <Text className="text-slate-900 font-medium text-xs text-center mt-2" numberOfLines={1}>
        {name}
      </Text>
      <Text className="text-slate-500 text-[10px] text-center" numberOfLines={1}>
        {role}
      </Text>
    </Pressable>
  );
}
