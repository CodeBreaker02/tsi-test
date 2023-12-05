export function formatTime(dateString: string) {
  const startDate = new Date(dateString);

  const hours = startDate.getHours();
  const minutes = startDate.getMinutes();

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

export function getAfterTodayDate(number: number) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + number);

  const year = tomorrow.getFullYear();
  const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
  const day = tomorrow.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
