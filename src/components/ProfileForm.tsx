"use client";

import { DbOfficial, DbUser } from "@/types";
import { updateProfile, updateUserData } from "@actions/users/updateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { COURSE_DESIGNER_LEVELS, JUDGE_LEVELS } from "@lib/const";
import formSchema from "@lib/schemas/profile";
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
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ProfileFormProps = {
  user: Pick<DbUser, "id" | "firstname" | "lastname" | "email">;
  official: DbOfficial;
};

const ProfileForm = ({ user, official }: ProfileFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isJudge: official.isJudge ? "true" : "false",
      isCourseDesigner: official.isCourseDesigner ? "true" : "false",
      isSteward: official.isSteward ? "true" : "false",
      isTimeKeeper: official.isTimeKeeper ? "true" : "false",
    },
  });

  const [showJudgeLevel, setShowJudgeLevel] = useState(official.isJudge);
  const [showCourseDesignerLevel, setShowCourseDesignerLevel] = useState(
    official.isCourseDesigner
  );
  const [showStewardLevel, setShowStewardLevel] = useState(official.isSteward);

  useEffect(() => {
    setShowJudgeLevel(form.watch("isJudge") === "true");
  }, [form.watch("isJudge")]);

  useEffect(() => {
    setShowCourseDesignerLevel(form.watch("isCourseDesigner") === "true");
  }, [form.watch("isCourseDesigner")]);

  useEffect(() => {
    setShowStewardLevel(form.watch("isSteward") === "true");
  }, [form.watch("isSteward")]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      isJudge: values.isJudge === "true",
      judgeLevel:
        values.isJudge === "true" && values.judgeLevel
          ? values.judgeLevel
          : null,
      isCourseDesigner: values.isCourseDesigner === "true",
      courseDesignerLevel:
        values.isCourseDesigner && values.courseDesignerLevel
          ? values.courseDesignerLevel
          : null,
      isSteward: values.isSteward === "true",
      stewardLevel:
        values.isSteward === "true" && values.stewardLevel
          ? values.stewardLevel
          : null,
      isTimeKeeper: values.isTimeKeeper === "true",
    };

    const userDataToUpdate = _.pick(data, ["firstname", "lastname", "email"]);
    const officialProfileToUpdate = _.pick(data, [
      "isJudge",
      "judgeLevel",
      "isCourseDesigner",
      "courseDesignerLevel",
      "isSteward",
      "stewardLevel",
      "isTimeKeeper",
    ]);

    if (
      data.firstname !== user.firstname ||
      data.lastname !== user.lastname ||
      data.email !== user.email
    ) {
      await updateUserData(user.id, userDataToUpdate);
    }

    await updateProfile(official.id, officialProfileToUpdate);

    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full space-y-4 flex flex-col items-center",
          "md:space-y-8"
        )}
      >
        <div
          className={cn(
            "w-full flex flex-col gap-4",
            "md:grid md:grid-cols-2 md:gap-8"
          )}
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
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
                  <Input type="text" {...field} />
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
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div
          className={cn(
            "w-full flex flex-col gap-4",
            "md:grid md:grid-cols-2 md:gap-8"
          )}
        >
          <FormField
            control={form.control}
            name="isJudge"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="ml-2">Juge</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                    className={cn(
                      "border border-primary bg-background rounded-lg px-4 py-2",
                      "flex flex-col -space-y-1"
                    )}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Je ne suis pas juge
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Je suis juge
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showJudgeLevel ? (
            <FormField
              control={form.control}
              name="judgeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau de juge</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JUDGE_LEVELS.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </div>

        <div
          className={cn(
            "w-full flex flex-col gap-4",
            "md:grid md:grid-cols-2 md:gap-8"
          )}
        >
          <FormField
            control={form.control}
            name="isCourseDesigner"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="ml-2">Chef de piste</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                    className={cn(
                      "border border-primary bg-background rounded-lg px-4 py-2",
                      "flex flex-col -space-y-1"
                    )}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Je ne suis pas chef de piste
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Je suis chef de piste
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showCourseDesignerLevel ? (
            <FormField
              control={form.control}
              name="courseDesignerLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau de chef de piste</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COURSE_DESIGNER_LEVELS.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </div>

        <div
          className={cn(
            "w-full flex flex-col gap-4",
            "md:grid md:grid-cols-2 md:gap-8"
          )}
        >
          <FormField
            control={form.control}
            name="isSteward"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="ml-2">Commissaire au paddock</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                    className={cn(
                      "border border-primary bg-background rounded-lg px-4 py-2",
                      "flex flex-col -space-y-1"
                    )}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Je ne suis pas commissaire au paddock
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Je suis commissaire au paddock
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showStewardLevel ? (
            <FormField
              control={form.control}
              name="stewardLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau de commissaire au paddock</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COURSE_DESIGNER_LEVELS.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </div>

        <div
          className={cn(
            "w-full flex flex-col gap-4",
            "md:grid md:grid-cols-2 md:gap-8"
          )}
        >
          <FormField
            control={form.control}
            name="isTimeKeeper"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="ml-2">Chronométreur</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                    className={cn(
                      "border border-primary bg-background rounded-lg px-4 py-2",
                      "flex flex-col -space-y-1"
                    )}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Je ne suis pas chronométreur
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Je suis chronométreur
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className={cn("w-full !mt-12 flex flex-col")}>
          <Button size="lg" type="submit" className="font-bold">
            Mettre à jour le profil
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
