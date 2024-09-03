import { ResponseStatus } from "@/app/(auth)/register/actions/postCreateRegisterUser"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseErrorResponseMessage(errorMsg: string): ResponseStatus {
  const response = JSON.parse(JSON.stringify(errorMsg));
  return response
}
