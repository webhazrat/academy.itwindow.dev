import { createContext } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/utils";
import { useSession } from "next-auth/react";

export const UserEnrollsContext = createContext();

export function UserEnrollsProvider({ children }) {
  const { data: session } = useSession();
  const { data: enrollsData, isLoading } = useSWR(
    session ? "/api/enrolls/userId" : null,
    fetcher
  );
  return (
    <UserEnrollsContext.Provider
      value={{ enrolls: enrollsData?.data, isLoading }}
    >
      {children}
    </UserEnrollsContext.Provider>
  );
}
