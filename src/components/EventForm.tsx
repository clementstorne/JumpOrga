"use client";

import OfficialNeededField from "@components/OfficialNeededField";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEvent } from "@lib/actions/events/createEvent";
import { LEVELS } from "@lib/const";
import formSchema from "@lib/schemas/events";
import { cn } from "@lib/utils";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EventForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: "",
      finish: "",
      place: "",
      level: [],
      hasJudge: "false",
      hasCourseDesigner: "false",
      hasSteward: "false",
      hasTimeKeeper: "false",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const data = {
      ...values,
      level: values.level.join("-"),
      hasJudge: values.hasJudge === "true",
      hasCourseDesigner: values.hasCourseDesigner === "true",
      hasSteward: values.hasSteward === "true",
      hasTimeKeeper: values.hasTimeKeeper === "true",
    };
    await createEvent(data);
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
            name="start"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date de début du concours</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="finish"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date de fin du concours</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Lieu du concours</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="level"
          render={() => (
            <FormItem className="w-full">
              <FormLabel>Niveau du concours</FormLabel>
              <div
                className={cn(
                  "border border-primary bg-background rounded-lg p-4",
                  "px-4 py-2 gap-x-8 gap-y-1",
                  "md:grid md:grid-cols-2",
                  "lg:grid-cols-4"
                )}
              >
                {LEVELS.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="level"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.label)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.label])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.label
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />

        <div
          className={cn(
            "w-full flex flex-col gap-4",
            "md:grid md:grid-cols-2 md:gap-8"
          )}
        >
          <OfficialNeededField
            control={form.control}
            fieldName="hasJudge"
            role="juge"
          />

          <OfficialNeededField
            control={form.control}
            fieldName="hasCourseDesigner"
            role="chef de piste"
          />

          <OfficialNeededField
            control={form.control}
            fieldName="hasSteward"
            role="commissaire au paddock"
          />

          <OfficialNeededField
            control={form.control}
            fieldName="hasTimeKeeper"
            role="chronométreur"
          />
        </div>

        <div className={cn("w-full !mt-12 flex flex-col")}>
          <Button size="lg" type="submit" className="font-bold">
            Créer le concours
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
