import format from 'date-fns/format';
import frLocale from 'date-fns/locale/fr';

export function getYearFromReleaseDate(release_date: string) {
    const date = new Date(release_date);
    return format(date, 'yyyy', { locale: frLocale });
}