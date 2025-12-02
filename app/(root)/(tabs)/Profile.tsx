import AddressModal from "@/components/modals/AddressModal";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import EditProfileModal from "@/components/modals/EditProfileModal";
import LanguageModal from "@/components/modals/LanguageModal";
import NotificationModal from "@/components/modals/NotificationModal";
import PaymentMethodsModal from "@/components/modals/PaymentMethodsModal";
import SuccessModal from "@/components/modals/SuccessModal";
import {
    userProfile as defaultUserProfile,
    gradientColors,
    profileMenu,
    profileStats,
} from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(defaultUserProfile);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Modal States
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleMenuItemPress = (item: any) => {
    switch (item.label) {
      case "Personal Information":
        setShowEditProfile(true);
        break;
      case "Payment Methods":
        setShowPaymentMethods(true);
        break;
      case "Addresses":
        setShowAddresses(true);
        break;
      case "Notifications":
        setShowNotifications(true);
        break;
      case "Language":
        setShowLanguage(true);
        break;
      case "Dark Mode":
        // Handled by Switch
        break;
      default:
        if (item.route) {
          router.push(item.route);
        }
        break;
    }
  };

  const handleSaveProfile = (newData: any) => {
    setUserProfile({ ...userProfile, ...newData });
    setShowEditProfile(false);
    setSuccessMessage("Your profile has been updated successfully.");
    setTimeout(() => setShowSuccess(true), 500);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false);
    // Mock logout logic
    setTimeout(() => {
      router.replace("/");
    }, 500);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      
      {/* Background Gradients */}
      <LinearGradient
        colors={gradientColors.primary}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <LinearGradient
        colors={gradientColors.secondary}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="px-6 pt-2 pb-6 items-center">
            <View className="relative">
              <View className="w-28 h-28 rounded-full p-1 bg-white shadow-lg">
                <Image
                  source={{ uri: userProfile.avatar }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity 
                className="absolute bottom-0 right-0 bg-slate-900 w-8 h-8 rounded-full items-center justify-center border-2 border-white"
                activeOpacity={0.8}
                onPress={() => setShowEditProfile(true)}
              >
                <Ionicons name="camera-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold text-slate-900 mt-4">
              {userProfile.name}
            </Text>
            
            <View className="flex-row items-center mt-1">
              <Ionicons name="location-outline" size={14} color="#64748b" />
              <Text className="text-slate-500 text-sm ml-1">
                {userProfile.location}
              </Text>
            </View>

            <View className="bg-slate-900/5 px-3 py-1 rounded-full mt-3 border border-slate-900/10">
              <Text className="text-slate-900 text-xs font-semibold">
                {userProfile.membership}
              </Text>
            </View>
          </View>

          {/* Stats Section */}
          <View className="px-6 mb-8">
            <BlurView intensity={40} tint="light" className="rounded-3xl overflow-hidden">
              <View className="bg-white/60 flex-row justify-between py-5 px-2">
                {profileStats.map((stat, index) => (
                  <View key={index} className="flex-1 items-center border-r border-slate-200/50 last:border-r-0">
                    <Text className="text-xl font-bold text-slate-900">
                      {stat.value}
                    </Text>
                    <Text className="text-slate-500 text-xs mt-1 font-medium">
                      {stat.label}
                    </Text>
                  </View>
                ))}
              </View>
            </BlurView>
          </View>

          {/* Menu Sections */}
          <View className="px-6 space-y-6">
            {profileMenu.map((section, sectionIndex) => (
              <View key={sectionIndex}>
                <Text className="text-slate-900 font-bold text-lg mb-3 ml-1">
                  {section.title}
                </Text>
                <BlurView intensity={30} tint="light" className="rounded-3xl overflow-hidden">
                  <View className="bg-white/70">
                    {section.items.map((item, itemIndex) => (
                      <TouchableOpacity
                        key={itemIndex}
                        className={`flex-row items-center justify-between p-4 ${
                          itemIndex !== section.items.length - 1
                            ? "border-b border-slate-100"
                            : ""
                        }`}
                        activeOpacity={0.7}
                        disabled={item.isSwitch}
                        onPress={() => handleMenuItemPress(item)}
                      >
                        <View className="flex-row items-center">
                          <View className="w-10 h-10 rounded-full bg-slate-50 items-center justify-center mr-3">
                            <Ionicons
                              name={item.icon as any}
                              size={20}
                              color="#334155"
                            />
                          </View>
                          <Text className="text-slate-700 font-medium text-base">
                            {item.label}
                          </Text>
                        </View>
                        
                        <View className="flex-row items-center">
                          {item.label === "Language" ? (
                            <Text className="text-slate-400 text-sm mr-2">
                              {selectedLanguage}
                            </Text>
                          ) : item.value ? (
                            <Text className="text-slate-400 text-sm mr-2">
                              {item.value}
                            </Text>
                          ) : null}
                          
                          {item.isSwitch ? (
                            <Switch
                              trackColor={{ false: "#e2e8f0", true: "#0f172a" }}
                              thumbColor={"#ffffff"}
                              ios_backgroundColor="#e2e8f0"
                              value={isDarkMode}
                              onValueChange={setIsDarkMode}
                            />
                          ) : (
                            <Ionicons
                              name="chevron-forward"
                              size={18}
                              color="#94a3b8"
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </BlurView>
              </View>
            ))}

            {/* Logout Button */}
            <TouchableOpacity
              className="mt-4 mb-8 flex-row items-center justify-center bg-red-50 py-4 rounded-3xl border border-red-100"
              activeOpacity={0.8}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              <Text className="text-red-500 font-semibold text-base ml-2">
                Log Out
              </Text>
            </TouchableOpacity>

            <View className="items-center pb-8">
              <Text className="text-slate-400 text-xs">
                MindFit v1.0.0
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Modals */}
      <EditProfileModal
        isVisible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={handleSaveProfile}
        initialData={{
          name: userProfile.name,
          email: userProfile.email,
          phone: userProfile.phone,
          location: userProfile.location,
          avatar: userProfile.avatar,
        }}
      />

      <PaymentMethodsModal
        isVisible={showPaymentMethods}
        onClose={() => setShowPaymentMethods(false)}
      />

      <AddressModal
        isVisible={showAddresses}
        onClose={() => setShowAddresses(false)}
      />

      <NotificationModal
        isVisible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      <LanguageModal
        isVisible={showLanguage}
        onClose={() => setShowLanguage(false)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />

      <ConfirmationModal
        isVisible={showLogoutConfirm}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        title="Log Out"
        message="Are you sure you want to log out? You will need to sign in again to access your account."
        confirmText="Log Out"
        cancelText="Cancel"
        type="danger"
      />

      <SuccessModal
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Success"
        message={successMessage}
        buttonText="OK"
      />
    </View>
  );
}
