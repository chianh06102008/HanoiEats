// src/utils/image.ts
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { firebaseStorage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";

export async function ensureSmallImage(
  uri: string,
  maxW = 1200,
  maxBytes = 4 * 1024 * 1024
) {
  // 1) nếu file < maxBytes thì thôi
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (info.exists && typeof info.size === "number" && info.size < maxBytes)
      return uri;
  } catch {}

  // 2) resize & nén lại
  const out = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: maxW } }],
    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
  );

  // 3) nếu vẫn lớn, giảm thêm
  try {
    const info2 = await FileSystem.getInfoAsync(out.uri);
    if (
      info2.exists &&
      typeof info2.size === "number" &&
      info2.size > maxBytes
    ) {
      const out2 = await ImageManipulator.manipulateAsync(
        out.uri,
        [{ resize: { width: Math.round(maxW * 0.75) } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return out2.uri;
    }
  } catch {}
  return out.uri;
}

export const uploadImage = async (uri: string, folder = "comments") => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  let res: Response;
  try {
    res = await fetch(uri, { signal: controller.signal });
  } catch (e: any) {
    clearTimeout(timer);
    if (e?.name === "AbortError")
      throw new Error("Tải ảnh quá lâu, vui lòng thử lại");
    throw e;
  }
  clearTimeout(timer);

  if (!res.ok) throw new Error(`Tải ảnh thất bại: ${res.status}`);

  const blob: Blob = await res.blob();
  const contentType = (blob as any)?.type || "image/jpeg";
  const ext = (contentType.split("/")[1] || "jpg").split(";")[0] || "jpg";

  const clean = (s: string) => s.replace(/^\/+|\/+$/g, "");
  const filename = `${uuid.v4()}.${ext}`;
  const fullPath = `${clean(folder)}/${filename}`;

  const fileRef = ref(firebaseStorage, fullPath);
  await uploadBytes(fileRef, blob, { contentType });

  const avatarUrl = await getDownloadURL(fileRef);
  return { avatarName: filename, avatarUrl, path: fullPath };
};
