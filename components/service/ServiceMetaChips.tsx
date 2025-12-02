import { ServiceHighlight } from "@/types/service";
import { Text, View } from "react-native";

type ServiceMetaChipsProps = {
  highlights: ServiceHighlight[];
  duration: string;
  availability: string;
};

export function ServiceMetaChips({
  highlights,
  duration,
  availability,
}: ServiceMetaChipsProps) {
  return (
    <View className="mt-5 space-y-3">
      <View className="flex-row flex-wrap gap-2">
        {highlights.map((highlight) => (
          <View
            key={highlight.label}
            className="px-3 py-2 bg-slate-100 rounded-2xl"
          >
            <Text className="text-xs text-slate-500">{highlight.label}</Text>
            <Text className="text-sm font-semibold text-slate-900">
              {highlight.value}
            </Text>
          </View>
        ))}
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 bg-white rounded-2xl p-3 border border-slate-100">
          <Text className="text-xs text-slate-400">Duration</Text>
          <Text className="text-base font-semibold text-slate-900">
            {duration}
          </Text>
        </View>
        <View className="flex-1 bg-white rounded-2xl p-3 border border-slate-100">
          <Text className="text-xs text-slate-400">Availability</Text>
          <Text className="text-base font-semibold text-slate-900">
            {availability}
          </Text>
        </View>
      </View>
    </View>
  );
}

