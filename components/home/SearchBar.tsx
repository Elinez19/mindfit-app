import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { TextInput, TouchableOpacity, View } from "react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search for services...",
  onFilterPress,
}: SearchBarProps) {
  return (
    <BlurView intensity={40} tint="light" className="rounded-2xl">
      <View className="flex-row items-center px-4 py-3 rounded-2xl bg-white/80">
        <Ionicons name="search-outline" size={20} color="#0f172a" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(15,23,42,0.5)"
          className="flex-1 ml-3 text-slate-900"
        />
        <TouchableOpacity
          onPress={onFilterPress}
          className="px-3 py-2 rounded-xl bg-slate-900"
          activeOpacity={0.8}
        >
          <Ionicons name="options-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

