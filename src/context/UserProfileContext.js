import { createContext } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/utils";
import { useSession } from "next-auth/react";

export const UserProfileContext = createContext();

export function UserProfileProvider({ children }) {
  const { data: session } = useSession();
  const {
    data: userData,
    isLoading,
    mutate,
  } = useSWR(session ? "/api/user" : null, fetcher);
  return (
    <UserProfileContext.Provider
      value={{ user: userData?.data, isLoading, mutate }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}
