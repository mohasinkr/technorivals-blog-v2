# TypeScript Conversion

## Changes Made

- Updated config files: `tsconfig.json` and `next.config.js`
- Created types in `src/types/index.ts` (Blog, TableOfContents, SiteMetadata, AppProps)
- Converted key files to TypeScript:
  - `src/pages/_app.tsx`
  - `src/pages/index.tsx`
  - `src/pages/blogs/[slug]/index.tsx`
  - `src/utils/siteMetaData.ts`

## Next Steps

1. Convert remaining JS files to TS (components, utils, pages)
2. Add types to all components
3. Run `npm run tsc` to check for errors
4. Fix any TypeScript errors

## Benefits

- Type safety at compile time
- Better IDE support
- Self-documenting code
- Easier refactoring
- Improved team collaboration
