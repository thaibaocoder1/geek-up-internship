export const generateAvatarBaseName = (name: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&color=fff`;
};
