import { Pressable, Text, View } from "react-native";

const tabs = ["About", "Gallery", "Review"] as const;

export type ServiceInfoTab = (typeof tabs)[number];

type ServiceInfoTabsProps = {
  category: string;
  title: string;
  address: string;
  rating: number;
  reviews: number;
  activeTab: ServiceInfoTab;
  onTabChange: (tab: ServiceInfoTab) => void;
};

export function ServiceInfoTabs({
  category,
  title,
  address,
  rating,
  reviews,
  activeTab,
  onTabChange,
}: ServiceInfoTabsProps) {
  return (
    <View className="bg-white rounded-3xl p-5 -mt-8 shadow-lg shadow-slate-900/5">
      <View className="flex-row items-center gap-2">
        <Text className="text-emerald-600 font-semibold text-xs px-2 py-0.5 rounded-full bg-emerald-50">
          {category}
        </Text>
        <Text className="text-amber-500 font-semibold text-xs">
          ⭐ {rating} ({reviews} reviews)
        </Text>
      </View>
      <Text className="text-slate-900 text-2xl font-semibold mt-2">
        {title}
      </Text>
      <Text className="text-slate-500 text-sm mt-1">{address}</Text>

      <View className="flex-row items-center bg-slate-100 rounded-2xl p-1 mt-4">
        {tabs.map((tab) => {
          const active = activeTab === tab;
          return (
            <Pressable
              key={tab}
              onPress={() => onTabChange(tab)}
              className="flex-1 px-4 py-2 rounded-2xl"
              style={
                active
                  ? {
                      backgroundColor: "white",
                      shadowColor: "#0f172a",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 2,
                    }
                  : undefined
              }
            >
              <Text
                className="text-center text-sm font-semibold"
                style={{ color: active ? "#0f172a" : "#94a3b8" }}
              >
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

