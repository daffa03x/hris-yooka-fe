import { getToken } from "./token";

export function checkAuth() {
  if (typeof window !== "undefined") {
    const token = getToken();
    return token ?? null;
  }
  return null;
}
