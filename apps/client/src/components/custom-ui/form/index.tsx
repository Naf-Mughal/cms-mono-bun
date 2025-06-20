import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { AuthTextField } from "./auth/text-field";
import { CheckboxField } from "./checkbox-field";
import { SelectField } from "./home/select-field";
import { AuthSubmitButton } from "./auth/submit-button";
import { AuthPasswordField } from "./auth/password-field";
import { TextField } from "./home/text-field";
import { RadioGroupField } from "./home/radio-group";
import { DatePicker } from "./home/date-picker";
import { ListField } from "./home/list-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    AuthTextField,
    CheckboxField,
    SelectField,
    AuthPasswordField,
    RadioGroupField,
    TextField,
    DatePicker,
    ListField
  },
  formComponents: {
    AuthSubmitButton,

  },
  fieldContext,
  formContext,
});
