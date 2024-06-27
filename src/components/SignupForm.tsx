"use client";

import { checkIfUserExists } from "@actions/users/checkIfUserExists";
import { signUp } from "@actions/users/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@lib/utils";
import { Button, buttonVariants } from "@ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { useToast } from "@ui/use-toast";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserRoleEnum = z.enum(["official", "organizer"]);
type UserRoleEnum = z.infer<typeof UserRoleEnum>;

const formSchema = z
  .object({
    firstname: z
      .string()
      .min(1, {
        message: "Ce champ est requis",
      })
      .refine(
        (value) => /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(value),
        "Le prénom doit commencer par une lettre majuscule, suivie de lettres minuscules, d'espaces, de tirets, d'apostrophes ou de points. Les caractères spéciaux ne sont pas autorisés."
      ),
    lastname: z
      .string()
      .min(1, {
        message: "Ce champ est requis",
      })
      .refine(
        (value) => /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(value),
        "Le prénom doit commencer par une lettre majuscule, suivie de lettres minuscules, d'espaces, de tirets, d'apostrophes ou de points. Les caractères spéciaux ne sont pas autorisés."
      ),
    email: z
      .string()
      .min(1, {
        message: "Ce champ est requis",
      })
      .email({
        message: "Cet email n'est pas valide",
      }),
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
    confirmPassword: z
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
    role: UserRoleEnum,
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

type SignupFormProps = {
  className?: string;
};

const SignupForm = ({ className }: SignupFormProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "official",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email } = values;

    try {
      const userAlreadyExists = await checkIfUserExists(email);

      if (userAlreadyExists) {
        setErrorMessage(`L'email ${email} est déjà utilisé`);
        return;
      } else {
        toast({
          title: "Bienvenue chez JumpOrga !",
          description: "Votre compte a été créé avec succès.",
        });
        await signUp(values);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full p-8 bg-orange-3 rounded-lg space-y-8 flex flex-col items-center",
          className
        )}
      >
        <div className={cn("text-center space-y-2", "md:text-justify")}>
          <h1 className="md:text-left">Créer un compte JumpOrga</h1>
          <p className=" text-foreground">
            Rejoignez notre communauté pour organiser ou participer à des
            concours de saut d&apos;obstacles. Remplissez le formulaire
            ci-dessous pour créer votre compte.
          </p>
        </div>

        {errorMessage && (
          <p className="text-sm font-bold text-red-700">{errorMessage}</p>
        )}

        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input autoComplete="given-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input autoComplete="family-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="w-full space-y-3">
              <FormLabel className="ml-2">Rôle</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className={cn(
                    "flex flex-col",
                    "md:flex-row md:justify-around"
                  )}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="official" />
                    </FormControl>
                    <FormLabel className="font-normal">Officiel</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="organizer" />
                    </FormControl>
                    <FormLabel className="font-normal">Organisateur</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button type="submit" size="lg">
            Créer mon compte
          </Button>
          <Link
            href={"/login"}
            className={buttonVariants({ variant: "outline" })}
          >
            J&apos;ai déjà un compte
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
