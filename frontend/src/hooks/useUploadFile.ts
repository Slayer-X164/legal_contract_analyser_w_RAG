import { useMutation } from "@tanstack/react-query";
import { useResultStore } from "#/store/useStore";
import { useNavigate } from "@tanstack/react-router";

export const useUploadFile = () => {
  const setResult = useResultStore((s) => s.setResult);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formdata: FormData) => {
      const res = await fetch("http://127.0.0.1:8000/api/analyse", {
        method: "POST",
        body: formdata,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail);
      }

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