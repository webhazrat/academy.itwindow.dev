import { createContext } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/utils";
import { useSession } from "next-auth/react";

export const UserEnrollsContext = createContext();

export function UserEnrollsProvider({ children }) {
  const { data: session } = useSession();
  const {
    data: enrolls,
    isLoading,
    mutate: enrollsMutate,
  } = useSWR(session ? "/api/enrolls/userId" : null, fetcher);

  const enrollIds = enrolls?.data?.map((enroll) => enroll._id);
  const { data: payments, mutate: paymentsMutate } = useSWR(
    enrollIds?.length > 0
      ? `/api/payment/enroll?enrollId=${enrollIds.join(",")}`
      : null,
    fetcher
  );
  return (
    <UserEnrollsContext.Provider
      value={{
        enrollsData: enrolls?.data,
        paymentsData: payments?.data,
        isLoading,
        enrollsMutate,
        paymentsMutate,
      }}
    >
      {children}
    </UserEnrollsContext.Provider>
  );
}
