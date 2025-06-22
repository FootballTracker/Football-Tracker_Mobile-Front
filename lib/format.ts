import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export function formatDate(dateISO: string, fourDigitYear: boolean = true, changeTimezone: boolean = true): string {

    if(!(dateISO.endsWith('Z'))) dateISO = dateISO.concat('Z');

    const timeZone = changeTimezone ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';
    const parsedDate = parseISO(dateISO);

    return fourDigitYear ? formatInTimeZone(parsedDate, timeZone, 'dd/MM/yyyy') : formatInTimeZone(parsedDate, timeZone, 'dd/MM/yy');
    
}

export function formatTime(dateISO: string, changeTimezone: boolean = true): string {
    
    if(!(dateISO.endsWith('Z'))) dateISO = dateISO.concat('Z');

    const timeZone = changeTimezone ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';
    const parsedDate = parseISO(dateISO);

    return formatInTimeZone(parsedDate, timeZone, 'HH:mm');
}
