import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateToBR(dateISO: string): string {
    try {
        const parsedDate = parseISO(dateISO);
        return format(parsedDate, 'dd/MM/yyyy', { locale: ptBR });
    } catch {
        return dateISO;
    }
}