import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isActive = (path, href) => {
  return path == href ? true : false;
};

export const APP_URL = "http://localhost:3000";

export const fetcher = async (...args) => {
  return fetch(...args).then((res) => res.json());
};
