import { toast } from "sonner";

export const copy = (
  text: string,
  label: string,
  setter?: (v: boolean) => void,
) => {
  navigator.clipboard.writeText(text);
  toast.success(`${label} copied`);

  if (setter) {
    setter(true);
    setTimeout(() => setter(false), 2000);
  }
};
