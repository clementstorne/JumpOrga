"use client";

import { getAllVisibleEvents } from "@/lib/actions/events/getAllVisibleEvents";
import { searchEvents } from "@actions/events/searchEvents";
import { zodResolver } from "@hookform/resolvers/zod";
import { EVENT_LEVELS } from "@lib/const";
import formSchema from "@lib/schemas/searchEvents";
import useEventStore from "@lib/store/eventStore";
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
import { useForm } from "react-hook-form";
import { z } from "zod";

const SearchBar = () => {
  const { setEvents } = useEventStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: "",
      end: "",
      place: "",
      level: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = {
      ...values,
      level: values.level.length > 0 ? values.level.join("-") : "",
    };

    const events = await searchEvents(data);
    setEvents(events);
  };

  const resetFilters = async () => {
    form.reset();
    const events = await getAllVisibleEvents();
    setEvents(events);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "w-full flex flex-col items-center gap-2",
          "md:flex-row md:gap-4 md:items-stretch"
        )}
      >
        <div className={cn("w-full flex flex-col gap-2", "md:justify-between")}>
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

        <div
          className={cn(
            "w-full flex flex-col gap-4",
            "md:justify-between md:items-center"
          )}
        >
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
                    "lg:grid lg:grid-cols-2"
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
                                    ? field.onChange([
                                        ...field.value,
                                        item.label,
                                      ])
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

          <Button type="submit" className="w-full font-bold">
            Appliquer les filtres
          </Button>

          <Button variant={"outline"} onClick={resetFilters} className="w-full">
            Effacer les filtres
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchBar;
