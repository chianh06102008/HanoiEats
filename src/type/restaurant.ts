// src/type/restaurant.ts (giữ của bạn, bổ sung nhẹ)
export interface IRestaurant {
  id?: string;
  name: string;
  image: string;
  address: string;
  lat: number;
  lng: number;
  category: string[];
  district?: string;
  price: { min: number; max: number };
  time: { open: string; close: string };
  // bổ sung để hiển thị nhanh
}

export interface IMenuItem {
  id?: string;
  name: string;
  basePrice: number; // VND
  currency?: "VND";
  category?: string; // “Món chính”, “Đồ uống”, …
  description?: string;
  photo?: string; // URL Storage
  available?: boolean; // default true
  tags?: string[]; // spicy, vegan, signature…
  options?: Array<{
    // size/topping
    name: string;
    values: Array<{ label: string; addPrice?: number }>;
  }>;
  sortOrder?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IRestaurantMockup {
  id?: string;
  name: string;
  image: string;
  address: string;
  lat: number;
  lng: number;
  category: string[];
  district?: string;
  price: { min: number; max: number };
  time: { open: string; close: string };

  // chỉ dùng ở mock data
  menu?: IMenuItem[];
}

export interface IComment {
  id?: string;
  resId: string;
  userId: string;
  comment: ICommentForm;
}

export interface ICommentForm {
  title: string;
  content: string;
  avgRating: number;
  imageUrl: string;
  imageName: string;
  timestamp: Date;
  vote: {
    [userId: string]: -1 | 1;
  };
}

export interface IRating {
  location: number;
  price: number;
  quality: number;
  service: number;
  space: number;
}

export enum EResStatus {
  OPEN = "1",
  CLOSE = "0",
}
