import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ServiceDetailHeroProps = {
  image: string;
  gallery: string[];
  onBackPress: () => void;
  onFavoritePress?: () => void;
};

export function ServiceDetailHero({
  image,
  gallery,
  onBackPress,
  onFavoritePress,
}: ServiceDetailHeroProps) {
  const previewItems = gallery.slice(0, 4);
  const extraCount = gallery.length - previewItems.length;

  return (
    <View className="h-[420px] bg-slate-900 rounded-b-[36px] overflow-hidden">
      <ImageBackground
        source={{ uri: image }}
        resizeMode="cover"
        className="flex-1"
      >
        <LinearGradient
          colors={["rgba(15,23,42,0.6)", "rgba(15,23,42,0.05)"]}
          className="absolute inset-0"
        />
        <SafeAreaView className="flex-1 justify-between p-5">
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={onBackPress}
              className="h-11 w-11 rounded-full bg-white/90 items-center justify-center active:opacity-90"
            >
              <Ionicons name="chevron-back" size={22} color="#0f172a" />
            </Pressable>
            <Pressable
              onPress={onFavoritePress}
              className="h-11 w-11 rounded-full bg-white/90 items-center justify-center active:opacity-90"
            >
              <Ionicons name="heart-outline" size={22} color="#0f172a" />
            </Pressable>
          </View>

          <View className="items-center mb-6">
            <Pressable
              className="flex-row items-center gap-2 bg-white/95 rounded-full px-6 py-3 active:opacity-90"
            >
              <Ionicons name="play-circle" size={22} color="#0f172a" />
              <Text className="text-slate-900 font-semibold text-base">
                Demo Video
              </Text>
            </Pressable>
            <Text className="text-white/80 text-xs mt-2">1 min preview</Text>
          </View>

          <View className="rounded-3xl bg-white/95 px-4 py-3">
            <View className="flex-row items-center gap-2">
              {previewItems.map((item, index) => (
                <View key={item} className="relative">
                  <Image
                    source={{ uri: item }}
                    className="h-14 w-14 rounded-2xl"
                  />
                  {index === previewItems.length - 1 && extraCount > 0 && (
                    <View className="absolute inset-0 rounded-2xl bg-slate-900/80 items-center justify-center">
                      <Text className="text-white text-xs font-semibold">
                        +{extraCount}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

