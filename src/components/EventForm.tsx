"use client";

import { DbEventWithApplications } from "@/types";
import { createEvent } from "@actions/events/createEvent";
import { deleteEvent } from "@actions/events/deleteEvent";
import OfficialNeededField from "@components/OfficialNeededField";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEvent } from "@lib/actions/events/updateEvent";
import { EVENT_LEVELS } from "@lib/const";
import formSchema from "@lib/schemas/events";
import { cn } from "@lib/utils";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { Switch } from "@ui/switch";
import { useToast } from "@ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type EventFormProps = {
  organizerId: string;
  action: "create" | "update";
  event?: DbEventWithApplications;
};

const EventForm = ({ organizerId, action, event }: EventFormProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      action === "update" && event
        ? {
            start: event.start,
            end: event.end,
            place: event.place,
            level: event.level.split("-"),
            hasJudge: event.hasJudge ? "true" : "false",
            hasCourseDesigner: event.hasCourseDesigner ? "true" : "false",
            hasSteward: event.hasSteward ? "true" : "false",
            hasTimeKeeper: event.hasTimeKeeper ? "true" : "false",
            isVisible: event.isVisible,
          }
        : {
            start: "",
            end: "",
            place: "",
            level: [],
            hasJudge: "false",
            hasCourseDesigner: "false",
            hasSteward: "false",
            hasTimeKeeper: "false",
            isVisible: true,
          },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      level: values.level.join("-"),
      hasJudge: values.hasJudge === "true",
      hasCourseDesigner: values.hasCourseDesigner === "true",
      hasSteward: values.hasSteward === "true",
      hasTimeKeeper: values.hasTimeKeeper === "true",
    };

    if (action === "update" && event) {
      try {
        await updateEvent(event.id, data);
        toast({
          description: `Votre concours a été mis à jour avec succès !`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: `${error}`,
        });
      }
    } else {
      try {
        await createEvent(organizerId, data);
        toast({
          description: `Votre concours a été créé avec succès !`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: `${error}`,
        });
      }
    }
    router.push("/dashboard");
  };

  const handleClickOnDeleteButton = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      toast({
        description: `Votre concours a été supprimé avec succès !`,
      });
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
          "w-full space-y-4 flex flex-col items-center",
          "md:space-y-8"
        )}
      >
        <FormField
          control={form.control}
          name="isVisible"
          render={({ field }) => (
            <FormItem className="w-full flex items-center space-y-0 space-x-2">
              <FormLabel>Visible pour les officiels ?</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
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
            name="end"
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
                {EVENT_LEVELS.map((item) => (
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
            "w-full flex flex-col gap-4 items-stretch",
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

        <div className={cn("w-full !mt-12 flex flex-col space-y-4")}>
          <Button size="lg" type="submit" className="font-bold">
            {action === "create"
              ? "Créer le concours"
              : "Mettre à jour le concours"}
          </Button>

          {action === "update" && event ? (
            <Button
              variant={"destructive"}
              onClick={() => handleClickOnDeleteButton(event.id)}
            >
              Supprimer le concours
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
