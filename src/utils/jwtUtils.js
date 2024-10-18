import { jwtDecode } from "jwt-decode";

export const getNicknameFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken?.nickname;
  } catch (error) {
    return null;
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  return token;
};
