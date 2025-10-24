
export const calculateRemainingSeconds = (expiresAt) => {
  if (!expiresAt) return 0;
  const currentTime = new Date();
  const expiryTime = new Date(expiresAt);
  const diffInMs = expiryTime - currentTime;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  return diffInSeconds > 0 ? diffInSeconds : 0;
};

export const getToken = () => {
  try {
    const persistRoot = localStorage.getItem('token');
    return persistRoot;
  } catch (error) {
    return null;
  }
};
