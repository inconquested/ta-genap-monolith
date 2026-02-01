"use client"

import { format, set } from "date-fns"
import { ChevronDownIcon, Clock } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"

import { InputGroupInput, InputGroupAddon, InputGroup } from "./input-group"

import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerTimeProps {
  label?: string
  // Changed: Now returns a string (or undefined) to the parent
  onChange?: (dateTime: string | undefined) => void 
  value?: Date
}

export function DatePickerTime({ 
  label = "Select Date & Time", 
  onChange, 
  value 
}: DatePickerTimeProps) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(value)
  const [time, setTime] = React.useState<string>("10:30:00")

  const handleUpdate = (newDate: Date | undefined, newTime: string) => {
    if (!newDate) {
      onChange?.(undefined)
      return
    }

    // 1. Parse the time string
    const [hours, minutes, seconds] = newTime.split(":").map(Number)
    
    // 2. Combine into a single Date object
    const combinedDate = set(newDate, { 
      hours: hours || 0, 
      minutes: minutes || 0, 
      seconds: seconds || 0,
      milliseconds: 0 
    })

    // 3. Format it specifically for your backend: Y-m-d H:i:s
    const formattedString = format(combinedDate, "yyyy-MM-dd HH:mm:ss")

    // 4. Return the string to the parent instead of the Date object
    onChange?.(formattedString)
  }

  return (
    <FieldGroup className="mx-auto max-w-sm flex-col gap-3 items-start">
      <Field>
        <FieldLabel>{label}</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-mono"
            >
              {date ? format(date, "yyyy-MM-dd") : "Pilih Tanggal"}
              <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(selectedDate) => {
                setDate(selectedDate)
                handleUpdate(selectedDate, time)
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>

      <Field className="w-36">
        <FieldLabel className="sr-only">Time</FieldLabel>
        <InputGroup>
          <InputGroupInput
            type="time"
            id="time-picker-optional"
            step="1"
            defaultValue={time}
            className="bg-background appearance-none"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newTime = e.target.value
              setTime(newTime)
              handleUpdate(date, newTime)
            }}
          />
          <InputGroupAddon>
            <Clock className="h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </FieldGroup>
  )
}