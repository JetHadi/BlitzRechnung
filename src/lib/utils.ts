import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { COMMON_UNITS } from "./schema/units";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


// Create a reverse mapping
const REVERSE_UNITS = Object.entries(COMMON_UNITS).reduce((acc, [code, label]) => {
    acc[label] = code;
    return acc;
}, {} as Record<string, string>);

// Function to convert German label to code
export function getUnitCode(germanLabel: string): string {
    return REVERSE_UNITS[germanLabel] || germanLabel;
}


export function addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}