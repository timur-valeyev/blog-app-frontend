import { ru } from 'date-fns/locale'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

export const formatDate = (date: Date): string => {
  const options = {
    addSuffix: true,
    locale: ru
  }

  const diff = Date.now() - date.getTime()
  const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  if (diff < 24 * 60 * 60 * 1000) {
    return `сегодня в ${time}`
  } else if (diff < 2 * 24 * 60 * 60 * 1000) {
    return `вчера в ${time}`
  } else {
    return `${formatDistanceToNowStrict(date, options)} назад`
  }
}