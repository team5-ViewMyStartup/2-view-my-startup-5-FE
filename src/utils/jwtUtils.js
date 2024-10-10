import { jwtDecode } from "jwt-decode";

export const getNicknameFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("로그인 상태가 아닙니다.");
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken?.nickname;
  } catch (error) {
    throw new Error("유효하지 않은 토큰입니다.");
  }
};

export const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("로그인 상태가 아닙니다.");
  }

  return token;
};
