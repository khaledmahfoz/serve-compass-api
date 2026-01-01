export const constructImageFullPath = (
  imagePath: string | null,
): string | null => {
  return imagePath
    ? `${process.env.MEDIA_URL}/${process.env.MEDIA_FOLDER}/${imagePath}`
    : null;
};
