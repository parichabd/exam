import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "@/Services/Auth";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: (mobile) => sendOtp(mobile),
  });
};