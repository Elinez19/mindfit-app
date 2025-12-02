import { LinearGradient } from "expo-linear-gradient";
import {
    Image,
    StyleProp,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import Swiper from "react-native-swiper";

export type HeroBanner = {
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  color: [string, string] | readonly [string, string];
};

type HeroCarouselProps = {
  banners: HeroBanner[] | readonly HeroBanner[];
  containerStyle?: StyleProp<ViewStyle>;
  horizontalInset?: number;
};

export function HeroCarousel({
  banners,
  containerStyle,
  horizontalInset = 24,
}: HeroCarouselProps) {
  return (
    <View
      style={[{ height: 220, marginTop: 28, marginBottom: 16 }, containerStyle]}
    >
      <Swiper
        autoplay
        autoplayTimeout={4}
        loop
        showsPagination
        containerStyle={{
          marginHorizontal: horizontalInset,
          borderRadius: 28,
          overflow: "visible",
        }}
        style={{
          borderRadius: 28,
          overflow: "visible",
          backgroundColor: "transparent",
        }}
        dot={<View className="w-5 h-2 rounded-md bg-white/40 mx-1" />}
        activeDot={<View className="w-5 h-2 rounded-md bg-white mx-1" />}
        paginationStyle={{ bottom: 12 }}
      >
        {banners.map((banner) => (
          <View key={banner.title} style={{ flex: 1 }}>
            <LinearGradient
              colors={banner.color}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                borderRadius: 28,
                padding: 20,
                shadowColor: "#0f172a",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 12 },
                shadowRadius: 18,
                elevation: 12,
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1 pr-4">
                  <Text className="text-white text-sm font-semibold uppercase">
                    {banner.title}
                  </Text>
                  <Text className="text-white text-lg font-bold mt-1">
                    {banner.subtitle}
                  </Text>
                </View>
                <Image
                  source={{ uri: banner.image }}
                  className="w-16 h-16 rounded-2xl"
                />
              </View>
              <TouchableOpacity className="bg-white rounded-2xl px-4 py-2 mt-4 self-start">
                <Text className="text-slate-900 font-semibold text-sm">
                  {banner.cta}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ))}
      </Swiper>
    </View>
  );
}
