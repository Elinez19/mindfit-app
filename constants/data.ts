import { Onboarding } from "@/types";
export { homeArticles } from "./mental-health-articles";

/* ---------- Onboarding Data ---------- */
export const defaultOnboarding: Onboarding[] = [
  {
    id: 1,
    title: "Managing Anxiety",
    category: "Mental Wellness",
    price: "Start Free",
    rating: "4.9",
    image: { uri: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&w=800&q=80" },
    description: "Learn techniques to calm your mind and reduce daily stress",
  },
  {
    id: 2,
    title: "Better Sleep",
    category: "Sleep & Relaxation",
    price: "Start Free",
    rating: "4.8",
    image: { uri: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&w=800&q=80" },
    description: "Improve your sleep quality with guided meditation and relaxation",
  },
  {
    id: 3,
    title: "Building Confidence",
    category: "Personal Growth",
    price: "Start Free",
    rating: "4.9",
    image: { uri: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&w=800&q=80" },
    description: "Develop self-love and boost your confidence through therapy",
  },
  {
    id: 4,
    title: "Stress Management",
    category: "Mindfulness",
    price: "Start Free",
    rating: "4.7",
    image: { uri: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&w=800&q=80" },
    description: "Master mindfulness techniques to handle life's challenges",
  },
  {
    id: 5,
    title: "Emotional Balance",
    category: "Therapy & Support",
    price: "Start Free",
    rating: "4.8",
    image: { uri: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&w=800&q=80" },
    description: "Find emotional balance with professional therapeutic support",
  },
  {
    id: 6,
    title: "Relationship Health",
    category: "Couples & Family",
    price: "Start Free",
    rating: "4.9",
    image: { uri: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&w=800&q=80" },
    description: "Strengthen your relationships through couples counseling",
  },
  {
    id: 7,
    title: "Mindful Living",
    category: "Lifestyle & Wellness",
    price: "Start Free",
    rating: "4.8",
    image: { uri: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&w=800&q=80" },
    description: "Create a balanced life with mindfulness and wellness practices",
  },
];

/* ---------- Gradient Colors ---------- */
export const gradientColors = {
  primary: ["#FEF2F2", "#FEE2E2", "#FECACA"] as const, // Soft pink to light red
  secondary: [
    "rgba(254, 242, 242, 0.95)", // soft pink
    "rgba(254, 226, 226, 0.85)", // light red
    "rgba(254, 202, 202, 0.75)", // pale pink
  ] as const,
  cardOverlay: [
    "transparent",
    "rgba(220, 38, 38, 0.5)", // soft red overlay
    "rgba(220, 38, 38, 0.45)",
  ] as const,
};
/* ---------- Animation Constants ---------- */
export const animationConfig = {
  splashDelay: 3000,
  fadeInDuration: 800,
  springDamping: 28,
  buttonPressScale: 0.95,
  buttonPressOpacity: 0.7,
};

/* ---------- App Configuration ---------- */
export const appConfig = {
  name: "MindFit",
  tagline: "Your Mental Wellness Journey",
  description: "Professional therapy, wellness, and mental health support",
  carouselSpeed: 60,
  blurIntensity: 65,
};

/* ---------- Home Screen Data ---------- */
export const heroBanners = [
  {
    title: "Welcome Offer",
    subtitle: "First therapy session 50% off - Start your journey today",
    cta: "Book Now",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&w=600&q=60",
    color: ["#DC2626", "#F87171"], // Therapeutic red gradient
  },
  {
    title: "24/7 Crisis Support",
    subtitle: "Immediate help available - You're not alone",
    cta: "Get Support",
    image:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&w=600&q=60",
    color: ["#059669", "#34D399"], // Calming sage green gradient
  },
] as const;

export const categories = [
  { icon: "heart-outline", label: "Therapy" },
  { icon: "fitness-outline", label: "Wellness" },
  { icon: "people-outline", label: "Couples" },
  { icon: "leaf-outline", label: "Mindfulness" },
  { icon: "happy-outline", label: "Life Coaching" },
  { icon: "medical-outline", label: "Mental Health" },
] as const;

export const topProviders = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    role: "Clinical Psychologist",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&w=200&q=60",
  },
  {
    id: "2",
    name: "Dr. James Chen",
    role: "Psychiatrist",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&w=200&q=60",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Licensed Therapist",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&w=200&q=60",
  },
  {
    id: "4",
    name: "Michael Thompson",
    role: "Life Coach",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&w=200&q=60",
  },
];

/* ---------- Featured Services ---------- */
export const featuredServices = [
  {
    id: "1",
    title: "Cognitive Behavioral Therapy",
    description: "Evidence-based therapy for anxiety, depression, and behavioral patterns",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&w=600&q=60",
    icon: "brain-outline",
    price: "From $90",
    rating: 4.8,
    category: "Therapy",
  },
  {
    id: "2",
    title: "Guided Meditation Sessions",
    description: "Reduce stress and anxiety with expert-led mindfulness meditation",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&w=600&q=60",
    icon: "leaf-outline",
    price: "From $30",
    rating: 4.9,
    category: "Mindfulness",
  },
  {
    id: "3",
    title: "Relationship Counseling",
    description: "Strengthen bonds and improve communication with your partner",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&w=600&q=60",
    icon: "people-outline",
    price: "From $120",
    rating: 4.7,
    category: "Couples",
  },
  {
    id: "4",
    title: "Stress Management Program",
    description: "Learn effective techniques to manage and reduce daily stress",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&w=600&q=60",
    icon: "fitness-outline",
    price: "From $75",
    rating: 4.8,
    category: "Wellness",
  },
];

/* ---------- Benefits/Features ---------- */
export const benefits = [
  {
    id: "1",
    icon: "shield-checkmark-outline",
    title: "Licensed Professionals",
    description: "All therapists are licensed, certified, and background-checked",
    color: "#DC2626", // Therapeutic red
  },
  {
    id: "2",
    icon: "time-outline",
    title: "Flexible Scheduling",
    description: "Book sessions that fit your schedule, including evenings and weekends",
    color: "#0EA5E9", // Calming sky blue
  },
  {
    id: "3",
    icon: "lock-closed-outline",
    title: "100% Confidential",
    description: "Your privacy is protected with HIPAA-compliant security",
    color: "#059669", // Sage green
  },
  {
    id: "4",
    icon: "heart-outline",
    title: "Personalized Care",
    description: "Tailored treatment plans designed for your unique needs",
    color: "#DB2777", // Gentle rose
  },
];

/* ---------- Special Offers ---------- */
export const specialOffers = [
  {
    id: "1",
    title: "New Client Welcome",
    discount: "50% OFF",
    description: "Get 50% off your first therapy session",
    code: "WELCOME50",
    color: ["#DC2626", "#F87171"], // Therapeutic red
    icon: "gift-outline",
  },
  {
    id: "2",
    title: "Wellness Package",
    discount: "20% OFF",
    description: "Save 20% on 5-session wellness packages",
    code: "WELLNESS20",
    color: ["#059669", "#34D399"], // Sage green
    icon: "fitness-outline",
  },
  {
    id: "3",
    title: "Refer & Support",
    discount: "$40 Credit",
    description: "Refer a friend and both get $40 credit",
    code: "REFER40",
    color: ["#DB2777", "#F472B6"], // Gentle rose
    icon: "people-outline",
  },
];

/* ---------- How It Works ---------- */
export const howItWorksSteps = [
  {
    id: "1",
    step: "01",
    title: "Take Assessment",
    description: "Complete a brief questionnaire to help us understand your needs",
    icon: "clipboard-outline",
  },
  {
    id: "2",
    step: "02",
    title: "Get Matched",
    description: "We'll connect you with the perfect therapist for your situation",
    icon: "people-outline",
  },
  {
    id: "3",
    step: "03",
    title: "Start Your Journey",
    description: "Begin sessions at your convenience - online or in-person",
    icon: "heart-outline",
  },
  {
    id: "4",
    step: "04",
    title: "Track Progress",
    description: "Monitor your mental wellness journey and celebrate milestones",
    icon: "trending-up-outline",
  },
];

/* ---------- Explore Screen Data ---------- */

// Trending Services
export const trendingServices = [
  {
    id: "trend-1",
    title: "Online Therapy Sessions",
    category: "Therapy",
    price: "From $75",
    rating: 4.9,
    reviews: 542,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&w=600&q=60",
    trending: true,
    badge: "🔥 Hot",
  },
  {
    id: "trend-2",
    title: "Mindfulness Workshops",
    category: "Wellness",
    price: "From $45",
    rating: 4.8,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&w=600&q=60",
    trending: true,
    badge: "⚡ Popular",
  },
  {
    id: "trend-3",
    title: "Group Therapy Sessions",
    category: "Support Groups",
    price: "From $35",
    rating: 4.7,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&w=600&q=60",
    trending: true,
    badge: "⭐ New",
  },
];

// Service Categories with Images
export const exploreCategoriesWithImages = [
  {
    id: "cat-1",
    name: "Individual Therapy",
    serviceCount: 34,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&w=600&q=60",
    icon: "person-outline",
    color: "#DC2626", // Therapeutic red
  },
  {
    id: "cat-2",
    name: "Couples Counseling",
    serviceCount: 18,
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&w=600&q=60",
    icon: "people-outline",
    color: "#DB2777", // Gentle rose
  },
  {
    id: "cat-3",
    name: "Meditation & Mindfulness",
    serviceCount: 28,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&w=600&q=60",
    icon: "leaf-outline",
    color: "#059669", // Sage green
  },
  {
    id: "cat-4",
    name: "Stress Management",
    serviceCount: 22,
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&w=600&q=60",
    icon: "fitness-outline",
    color: "#0EA5E9", // Calming sky blue
  },
  {
    id: "cat-5",
    name: "Life Coaching",
    serviceCount: 16,
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&w=600&q=60",
    icon: "happy-outline",
    color: "#F59E0B", // Warm amber
  },
  {
    id: "cat-6",
    name: "Support Groups",
    serviceCount: 25,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&w=600&q=60",
    icon: "heart-outline",
    color: "#8B5CF6", // Soft violet
  },
];

// Expert Tips (Quick Tips Section)
export const expertTips = [
  {
    id: "tip-1",
    title: "Practice Daily Mindfulness",
    description: "Just 10 minutes of meditation daily can reduce stress and improve focus",
    icon: "leaf-outline",
    color: "#059669", // Sage green
  },
  {
    id: "tip-2",
    title: "Prioritize Sleep",
    description: "7-9 hours of quality sleep is essential for mental health and emotional regulation",
    icon: "moon-outline",
    color: "#DC2626", // Therapeutic red
  },
  {
    id: "tip-3",
    title: "Stay Connected",
    description: "Strong social connections are vital for mental wellness and resilience",
    icon: "people-outline",
    color: "#DB2777", // Gentle rose
  },
  {
    id: "tip-4",
    title: "Move Your Body",
    description: "Regular exercise releases endorphins and reduces anxiety and depression",
    icon: "fitness-outline",
    color: "#0EA5E9", // Calming sky blue
  },
];

/* ---------- Chat Data ---------- */
export const chatList = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    role: "Clinical Psychologist",
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&w=200&q=60",
    lastMessage: "Looking forward to our session tomorrow!",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Dr. James Chen",
    role: "Psychiatrist",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&w=200&q=60",
    lastMessage: "How have you been feeling this week?",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Licensed Therapist",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&w=200&q=60",
    lastMessage: "Great progress in today's session!",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "4",
    name: "Michael Thompson",
    role: "Life Coach",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&w=200&q=60",
    lastMessage: "Thanks for sharing your goals with me!",
    time: "Tue",
    unread: 0,
    online: false,
  },
];

export const chatMessages = {
  "1": [
    {
      id: "m1",
      text: "Hi Dr. Mitchell, I wanted to confirm our session tomorrow.",
      sender: "user",
      time: "10:00 AM",
    },
    {
      id: "m2",
      text: "Yes! We're all set for 2 PM. How have you been feeling?",
      sender: "other",
      time: "10:05 AM",
    },
    {
      id: "m3",
      text: "Much better, the techniques we discussed have really helped.",
      sender: "user",
      time: "10:06 AM",
    },
    {
      id: "m4",
      text: "Looking forward to our session tomorrow!",
      sender: "other",
      time: "10:30 AM",
    },
  ],
  "2": [
    {
      id: "m1",
      text: "Hello Dr. Chen, I've been experiencing increased anxiety lately.",
      sender: "user",
      time: "Yesterday, 2:00 PM",
    },
    {
      id: "m2",
      text: "I'm here to help. Can you tell me more about when it started?",
      sender: "other",
      time: "Yesterday, 2:15 PM",
    },
    {
      id: "m3",
      text: "It started about a week ago, especially at night.",
      sender: "user",
      time: "Yesterday, 2:20 PM",
    },
    {
      id: "m4",
      text: "How have you been feeling this week?",
      sender: "other",
      time: "Yesterday, 2:25 PM",
    },
  ],
};

/* ---------- Profile Data ---------- */
export const userProfile = {
  name: "Olivia James",
  email: "olivia@mindfit.app",
  phone: "+1 (555) 123-4567",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&w=200&q=80",
  location: "San Francisco, CA",
  memberSince: "August 2023",
  membership: "Wellness Plus Member",
};

export const profileStats = [
  { label: "Sessions", value: "12" },
  { label: "Wellness Score", value: "85" },
  { label: "Favorites", value: "8" },
];

export const profileMenu = [
  {
    title: "Account",
    items: [
      { icon: "person-outline", label: "Personal Information", route: "/profile/info" },
      { icon: "card-outline", label: "Payment Methods", route: "/profile/payments" },
      { icon: "location-outline", label: "Addresses", route: "/profile/addresses" },
      { icon: "notifications-outline", label: "Notifications", route: "/profile/notifications" },
    ],
  },
  {
    title: "General",
    items: [
      { icon: "settings-outline", label: "Settings", route: "/profile/settings" },
      { icon: "language-outline", label: "Language", value: "English (US)", route: "/profile/language" },
      { icon: "moon-outline", label: "Dark Mode", isSwitch: true, route: null },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "help-circle-outline", label: "Help Center", route: "/profile/help" },
      { icon: "chatbubble-ellipses-outline", label: "Contact Support", route: "/profile/support" },
      { icon: "document-text-outline", label: "Terms & Privacy", route: "/profile/legal" },
    ],
  },
];

/* ---------- Cart & Favorites Data ---------- */
export const cartItems = [
  {
    id: "1",
    serviceId: "1",
    title: "Cognitive Behavioral Therapy",
    price: 90,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&w=600&q=60",
    category: "Therapy",
    date: "2023-11-25",
    time: "10:00 AM",
  },
  {
    id: "2",
    serviceId: "2",
    title: "Guided Meditation Session",
    price: 30,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&w=600&q=60",
    category: "Mindfulness",
    date: "2023-11-28",
    time: "02:00 PM",
  }
];

export const favoriteItems = [
  {
    id: "1",
    title: "Cognitive Behavioral Therapy",
    price: "From $90",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&w=600&q=60",
    category: "Therapy",
    reviews: 228,
  },
  {
    id: "3",
    title: "Stress Management Program",
    price: "From $75",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&w=600&q=60",
    category: "Wellness",
    reviews: 185,
  },
   {
    id: "trend-1",
    title: "Online Therapy Sessions",
    category: "Therapy",
    price: "From $75",
    rating: 4.9,
    reviews: 542,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&w=600&q=60",
  },
];

/* ---------- Quiz Data ---------- */
export const quizGoals = [
  {
    id: 'goal-1',
    title: 'Losing Weight',
    description: 'Lose weight without the struggle',
    icon: 'scale-outline',
  },
  {
    id: 'goal-2',
    title: 'Nurturing Self Love',
    description: 'Appreciate your body\'s transformation',
    icon: 'heart-outline',
  },
  {
    id: 'goal-3',
    title: 'Building Muscle Mass',
    description: 'Become fit and muscular',
    icon: 'barbell-outline',
  },
  {
    id: 'goal-4',
    title: 'Staying Fit',
    description: 'Keep fit and enjoy feeling your best',
    icon: 'body-outline',
  },
];

export const quizFocus = [
  {
    id: 'focus-1',
    title: 'Counting Calories',
    description: 'I want to be exact in tracking the macros I take in',
    icon: 'flame-outline',
  },
  {
    id: 'focus-2',
    title: 'Workout Plans',
    description: 'I want to build my fitness and define my muscles',
    icon: 'barbell-outline',
  },
  {
    id: 'focus-3',
    title: 'Fasting Schedules',
    description: 'I want to lose weight & balance my blood sugar level',
    icon: 'timer-outline',
  },
  {
    id: 'focus-4',
    title: 'Special Meal Plans',
    description: 'I\'m looking for a preset menu to see rapid results',
    icon: 'restaurant-outline',
  },
];

export const quizGender = [
  { id: 'gender-1', label: 'Male', icon: 'male-outline' },
  { id: 'gender-2', label: 'Female', icon: 'female-outline' },
  { id: 'gender-3', label: 'Non-Binary', icon: 'transgender-outline' },
  { id: 'gender-4', label: 'Prefer Not to Say', icon: 'close-circle-outline' },
];
