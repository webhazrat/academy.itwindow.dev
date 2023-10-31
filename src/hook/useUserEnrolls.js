import { useContext } from "react";
import { UserEnrollsContext } from "../context/UserEnrollsContext";

export function useUserEnrolls() {
  const context = useContext(UserEnrollsContext);
  return context;
}
