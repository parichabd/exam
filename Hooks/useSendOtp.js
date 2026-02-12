"use client";
import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "@/Services/Auth";

export function useSendOtp() {
  return useMutation({
    mutationFn: (mobile) => sendOtp(mobile),
  });
}
