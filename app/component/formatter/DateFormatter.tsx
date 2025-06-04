// utils/formatDate.ts

export function DateFormatter(dateString: string): string {
  if (!dateString) return "-";
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  return date.toLocaleDateString("en-US", options);
}
