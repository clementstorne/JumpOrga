"use client";

import { changePassword } from "@actions/users/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@lib/utils";
import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { useToast } from "@ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    password: z
      .string({
        required_error: "Ce champ est requis",
      })
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .refine(
        (value) => /(?=.*\d)/.test(value),
        "Le mot de passe doit contenir au moins un chiffre"
      )
      .refine(
        (value) => /(?=.*[a-z])/.test(value),
        "Le mot de passe doit contenir au moins une minuscule"
      )
      .refine(
        (value) => /(?=.*[A-Z])/.test(value),
        "Le mot de passe doit contenir au moins une majuscule"
      )
      .refine(
        (value) => /(?=.*[\W|_])/.test(value),
        "Le mot de passe doit contenir au moins un caractère spécial"
      ),
    confirmPassword: z.string().min(1, "Ce champ est requis"),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Les mots de passe ne sont pas identiques",
      path: ["confirmPassword"],
    }
  );

type ResetPasswordFormProps = {
  resetPasswordToken: string;
  className?: string;
};

const ResetPasswordForm = ({
  resetPasswordToken,
  className,
}: ResetPasswordFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { password } = values;
    try {
      toast({
        description: "Votre mot de passe a été changé avec succès.",
      });
      await changePassword(resetPasswordToken, password);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full p-8 space-y-8 flex flex-col items-center",
          className
        )}
      >
        <div className={cn("w-full text-center space-y-2", "md:text-justify")}>
          <h1 className="md:text-left">Changer votre mot de passe</h1>
          <p className=" text-foreground">
            Veuillez entrer votre nouveau mot de passe ci-dessous et
            confirmez-le pour changer votre mot de passe.
          </p>
        </div>

        {errorMessage && (
          <p className="text-sm font-bold text-destructive">{errorMessage}</p>
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirmer le mot de passe</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button type="submit" size="lg">
            Changer le mot de passe
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
