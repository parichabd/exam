import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/Services/Auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: ({ name, mobile }) => registerUser({ name, mobile }),
  });
};