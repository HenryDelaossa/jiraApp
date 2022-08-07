import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale"



export const getFormatDistance = (date: number) => {
    const froNow = formatDistanceToNow(date, { locale: es });
    return `creado ${froNow}`
}