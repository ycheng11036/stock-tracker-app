"use client";

import React, { useState, useMemo, use } from "react";
import countryList from "react-select-country-list";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Label } from "../ui/label";
import { Control, Controller, FieldError } from "react-hook-form";
import { Button } from "../ui/button";
import Image from "next/image";
import { Chathura } from "next/font/google";
import { Check, ChevronsUpDown, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

type CountrySelectProps = {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
};

const CountrySelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const countries = useMemo(() => countryList().getData(), []);

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));

    return String.fromCodePoint(...codePoints);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="country-select-trigger"
        >
          {value ? (
            <span className="flex items-center gap-2">
              <span>{getFlagEmoji(value)}</span>
              <span>{countries.find((c) => c.value === value)?.label}</span>
            </span>
          ) : (
            "Select your country..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0 bg gray-800 border-gray-600"
        align="start"
      >
        <Command className="bg-gray-800 border-gray-600">
          <CommandInput
            placeholder="Search countries..."
            className="country-select-input"
          />
          <CommandEmpty className="country-select-empty">
            No country found.
          </CommandEmpty>
          <CommandList className="max-h-60 bg-gray-800 scrollbar-hide-default">
            <CommandGroup className="bg-gray-800">
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={`${country.label} ${country.value}`}
                  onSelect={() => {
                    onChange(country.value);
                    setOpen(false);
                  }}
                  className="country-select-item"
                >
                  <Check
                    className={
                      (cn("mr-2 h-4 w-4 text-yellow-500"),
                      value === country.value ? "opacity-100" : "opacity-0")
                    }
                  />
                  <span className="flex items-center gap-2">
                    <span>{getFlagEmoji(country.value)}</span>
                    <span>{country.label}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <CountrySelect value={field.value} onChange={field.onChange} />
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      <p className="text-xs text-gray-500">
        Help us show market data and news relevant to you.
      </p>
    </div>
  );
};

export default CountrySelectField;
