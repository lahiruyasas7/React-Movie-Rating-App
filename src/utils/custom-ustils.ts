// Use this to create the image's object URL
export const createImageObjectURL = (file?: File | null): string | undefined => {
  if (!file) return undefined;
  return URL.createObjectURL(file);
};