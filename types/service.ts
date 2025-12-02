export type ServiceSummary = {
  id: string;
  title: string;
  provider: ServiceProviderInfo;
  rating: number;
  price: string;
  location: string;
  image: string;
};

export type ServiceHighlight = {
  label: string;
  value: string;
};

export type ServiceProviderInfo = {
  name: string;
  role: string;
  avatar: string;
  phone: string;
};

export type ServiceDetail = ServiceSummary & {
  category: string;
  address: string;
  reviews: number;
  summary: string;
  description: string;
  highlights: ServiceHighlight[];
  gallery: string[];
  provider: ServiceProviderInfo;
  totalPrice: string;
  priceLabel: string;
  duration: string;
  availability: string;
};

