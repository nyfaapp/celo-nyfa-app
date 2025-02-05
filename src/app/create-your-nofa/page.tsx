"use client";

import { BodyLogoCreateYourNoFA } from "@/components/svg-icons/logos/body-logo-create-your-nofa";
import { BodyLogoNotConnected } from "@/components/svg-icons/logos/body-logo-not-connected";
import {
  Button,
  Text,
  Flex,
  Box,
  createListCollection,
  Stack,
} from "@chakra-ui/react";
// import html2canvas from "html2canvas";
// import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  cryptocurrency: z.string({ message: "Crypto is required" }).array(),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateYourNoFA() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <>
      <Flex
        // ref={flexRef}
        justifyContent={"start"}
        alignItems={"center"}
        flexDirection={"column"}
        h={"75vh"}
      >
        <Text
          color={"#0F1C33"}
          fontSize={"24px"}
          fontWeight={"bold"}
          my={8}
          mx={8}
        >
          Create* your NoFA
        </Text>
        <BodyLogoCreateYourNoFA />

        <Text
          color={"#0F1C33"}
          fontSize={"14px"}
          fontWeight={"normal"}
          mt={8}
        >
          Select and create
        </Text>

        <Box my={8}>
          <form onSubmit={onSubmit}>
            <Stack gap="4" align="center">
              <Field
                invalid={!!errors.cryptocurrency}
                errorText={errors.cryptocurrency?.message}
                width="320px"
              >
                <Controller
                  control={control}
                  name="cryptocurrency"
                  render={({ field }) => (
                    <SelectRoot
                      name={field.name}
                      value={field.value}
                      bgColor={"#0F1C33"}
                      borderRadius={10}
                      onValueChange={({ value }) => field.onChange(value)}
                      onInteractOutside={() => field.onBlur()}
                      collection={cryptocurrencies}
                    >
                      <SelectTrigger>
                        <SelectValueText placeholder="Select crypto" ml={3} />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptocurrencies.items.map((movie) => (
                          <SelectItem item={movie} key={movie.value}>
                            {movie.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  )}
                />
              </Field>

              <Button
                bgColor={"#FDBB23"}
                borderRadius={15}
                mt={4}
                w={"4/6"}
                type="submit"
              >
                <Text color={"#0F1C33"} fontSize={"14px"} fontWeight={"normal"}>
                  Create
                </Text>
              </Button>
            </Stack>
          </form>
        </Box>
      </Flex>

      <Box bg="#0F1C33" position="absolute" bottom="0" right="0" py={4}>
        <Text
          color={"white"}
          fontSize={"14px"}
          fontWeight={"normal"}
          mx={16}
          textAlign={"center"}
        >
          If you *create, you will be redirected to a downloadable infographic.
        </Text>
      </Box>
    </>
  );
}

const cryptocurrencies = createListCollection({
  items: [
    { label: "Bitcoin", value: "bitcoin" },
    { label: "Ethereum", value: "ethereum" },
    { label: "Ripple", value: "xrp" },
  ],
});
