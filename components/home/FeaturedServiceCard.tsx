import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image, Text, TouchableOpacity, View } from "react-native";

type FeaturedServiceCardProps = {
  title: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export function FeaturedServiceCard({
  title,
  description,
  image,
  price,
  rating,
  icon,
  onPress,
}: FeaturedServiceCardProps) {
  return (
    <View 
      className="mb-3"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <BlurView intensity={40} tint="light" className="rounded-2xl overflow-hidden">
        <TouchableOpacity
          activeOpacity={0.85}
          className="rounded-2xl bg-white overflow-hidden flex-row items-center p-4 border border-slate-200/60"
          style={{
            backgroundColor: '#ffffff',
          }}
          onPress={onPress}
        >
          {/* Square Icon/Image on Left */}
          <View 
            className="w-20 h-20 rounded-2xl overflow-hidden mr-3.5 bg-slate-100"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Image 
              source={{ uri: image }} 
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Content in Middle */}
          <View className="flex-1 justify-center">
            <Text 
              className="text-slate-900 text-base font-bold mb-1.5" 
              numberOfLines={2}
            >
              {title}
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1">
                <Ionicons name="star" size={14} color="#fbbf24" />
                <Text className="text-slate-600 text-xs font-semibold">
                  {rating}
                </Text>
              </View>
              <Text className="text-slate-400 text-xs">•</Text>
              <Text className="text-slate-600 text-xs font-semibold">
                {price}
              </Text>
            </View>
          </View>

          {/* Chevron Arrow on Right */}
          <View className="ml-2">
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </View>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}
