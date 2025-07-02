import React, { useState } from 'react'
import {CalendarIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";


function formatDate(date) {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}

const Dates = () => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(date);
    const [value, setValue] = useState(formatDate(date));

    return (
        <div className='relative flex gap-2'>
            <Input
                id="date"
                value={value}
                placeholder="June 01, 2025"
                className="pl-10 border border-gray-400 rounded px-3 py-2 text-sm w-full"
                onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    setValue(e.target.value);
                    if (isValidDate(newDate)) {
                    setDate(newDate);
                    setMonth(newDate);
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                    }
                }}
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">Select date</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setValue(formatDate(selectedDate));
                        setOpen(false);
                    }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Dates
