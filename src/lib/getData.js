import { APP_URL } from "./utils";

export const getCourses = async () => {
  const response = await fetch(
    `${APP_URL}/api/courses?sortBy=createdAt&sortOrder=asc`
  );
  const data = await response.json();
  if (response.ok) {
    return Promise.resolve(data.data);
  } else {
    return Promise.reject(data);
  }
};
