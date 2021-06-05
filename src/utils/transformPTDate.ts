export const transformPTDate = (stringDate?: string) => {
  const parsedDate = stringDate?.replace(/[^\d]/g, '')
  return new Date(
    Number(parsedDate?.slice(4,8)),
    Number(parsedDate?.slice(2,4)),
    Number(parsedDate?.slice(0,2)),
    Number(parsedDate?.slice(8,10)),
    Number(parsedDate?.slice(10,12)),
    0,
  )
}
