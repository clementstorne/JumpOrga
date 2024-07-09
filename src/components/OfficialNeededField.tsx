import formSchema from "@lib/schemas/events";
import { capitalizeFirstLetter, cn } from "@lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { RadioGroup, RadioGroupItem } from "@ui/radio-group";
import { Control } from "react-hook-form";
import { z } from "zod";

type OfficialNeededFieldProps = {
  control: Control<z.infer<typeof formSchema>>;
  fieldName: keyof z.infer<typeof formSchema>;
  role: string;
};

const OfficialNeededField = ({
  control,
  fieldName,
  role,
}: OfficialNeededFieldProps) => {
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="ml-2">{capitalizeFirstLetter(role)}</FormLabel>
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
                  J&apos;ai besoin d&apos;un {role}
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel className="font-normal">
                  J&apos;ai déjà un {role}
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default OfficialNeededField;
