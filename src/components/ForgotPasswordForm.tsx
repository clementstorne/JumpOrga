"use client";

import { resetPassword } from "@actions/users/resetPassword";
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

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .email({
      message: "Cet email n'est pas valide",
    }),
});

type ForgotPasswordFormProps = {
  className?: string;
};

const ForgotPasswordForm = ({ className }: ForgotPasswordFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email } = values;
    try {
      toast({
        description:
          "Nous vous avons envoyé un email avec un lien pour réinitialiser votre mot de passe. Veuillez vérifier votre boîte de réception et votre dossier de courrier indésirable.",
      });
      await resetPassword(email);
      router.push("/login");
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
        <div
          className={cn("min-w-full text-center space-y-2", "md:text-justify")}
        >
          <h1 className="md:text-left">Réinitialiser votre mot de passe</h1>
          <p className=" text-foreground">
            Veuillez entrer votre adresse email ci-dessous. Nous vous enverrons
            un lien pour réinitialiser votre mot de passe. Assurez-vous de
            vérifier votre boîte de réception et votre dossier de courrier
            indésirable.
          </p>
        </div>

        {errorMessage && (
          <p className="text-sm font-bold text-destructive">{errorMessage}</p>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button type="submit" size="lg">
            Envoyer le lien de réinitialisation
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
