export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' },
): string {
  return new Date(iso).toLocaleDateString('en-US', options);
}

export function formatYear(iso: string): number {
  return new Date(iso).getFullYear();
}
