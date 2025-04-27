export function DateFormater(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
}
