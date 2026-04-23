---
name: frontend-design
description: Diseño frontend profesional para landing pages.
  Activar automáticamente para cualquier tarea de UI, componentes,
  secciones, o diseño visual. Evitar diseños genéricos de IA.
---

# Filosofía de diseño

Antes de escribir cualquier código, elegí una dirección
estética clara y comprometete con ella. No uses estilos
genéricos. Elige algo específico: minimalista corporativo,
bold y moderno, editorial elegante, etc.

## Reglas de tipografía
- NUNCA usar: Inter, Roboto, Arial, Space Grotesk
- Usar Google Fonts con personalidad: Playfair Display,
  Sora, DM Sans, Plus Jakarta Sans, Fraunces, Cabinet Grotesk
- Combinar siempre una fuente serif + una sans-serif

## Reglas de color
- Definir una paleta de 3-5 colores máximo
- Tener un color primario dominante con variaciones
- Fondo nunca puro blanco (#fff) ni negro (#000)
- Usar tonos ligeramente off-white o dark

## Layout y espaciado
- Espaciado generoso: secciones con padding mínimo de 80px
- Máximo ancho de contenido: 1200px centrado
- Grillas asimétricas cuando el contenido lo permite
- Jerarquía visual clara: 1 elemento principal por sección

## Componentes
- Botones con hover states definidos siempre
- Animaciones sutiles con Framer Motion (no exageradas)
- Mobile first: diseñar para 375px primero
- Imágenes siempre con next/image y aspectRatio definido

## Lo que está prohibido
- Gradientes de arcoíris genéricos
- Sombras box-shadow por defecto de Tailwind
- Cards todas iguales sin variación de tamaño
- Íconos de emoji como decoración
- Fondos con patrones de puntos o grillas sin propósito

Cuando creés cualquier componente, explicá primero
en 2 líneas la decisión estética que tomaste y por qué.
