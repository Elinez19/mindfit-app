import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type ServiceAboutSectionProps = {
  summary: string;
  description: string;
};

export function ServiceAboutSection({
  summary,
  description,
}: ServiceAboutSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 200;
  const isLong = description.length > previewLength;
  const body =
    expanded || !isLong
      ? description
      : `${description.slice(0, previewLength)}...`;

  return (
    <View className="mt-6">
      <Text className="text-lg font-semibold text-slate-900">About Service</Text>
      <Text className="text-slate-500 text-sm mt-2">{summary}</Text>
      <Text className="text-slate-600 text-sm mt-3 leading-5">{body}</Text>
      {isLong && (
        <Pressable
          onPress={() => setExpanded((prev) => !prev)}
          className="mt-2 active:opacity-80"
        >
          <Text className="text-emerald-600 font-semibold text-sm">
            {expanded ? "Show less" : "Read more"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

