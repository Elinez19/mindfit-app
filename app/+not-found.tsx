import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center bg-white p-5">
        <Text className="text-xl font-bold text-slate-900">
          This screen doesn't exist.
        </Text>
        <Text className="mt-2 text-center text-slate-500">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </Text>

        <Link href="/" className="mt-8 py-3 px-6 bg-emerald-500 rounded-full">
          <Text className="text-white font-semibold">Go to Home Screen</Text>
        </Link>
      </View>
    </>
  );
}
