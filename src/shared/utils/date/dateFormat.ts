export const dateFormat = (
  date: Date | string | undefined,
): string | undefined => {
  if (!date) return

  const dateObj = new Date(date)

  return dateObj.toLocaleDateString('us-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
