import { createContext } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/utils";

export const CoursesContext = createContext();

export function CoursesContextProvider({ children }) {
  const {
    data: courses,
    isLoading,
    mutate,
  } = useSWR(`/api/courses?sortBy=order&sortOrder=asc`, fetcher);

  return (
    <CoursesContext.Provider
      value={{
        courses: courses?.data,
        isLoading,
        mutate,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}
