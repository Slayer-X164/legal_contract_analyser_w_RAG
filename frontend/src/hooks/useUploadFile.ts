import { useMutation } from "@tanstack/react-query";
import { useResultStore } from "#/store/useStore";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner"
export const useUploadFile = () => {
  const setResult = useResultStore((s) => s.setResult);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (formdata: FormData) => {
      const isDev = import.meta.env.DEV;
      const url = isDev ? import.meta.env.VITE_BACKEND_URL : "/api/v1/analyse"
      const res = await fetch(url, {
        method: "POST",
        body: formdata,
      });

      if (!res.ok) {
        throw new Error(`${res.status == 413 ? "file bigger than 3MB!" : res.statusText}`);
      }
      const data = await res.json();

      return data;
    },

    onSuccess: (data) => {
      setResult(data);
      navigate({ to: "/results" });
      toast.success("Contract analysed successfully")
    },

    onError: (err: any) => {
      toast.error(err.message)
    },
  });
};