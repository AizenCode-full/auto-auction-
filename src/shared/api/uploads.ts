
import axios from "axios";

const IMGBB_API_URL = "https://api.imgbb.com/1/upload";
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export const uploadImage = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error("Файл изображения не выбран");
  }

  if (!IMGBB_API_KEY) {
    throw new Error(
      "VITE_IMGBB_API_KEY не обнаружен в .env"
    );
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Можно загружать только изображения");
  }

  if (file.size > 32 * 1024 * 1024) {
    throw new Error(
      `Файл "${file.name}" превышает максимальный размер 32 MB`
    );
  }

  const formData = new FormData();

  formData.append("key", IMGBB_API_KEY);
  formData.append("image", file);

  try {
    const response = await axios.post(
      IMGBB_API_URL,
      formData
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.error?.message ||
        "ImgBB не смог загрузить изображение"
      );
    }

    return response.data.data.url;
  } catch (error: unknown) {
    console.error("Ошибка загрузки изображения:", error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error?.message ||
        "Не удалось загрузить изображение"
      );
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Не удалось загрузить изображение");
  }
};

export const uploadImages = async (
  files: File[]
): Promise<string[]> => {
  if (!files || files.length === 0) {
    return [];
  }

  return Promise.all(
    files.map((file) => uploadImage(file))
  );
};

export const uploadProductImage = async (
  file: File
): Promise<string> => {
  return uploadImage(file);
};

