import { useContext } from "react";
import { CoursesContext } from "../context/CoursesContext";

export function useCourses() {
  const context = useContext(CoursesContext);
  return context;
}
