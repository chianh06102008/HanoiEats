import { Dimensions } from "react-native";

export enum EDistrict {
  BaDinh = "0",
  CauGiay = "1",
  HoanKiem = "2",
  DongDa = "3",
  HaiBaTrung = "4",
  HaDong = "5",
  LongBien = "6",
  TayHo = "7",
}
export const DistrictName = (districtId: string) => {
  switch (districtId) {
    case "0":
      return "Ba Dinh District";
    case "1":
      return "Cau Giay District";
    case "2":
      return "Hoan Kiem District";
    case "3":
      return "Dong Da District";
    case "4":
      return "Hai Ba Trung District";
    case "5":
      return "Ha Dong District";
    case "6":
      return "Long Bien District";
    case "7":
      return "Tay Ho District";
    default:
      return "Unknown";
  }
};
export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;

export const selectDistrict = [
  {
    label: "Ba Đinh District",
    value: EDistrict.BaDinh,
  },
  {
    label: "Cau Giay District",
    value: EDistrict.CauGiay,
  },
  {
    label: "Hoan Kiem District",
    value: EDistrict.HoanKiem,
  },
  {
    label: "Dong Da District",
    value: EDistrict.DongDa,
  },
  {
    label: "Hai Ba Trung District",
    value: EDistrict.HaiBaTrung,
  },
  {
    label: "Ha Dong District",
    value: EDistrict.HaDong,
  },
  {
    label: "Long Bien District",
    value: EDistrict.LongBien,
  },
  {
    label: "Tay Ho District",
    value: EDistrict.TayHo,
  },
];

export enum ECategory {
  BuaSang = "0",
  BuaTrua = "1",
  BuaToi = "2",
  Cafe = "3",
  AnVat = "4",
  Tra = "5",
  BanhTrang = "6",
  Ruou = "7",
  NemRan = "8",
  Bun = "9",
  Xien = "10",
  Che = "11",
  TrangMieng = "12",
  BanhMi = "13",
  NemCuon = "14",
  Com = "15",
  Lau = "16",
}

export const selectCategory = [
  {
    label: "Breakfast",
    value: ECategory.BuaSang,
  },
  {
    label: "Lunch",
    value: ECategory.BuaTrua,
  },
  {
    label: "Dinner",
    value: ECategory.BuaToi,
  },
  {
    label: "Dessert",
    value: ECategory.TrangMieng,
  },
  {
    label: "Rice",
    value: ECategory.Com,
  },
  {
    label: "Cafe",
    value: ECategory.Cafe,
  },
  {
    label: "Bread",
    value: ECategory.BanhMi,
  },
  {
    label: "Snack",
    value: ECategory.AnVat,
  },
  {
    label: "Tea",
    value: ECategory.Tra,
  },
  {
    label: "Rice Paper",
    value: ECategory.BanhTrang,
  },
  {
    label: "Noodles",
    value: ECategory.Bun,
  },
  {
    label: "Soup",
    value: ECategory.Che,
  },
  {
    label: "Spring Rolls",
    value: ECategory.NemCuon,
  },
  {
    label: "Fried Rolls",
    value: ECategory.NemRan,
  },
  {
    label: "Wine",
    value: ECategory.Ruou,
  },
  {
    label: "Fried",
    value: ECategory.Xien,
  },
  {
    label: "Hotpot",
    value: ECategory.Lau,
  },
];
