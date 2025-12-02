import { Pressable, Text, View } from "react-native";

type ServiceActionsBarProps = {
  totalPrice: string;
  priceLabel: string;
  onBookNow: () => void;
};

export function ServiceActionsBar({
  totalPrice,
  priceLabel,
  onBookNow,
}: ServiceActionsBarProps) {
  return (
    <View className="mt-6 mb-8 bg-white rounded-3xl p-4 flex-row items-center justify-between shadow-lg shadow-slate-900/10">
      <View>
        <Text className="text-slate-400 text-xs uppercase tracking-tight">
          {priceLabel}
        </Text>
        <Text className="text-2xl font-semibold text-slate-900">
          {totalPrice}
        </Text>
      </View>
      <Pressable
        onPress={onBookNow}
        className="bg-emerald-500 rounded-2xl px-8 py-3 active:opacity-90"
      >
        <Text className="text-white font-semibold text-base">Book Now</Text>
      </Pressable>
    </View>
  );
}

