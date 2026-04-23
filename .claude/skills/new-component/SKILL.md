---
name: new-component
description: Crear componente UI reutilizable (Button, Card, Badge, Input, Modal). Usar para elementos que se repiten en múltiples secciones de la landing.
---

# Skill: new-component

## Cuándo usar este skill
Cuando el usuario pida crear un elemento de UI que se reutiliza en múltiples secciones:
Button, Card, Badge, Input, Modal, Tooltip, Spinner, Tag, Divider, Avatar, etc.

## Proceso

1. **Crear el componente** en `src/components/ui/<NombreComponente>.tsx`
2. **Exportarlo** desde `src/components/ui/index.ts`
3. **Usarlo** en las secciones que lo necesiten via `import { NombreComponente } from "@/components/ui"`

## Reglas obligatorias

- Props tipadas con `interface` incluyendo variantes (`variant`, `size`, etc.)
- Variantes implementadas con clases Tailwind (usar objeto de mapeo, no condicionales inline)
- Estilos **solo con clases Tailwind** — nunca CSS inline
- Extender props nativas HTML donde aplique (`React.ButtonHTMLAttributes`, `React.InputHTMLAttributes`)
- Accesibilidad: `aria-label`, `disabled`, `type`, etc.

## Template base — Button

```tsx
// src/components/ui/Button.tsx
import type { FC, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-800 text-white hover:bg-gray-900",
  outline: "border border-gray-300 text-gray-800 hover:bg-gray-50",
  ghost: "text-gray-600 hover:bg-gray-100",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3.5 text-lg",
};

const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

## Exportar en index.ts

```ts
// src/components/ui/index.ts
export { default as Button } from "./Button";
```
