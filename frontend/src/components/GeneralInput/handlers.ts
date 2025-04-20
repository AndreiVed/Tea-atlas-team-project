export const isEmailCorrect = (value: string): boolean => {
  if (!value || value.length > 254) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};
