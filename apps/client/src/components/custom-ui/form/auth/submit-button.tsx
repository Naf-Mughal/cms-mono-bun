import { useStore } from "@tanstack/react-form";
import { useFormContext } from "..";
import { Button } from "@/components/ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
};

export const AuthSubmitButton = ({ children }: SubmitButtonProps) => {
  const form = useFormContext();

  const [isSubmitting, canSubmit] = useStore(form.store, (state) => [
    state.isSubmitting,
    state.canSubmit,
  ]);

  return (
    <Button type="submit" className="w-full h-12 bg-[#09B96D] hover:bg-[#09B96D]/90 hover:cursor-pointer disabled:cursor-not-allowed" disabled={isSubmitting || !canSubmit}>
      {children}
    </Button>
  );
};
