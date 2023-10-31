import { createContext } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/utils";

export const UserEnrollsContext = createContext();

export function UserEnrollsProvider({ children }) {
  const { data: enrollsData, isLoading } = useSWR(
    "/api/enrolls/userId",
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
