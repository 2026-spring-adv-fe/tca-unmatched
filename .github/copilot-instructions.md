# Copilot instructions for `tca-unmatched`

When a prompt is about changing the app's look and feel, keep the work focused on UI styling only.

## Preferred places to change

- `src/App.tsx`
- `src/Home.tsx`
- `src/Setup.tsx`
- `src/Play.tsx`
- `src/index.css`
- `src/App.css`

## Rules
- Never edit docs folder
- Never do builds to verify changes
- Prefer Tailwind utility classes and DaisyUI component classes in existing `className` props.
- Use `src/index.css` for global theme tokens, DaisyUI theme variables, and app-wide visual defaults.
- Use `src/App.css` only when a style needs app-specific CSS that does not fit cleanly in class names.
- Do not change game logic, routing, data flow, or API code for visual-only requests.
- Do not add new libraries or config unless the requested visual change truly cannot be done with the existing Tailwind/DaisyUI setup.
- Keep diffs minimal and stay inside the files above unless explicitly asked to go wider.

## Starting point

For any design request, inspect the component files above first, then use `src/index.css` or `src/App.css` only if the class names are not enough.
