// TODO: Change your CLOUD_NAME and UPLOAD_PRESET
const CLOUD_NAME = "dynr4mqym";
const UPLOAD_PRESET = "q4f5imix";

export async function uploadAvatarRaw(
  fileUri: string,
  mime = "image/jpeg",
  folder = "avatars"
) {
  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const data = new FormData();
  // KHÔNG set headers Content-Type thủ công
  // @ts-ignore (React Native FormData file)
  data.append("file", { uri: fileUri, name: "avatar", type: mime });
  data.append("upload_preset", UPLOAD_PRESET);
  data.append("folder", folder);

  const res = await fetch(endpoint, { method: "POST", body: data });

  if (!res.ok) {
    const text = await res.text(); // giúp debug khi preset sai/endpoint sai
    throw new Error(`Cloudinary ${res.status}: ${text}`);
  }

  const json = await res.json();
  // Trả về URL gốc và public_id
  return { url: json.secure_url as string, publicId: json.public_id as string };
}
