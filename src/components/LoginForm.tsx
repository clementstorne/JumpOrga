"use client";

import { checkIfUserEmailIsVerified } from "@/lib/actions/users/checkIfUserEmailIsVerified";
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
import { useToast } from "@ui/use-toast";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
});

type LoginFormProps = {
  className?: string;
};

const LoginForm = ({ className }: LoginFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const isEmailVerified = await checkIfUserEmailIsVerified(values.email);
      if (isEmailVerified) {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          callbackUrl: "/dashboard",
          redirect: false,
        });

        if (res && res.ok && res.url) {
          router.push(res?.url);
        } else {
          toast({
            variant: "destructive",
            description: "L'email et/ou le mot de passe sont incorrects",
          });
        }
      } else {
        toast({
          variant: "destructive",
          description:
            "Votre compte n'est pas encore activé. Veuillez vérifier vos emails et suivre le lien d'activation avant de vous connecter.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: `${error}`,
      });
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
        <div className={cn("text-center space-y-2", "md:text-justify")}>
          <h1 className="md:text-left">Bienvenue chez JumpOrga</h1>
          <p className=" text-foreground">
            Connectez-vous à votre compte pour accéder à toutes les
            fonctionnalités de notre plateforme de gestion de concours de saut
            d&apos;obstacles.
          </p>
        </div>

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
                <Input
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-end">
          <Link href={"/forgot-password"} className="link text-base">
            Mot de passe oublié ?
          </Link>
        </div>

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button type="submit" size="lg">
            Se connecter
          </Button>
          <Link
            href={"/signup"}
            className={buttonVariants({ variant: "outline" })}
          >
            Créer un compte
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
