import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export type Category = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

type CategoriesCarouselProps = {
  categories: Category[] | readonly Category[];
  onCategoryPress?: (label: string) => void;
};

export function CategoriesCarousel({
  categories,
  onCategoryPress,
}: CategoriesCarouselProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 12 }}
    >
      <View className="flex-row gap-3">
        {categories.map((category) => (
          <BlurView
            key={category.label}
            intensity={30}
            tint="light"
            className="rounded-2xl"
          >
            <TouchableOpacity
              onPress={() => onCategoryPress?.(category.label)}
              className="rounded-2xl bg-white/70 px-4 py-3 flex-row items-center gap-2"
              activeOpacity={0.8}
            >
              <Ionicons name={category.icon} size={18} color="#0f172a" />
              <Text className="text-slate-800 text-sm font-medium">
                {category.label}
              </Text>
            </TouchableOpacity>
          </BlurView>
        ))}
      </View>
    </ScrollView>
  );
}

