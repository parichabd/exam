import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "@/Services/Auth";

export const useVerifyOtp = () => {
  return useMutation(({ mobile, otp }) => verifyOtp({ mobile, otp }));
};