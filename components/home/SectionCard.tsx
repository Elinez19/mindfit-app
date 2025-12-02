import { ReactNode } from "react";
import { BlurView } from "expo-blur";
import { Text, TouchableOpacity, View } from "react-native";

type SectionCardProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionCard({
  title,
  actionLabel,
  onActionPress,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <BlurView
      intensity={35}
      tint="light"
      className={`rounded-3xl ${className ?? ""}`}
      style={{ overflow: "visible" }}
    >
      <View
        className={`rounded-3xl bg-white/80 p-5 ${contentClassName ?? ""}`}
        style={{ overflow: "visible" }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-slate-900">{title}</Text>
          {actionLabel ? (
            <TouchableOpacity onPress={onActionPress} activeOpacity={0.8}>
              <Text className="text-slate-500 font-semibold text-sm">
                {actionLabel}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {children}
      </View>
    </BlurView>
  );
}

