import { useMutation } from "@tanstack/react-query";
import { useResultStore } from "#/store/useStore";
import { useNavigate } from "@tanstack/react-router";

export const useUploadFile = () => {
  const setResult = useResultStore((s) => s.setResult);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formdata: FormData) => {
      const res = await fetch("/api/analyse", {
        method: "POST",
        body: formdata,
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();

      return data;
    },

    onSuccess: (data) => {
      setResult(data);
      navigate({ to: "/results" });
    },

    onError: (err: any) => {
      console.error(err.message);
    },
  });
};