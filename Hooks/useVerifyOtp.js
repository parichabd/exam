import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "@/Services/Auth";

export const useVerifyOtp = () => {
  // فقط تابع mutationFn بده، بدون هیچ پارامتر
  return useMutation({
    mutationFn: ({ mobile, otp }) => verifyOtp({ mobile, otp }),
  });
};