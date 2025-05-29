import { parseISO, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export function formatDate(dateISO: string, fourDigitYear: boolean = true): string {

    if(!(dateISO.endsWith('Z'))) dateISO = dateISO.concat('Z');

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const parsedDate = parseISO(dateISO);
    const date = toZonedTime(parsedDate, timeZone);

    return fourDigitYear ? format(date, 'dd/MM/yyyy') : format(date, 'dd/MM/yy');
    
}

export function formatTime(dateISO: string): string {
    
    if(!(dateISO.endsWith('Z'))) dateISO = dateISO.concat('Z');

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const parsedDate = parseISO(dateISO);
    const date = toZonedTime(parsedDate, timeZone);

    return format(date, 'HH:mm');
}
