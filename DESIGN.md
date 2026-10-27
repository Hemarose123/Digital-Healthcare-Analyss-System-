# Design Brief

## Direction

Cool Serenity Medical — premium light-themed healthcare PWA with calm blue-to-teal gradient spine, white elevated cards, and sophisticated 3D hero establishing trust through visual depth.

## Tone

Refined minimalism with clinical clarity: confident cool tones (blue primary, teal accent), generous white space, soft rounded corners, and gentle shadows create a trustworthy healthcare aesthetic without generic blandness.

## Differentiation

Gradient spine connecting hero to interactive elements — blue-to-teal gradients on buttons and active states create visual signature linking the 3D neural network hero to the functional dashboard.

## Color Palette

| Token            | OKLCH            | Role                                  |
| :--------------- | :--------------- | :------------------------------------ |
| background       | 0.98 0.008 230   | Cool off-white, light/spacious        |
| foreground       | 0.18 0.015 230   | Deep cool text, high contrast         |
| card             | 1.0 0.004 230    | Pure white, elevation principle      |
| primary          | 0.55 0.24 250    | Medical blue (trust, healthcare)      |
| accent           | 0.60 0.15 170    | Teal (balance, wellness)              |
| muted            | 0.94 0.01 230    | Subtle backgrounds, secondary text    |
| destructive      | 0.55 0.22 25     | Warm red (alerts, warnings)           |
| border           | 0.9 0.008 230    | Soft lines, minimal visual weight     |

## Typography

- Display: Space Grotesk — geometric confidence for headlines, hero text, section titles
- Body: Figtree — friendly, accessible for UI labels and paragraph text
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl font-semibold`, label `text-sm font-medium`, body `text-base`

## Elevation & Depth

White cards on cool background with two-tier shadow system: subtle (1-3px, low opacity) for resting cards, elevated (4-12px, higher opacity) for hover/active states. No shadows on backgrounds — only on interactive surfaces.

## Structural Zones

| Zone    | Background           | Border                     | Notes                                          |
| :------ | :------------------- | :------------------------ | :--------------------------------------------- |
| Header  | bg-background        | border-b border-border    | Minimal, subtle depth; optional logo gradient |
| Content | bg-background        | —                         | Alternating sections: bg-background / bg-card |
| Cards   | bg-card              | border border-border      | Elevation via shadow, not color; hover lift    |
| Footer  | bg-muted/20          | border-t border-border    | Secondary text, minimal visual weight         |

## Spacing & Rhythm

Mobile-first: 16px base spacing, 24px section gaps, 8px micro-spacing for inline elements. Generous padding inside cards (20-24px), spacious section margins (32-40px). Responsive: `md:` breakpoint increases density; `lg:` opens up whitespace.

## Component Patterns

- Buttons: rounded-lg, primary gradient (blue-to-teal), shadow-elevated on hover with scale-105, 300ms smooth transition
- Cards: rounded-lg with shadow-subtle, hover:shadow-elevated + hover:scale-105, border border-border for definition
- Badges: rounded-full, muted background with primary/accent text for status
- Inputs: rounded-md, bg-secondary, border border-input, focus:ring-2 ring-primary

## Motion

- Entrance: fade-in + slide-up (300ms ease-out) on page load; staggered card animations (50ms delay between)
- Hover: scale-105 + shadow-elevated (200ms smooth) on cards; color shift (300ms) on buttons
- Decorative: float animation (6s ease-in-out) on hero elements; pulse-glow (2s infinite) on active CTAs

## Constraints

- Never use raw color literals; all colors via OKLCH tokens
- Minimum 0.7 lightness diff (L) between foreground and background
- Prefer gradient accents over solid colors on CTAs
- No shadows on non-interactive elements
- Maintain consistent 12px border-radius on cards; 8px on smaller inputs; rounded-full for badges

## Signature Detail

Gradient spine connecting hero to dashboard: blue-to-teal gradient appears on primary buttons, active states, and hero 3D background, creating unified visual identity and reinforcing the brand's wellness-to-healing journey narrative.
