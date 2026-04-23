/**
 * Combina clases de Tailwind de forma condicional.
 * Útil para aplicar clases dinámicas sin conflictos.
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
