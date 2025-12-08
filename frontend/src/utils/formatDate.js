import dayjs from 'dayjs';

export function formatDateISO(date) {
  if (!date) return '';
  return dayjs(date).format('YYYY-MM-DD');
}

export default formatDateISO;
