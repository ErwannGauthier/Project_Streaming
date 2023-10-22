import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';

export function getFormatedDateFromReleaseDate(release_date: string) {
    const date = new Date(release_date);
    return format(date, 'dd/MM/yyyy', { locale: frLocale });
}