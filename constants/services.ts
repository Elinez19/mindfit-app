import { ServiceDetail, ServiceSummary } from "@/types/service";

const serviceDetails: ServiceDetail[] = [
  {
    id: "deep-house-cleaning",
    title: "Deep House Cleaning",
    category: "Home Cleaning",
    rating: 4.5,
    reviews: 365,
    price: "$65.00 / hr",
    totalPrice: "$180.00",
    priceLabel: "Total Price",
    location: "New York, USA",
    address: "1012 Ocean Avenue, New York, USA",
    image:
      "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&w=900&q=60",
    summary:
      "Premium deep clean for apartments and family homes with attention to every detail, using eco-friendly supplies.",
    description:
      "Our Deep House Cleaning service covers every corner of your home. From baseboards to ceiling fans, kitchen appliances to bathroom tile, our trained team uses hospital-grade disinfectants and hypoallergenic products to keep your family safe. Flexible scheduling, verified professionals, and satisfaction guaranteed.",
    highlights: [
      { label: "Duration", value: "3 hrs avg" },
      { label: "Supplies", value: "Eco products" },
      { label: "Support", value: "24/7 chat" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1484632152040-840235adc262?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1462219184704-54ee455e1ee0?auto=format&w=400&q=60",
    ],
    provider: {
      name: "Jenny Wilson",
      role: "Service Provider",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=60",
      phone: "+1 516-503-1111",
    },
    duration: "Up to 4 hrs",
    availability: "Mon - Sun",
  },
  {
    id: "smart-home-installation",
    title: "Smart Home Installation",
    category: "Home Automation",
    rating: 4.9,
    reviews: 192,
    price: "$120.00 / hr",
    totalPrice: "$320.00",
    priceLabel: "Starting At",
    location: "Queens, NY",
    address: "4109 Queen Street, Queens, NY",
    image:
      "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&w=900&q=60",
    summary:
      "Upgrade your apartment or townhouse with professional installation of smart locks, thermostats, and lighting.",
    description:
      "Certified installers configure every device, integrate voice assistants, and provide training so you can automate climate, lighting, and security. Includes network optimization, custom scenes, and post-install support. Hardware recommendations available upon request.",
    highlights: [
      { label: "Devices", value: "Up to 8" },
      { label: "Warranty", value: "12 months" },
      { label: "Support", value: "Phone & chat" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&w=400&q=60",
    ],
    provider: {
      name: "Calvin Flores",
      role: "Lead Technician",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=200&q=60",
      phone: "+1 718-244-8892",
    },
    duration: "2 - 5 hrs",
    availability: "Mon - Sat",
  },
  {
    id: "landscape-refresh",
    title: "Landscape Refresh",
    category: "Landscaping",
    rating: 4.7,
    reviews: 88,
    price: "$180.00 / project",
    totalPrice: "$480.00",
    priceLabel: "Package Price",
    location: "Jersey City, NJ",
    address: "88 Liberty Drive, Jersey City, NJ",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&w=900&q=60",
    summary:
      "Seasonal refresh for lawns and small gardens. Includes trimming, mulching, and planter styling.",
    description:
      "Our crew revitalizes front yards, patios, and rooftop terraces. Includes soil testing, irrigation check, and disposal of green waste. Optional add-ons for planter installation and lighting accents.",
    highlights: [
      { label: "Lot Size", value: "Up to 1,800 sqft" },
      { label: "Team", value: "2 specialists" },
      { label: "Guarantee", value: "14-day touch up" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&w=400&q=60",
    ],
    provider: {
      name: "Patricia Ortega",
      role: "Lead Gardener",
      avatar:
        "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&w=200&q=60",
      phone: "+1 201-325-2240",
    },
    duration: "1 day",
    availability: "Tue - Sun",
  },
  // Featured Services
  {
    id: "1",
    title: "Emergency Plumbing",
    category: "Plumbing",
    rating: 4.8,
    reviews: 287,
    price: "$120.00 / hr",
    totalPrice: "$240.00",
    priceLabel: "Starting At",
    location: "Brooklyn, NY",
    address: "456 Water Street, Brooklyn, NY",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&w=900&q=60",
    summary:
      "24/7 emergency plumbing services for urgent repairs and maintenance. Fast response time guaranteed.",
    description:
      "Our emergency plumbing team is available around the clock to handle burst pipes, clogged drains, water heater failures, and all urgent plumbing issues. Licensed and insured professionals arrive within 60 minutes with fully stocked vehicles. We provide upfront pricing and guarantee our work with a 90-day warranty.",
    highlights: [
      { label: "Response", value: "60 min" },
      { label: "Availability", value: "24/7" },
      { label: "Warranty", value: "90 days" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&w=400&q=60",
    ],
    provider: {
      name: "Michael Chen",
      role: "Master Plumber",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=200&q=60",
      phone: "+1 718-555-0123",
    },
    duration: "1 - 3 hrs",
    availability: "24/7",
  },
  {
    id: "2",
    title: "Professional Painting",
    category: "Painting",
    rating: 4.9,
    reviews: 412,
    price: "$300.00 / room",
    totalPrice: "$900.00",
    priceLabel: "Package Price",
    location: "Manhattan, NY",
    address: "789 Paint Avenue, Manhattan, NY",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&w=900&q=60",
    summary:
      "Transform your space with expert interior and exterior painting services. Premium paints and flawless finish.",
    description:
      "Our professional painters bring years of experience to every project. We use premium Benjamin Moore and Sherwin-Williams paints, prepare surfaces meticulously, and protect your furniture and floors. Services include color consultation, minor drywall repairs, and thorough cleanup. All work is backed by our satisfaction guarantee.",
    highlights: [
      { label: "Paint", value: "Premium brands" },
      { label: "Prep", value: "Full surface prep" },
      { label: "Guarantee", value: "2 years" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&w=400&q=60",
    ],
    provider: {
      name: "Sarah Martinez",
      role: "Lead Painter",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&w=200&q=60",
      phone: "+1 212-555-0456",
    },
    duration: "2 - 4 days",
    availability: "Mon - Sat",
  },
  {
    id: "3",
    title: "HVAC Maintenance",
    category: "HVAC",
    rating: 4.7,
    reviews: 198,
    price: "$200.00 / service",
    totalPrice: "$200.00",
    priceLabel: "Service Fee",
    location: "Queens, NY",
    address: "321 Cool Breeze Lane, Queens, NY",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&w=900&q=60",
    summary:
      "Keep your home comfortable with professional heating and cooling services. Seasonal maintenance and repairs.",
    description:
      "Our HVAC technicians provide comprehensive maintenance for all heating and cooling systems. Services include filter replacement, coil cleaning, refrigerant level checks, thermostat calibration, and full system diagnostics. Regular maintenance extends equipment life and improves energy efficiency by up to 30%. Emergency repair services available.",
    highlights: [
      { label: "Inspection", value: "21-point check" },
      { label: "Efficiency", value: "Up to 30% savings" },
      { label: "Emergency", value: "Same-day service" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1631545806609-47c7c0c9c4b3?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1635274831481-c5f0e2d7cfb1?auto=format&w=400&q=60",
    ],
    provider: {
      name: "David Thompson",
      role: "HVAC Specialist",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&w=200&q=60",
      phone: "+1 718-555-0789",
    },
    duration: "1 - 2 hrs",
    availability: "Mon - Sun",
  },
  {
    id: "4",
    title: "Electrical Services",
    category: "Electrical",
    rating: 4.8,
    reviews: 324,
    price: "$150.00 / hr",
    totalPrice: "$300.00",
    priceLabel: "Starting At",
    location: "Bronx, NY",
    address: "555 Electric Avenue, Bronx, NY",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&w=900&q=60",
    summary:
      "Safe and certified electrical installations, repairs, and upgrades. Licensed electricians for all your needs.",
    description:
      "Our licensed electricians handle everything from simple outlet installations to complete panel upgrades. We specialize in LED lighting retrofits, ceiling fan installation, circuit additions, and troubleshooting electrical issues. All work meets current electrical codes and includes a comprehensive safety inspection. Emergency services available for power outages and electrical hazards.",
    highlights: [
      { label: "Licensed", value: "Master electrician" },
      { label: "Code", value: "NEC compliant" },
      { label: "Safety", value: "Full inspection" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&w=400&q=60",
    ],
    provider: {
      name: "James Wilson",
      role: "Master Electrician",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=60",
      phone: "+1 718-555-0321",
    },
    duration: "1 - 4 hrs",
    availability: "Mon - Sat",
  },
  // Trending Services
  {
    id: "trend-1",
    title: "Smart Lock Installation",
    category: "Smart Home",
    rating: 4.9,
    reviews: 342,
    price: "$180.00 / lock",
    totalPrice: "$180.00",
    priceLabel: "Per Lock",
    location: "Manhattan, NY",
    address: "123 Security Street, Manhattan, NY",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&w=900&q=60",
    summary:
      "Professional smart lock installation with setup and training. Compatible with all major smart home systems.",
    description:
      "Upgrade your home security with professionally installed smart locks. We install and configure August, Yale, Schlage, and other leading brands. Service includes door assessment, lock installation, smartphone app setup, and integration with your existing smart home ecosystem. We ensure proper alignment and test all features before completion.",
    highlights: [
      { label: "Brands", value: "All major brands" },
      { label: "Integration", value: "Smart home ready" },
      { label: "Training", value: "Full setup guide" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1558002038-bb4237b54d4d?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c?auto=format&w=400&q=60",
    ],
    provider: {
      name: "Alex Rodriguez",
      role: "Smart Home Specialist",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=200&q=60",
      phone: "+1 212-555-0987",
    },
    duration: "1 - 2 hrs",
    availability: "Mon - Sat",
  },
  {
    id: "trend-2",
    title: "Solar Panel Installation",
    category: "Energy",
    rating: 4.8,
    reviews: 189,
    price: "$2,500.00 / system",
    totalPrice: "$12,500.00",
    priceLabel: "Complete System",
    location: "Staten Island, NY",
    address: "789 Solar Drive, Staten Island, NY",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&w=900&q=60",
    summary:
      "Complete solar panel installation with financing options. Reduce your energy bills and carbon footprint.",
    description:
      "Go green with our comprehensive solar panel installation service. We handle everything from site assessment and permit applications to installation and grid connection. Our high-efficiency panels come with 25-year warranties and monitoring systems. We'll help you maximize federal and state tax incentives. Most installations pay for themselves within 7-10 years through energy savings.",
    highlights: [
      { label: "Warranty", value: "25 years" },
      { label: "Savings", value: "Up to 70%" },
      { label: "Incentives", value: "Tax credit eligible" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&w=400&q=60",
    ],
    provider: {
      name: "Emily Johnson",
      role: "Solar Energy Consultant",
      avatar:
        "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&w=200&q=60",
      phone: "+1 718-555-0654",
    },
    duration: "2 - 3 days",
    availability: "Mon - Fri",
  },
  {
    id: "trend-3",
    title: "Home Theater Setup",
    category: "Entertainment",
    rating: 4.7,
    reviews: 256,
    price: "$450.00 / setup",
    totalPrice: "$1,200.00",
    priceLabel: "Complete Setup",
    location: "Brooklyn, NY",
    address: "456 Theater Lane, Brooklyn, NY",
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=900&q=60",
    summary:
      "Professional home theater installation and calibration. Transform your living room into a cinema experience.",
    description:
      "Create the ultimate entertainment experience with our professional home theater setup. We install and calibrate TVs, projectors, surround sound systems, and streaming devices. Services include cable management, speaker placement optimization, acoustic treatment recommendations, and universal remote programming. We work with all major brands and can integrate with your existing smart home system.",
    highlights: [
      { label: "Calibration", value: "Professional grade" },
      { label: "Brands", value: "All major brands" },
      { label: "Support", value: "30-day follow-up" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&w=400&q=60",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&w=400&q=60",
    ],
    provider: {
      name: "Robert Kim",
      role: "AV Technician",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=200&q=60",
      phone: "+1 718-555-0147",
    },
    duration: "3 - 5 hrs",
    availability: "Tue - Sun",
  },
];

export const services: ServiceSummary[] = serviceDetails.map((service) => ({
  id: service.id,
  title: service.title,
  provider: service.provider,
  rating: service.rating,
  price: service.price,
  location: service.location,
  image: service.image,
}));

export function getServiceDetail(serviceId: string) {
  return serviceDetails.find((service) => service.id === serviceId);
}

