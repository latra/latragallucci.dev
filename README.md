# Questfolio

Un framework open source en React/TypeScript para construir portfolios de desarrollador con
estética de videojuego. No es una web personal: es un motor reutilizable. Cualquiera lo
instala, rellena `content/` y `config/` con sus propios datos, y obtiene su portfolio — sin
tocar un solo componente React.

## Filosofía

Un portfolio no debería mostrar solo lo que ya conseguiste, también lo que estás construyendo
y lo que todavía quieres conseguir:

- Los proyectos **completados** son logros desbloqueados.
- Los proyectos **en desarrollo** son misiones activas.
- Los proyectos **en pausa** o **abandonados** son tu historial.
- Los proyectos **futuros** aparecen como logros bloqueados (`???`) hasta que los reveles.

Todo lo demás — experiencia por tecnología, niveles, estadísticas — se calcula
automáticamente a partir de esos datos. Nunca se introduce a mano.

## Quickstart

```bash
npm create questfolio@latest mi-portfolio
cd mi-portfolio
npm install
npm run dev
```

Edita `config/profile.json`, `config/theme.json`, `config/navigation.json`,
`config/skills.json` y añade/edita archivos `.mdx` en `content/projects`,
`content/achievements` y `content/timeline`. El framework hace el resto: XP y niveles por
tecnología, estadísticas globales, timeline combinada, filtros y buscador.

## Estructura del monorepo

```
packages/
  core/                 → paquete "questfolio": componentes, páginas, hooks, lib, tema, tipos
  create-questfolio/    → CLI "npm create questfolio"
    template/           → proyecto Vite real que el CLI copia (con contenido de ejemplo)
```

Ver `packages/core/src` para la lógica (especialmente `lib/xp.ts` para el cálculo de
experiencia/niveles) y `packages/create-questfolio/template` para ver un portfolio de ejemplo
completo y funcional.

## Desarrollo de este repositorio

```bash
npm install
npm run build -w packages/core   # compila la librería
npm test                          # vitest sobre packages/core (xp, stats, content)
npm run dev:template               # levanta el proyecto de ejemplo con la librería enlazada
```

## Licencia

MIT
