import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { createElement, useState } from "react";
import { Box } from "../ui/box";
import FormControl from "@mui/material/FormControl";

type PasswordFieldProps = {
  name?: string;
  placeholder?: string;
  description?: string | JSX.Element;
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  isRequired?: boolean;
  form: any;
};

export function PasswordField({
  name = "password",
  placeholder = "Enter password",
  description,
  label,
  labelClassName,
  isRequired,
  form
}: PasswordFieldProps) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelClassName}>
            {label}
            {isRequired && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            <Box className="relative">
              <Input
                {...field}
                type={passwordVisibility ? "text" : "password"}
                autoComplete="on"
                placeholder={placeholder}
                className={`pr-12 ${form.getFieldState(name).error && "text-destructive"}`}
              />
              <Box
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
              >
                {createElement(passwordVisibility ? EyeOffIcon : EyeIcon, {
                  className: "h-6 w-6",
                })}
              </Box>
            </Box>
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}