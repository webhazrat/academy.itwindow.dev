import { useContext } from "react";
import { UserProfileContext } from "../context/UserProfileContext";

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  return context;
}
