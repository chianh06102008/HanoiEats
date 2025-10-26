export interface IUserProfile {
  id?: string;
  phone: string;
  password: string;
  fullname: string;
  birthday: string;
  gender: EGender;
  bookmark: string[];
  avatarName?: string;
  avatarUrl?: string;
}

export enum EGender {
  M = "M",
  F = "F",
}
