# Design Brief

**Tone:** Utilitarian, precise, minimal. Functional first, zero decoration. Clean hierarchy through layered surfaces and subtle depth.

**Differentiation:** Fast feedback, clear visual separation of input/output, accessible mobile-first design with 44px+ touch targets. Vibrant teal accent for high-frequency actions.

## Palette

| Token              | Light OKLCH          | Dark OKLCH            | Use                                       |
|:-------------------|:---------------------|:----------------------|:------------------------------------------|
| **primary**        | `0.56 0.15 198` (teal) | `0.65 0.16 198` (bright teal) | Convert buttons, active tab underline     |
| **destructive**    | `0.54 0.2 28` (red)  | `0.62 0.18 28` (bright red)   | Reset, delete, error states               |
| **background**     | `0.99 0 0` (white)   | `0.12 0 0` (charcoal) | Main canvas                               |
| **card**           | `0.97 0 0` (off-white)| `0.16 0 0` (dark gray)  | Input/output cards, lifted surfaces       |
| **foreground**     | `0.14 0 0` (black)   | `0.96 0 0` (near-white)| Body text, input labels                   |
| **muted**          | `0.92 0 0` (light gray)| `0.2 0 0` (dark gray) | Disabled, placeholder, secondary text     |
| **border**         | `0.88 0 0` (light)   | `0.25 0 0` (subtle)   | Card separators, field outlines            |

## Typography

| Scale     | Family             | Weight | Size | Use                            |
|:----------|:-------------------|:-------|:-----|:-------------------------------|
| **Display** | General Sans       | 700    | 24px | Tab labels, conversion type titles |
| **Body**  | DM Sans            | 400–500| 16px | Input labels, descriptions, values  |
| **Mono**  | Geist Mono         | 400    | 14px | Result numbers, precision display   |

## Structural Zones

| Zone              | Surface              | Border    | Notes                                    |
|:------------------|:---------------------|:----------|:-----------------------------------------|
| **Header**        | `card` bg, bottom `border-b` | subtle | Title + light/dark mode toggle |
| **Tab Navigation** | `background` bg    | none      | Underline (2px teal) on active tab      |
| **Input Area**    | `background` bg    | none      | Stacked input cards with `card` bg      |
| **Result Zone**   | `card` bg, elevated | subtle    | Large mono output value, clear hierarchy |
| **Action Buttons** | Full-width, 44px min | none      | Primary (teal), Destructive (red)       |

## Spacing & Rhythm

- **Padding**: 16px (inputs), 12px (cards), 8px (internal buttons)
- **Gap**: 16px (sections), 12px (form fields), 8px (buttons)
- **Radius**: 8px standard, 12px cards, 0 buttons (modern flat)
- **No horizontal scrolling**: full-width layout, 320px+ mobile safe

## Component Patterns

- **Input fields**: Large touch target (44px), accent ring on focus, placeholder gray `muted-foreground`
- **Buttons**: Full-width, 44px height, primary teal with white text, destructive red
- **Cards**: Subtle border-bottom, soft `muted/20` background lift
- **Tabs**: Active underline (3px teal), hover state `muted-foreground` text
- **Toggle**: Light/dark mode in header, respects system preference

## Motion

- **Transitions**: 300ms cubic-bezier(0.4, 0, 0.2, 1) for all interactive states (hover, focus, active)
- **Feedback**: Tab active highlight, button press feedback (scale 98%), input focus ring
- **No decorative animation**: Purpose-driven transitions only

## Constraints

- **Min tap target**: 44px (iOS), 48px (Android) → standardized at 44px for both
- **Color contrast**: AA+ in both light/dark mode
- **No custom fonts in fallback**: All fonts served from `/assets/fonts/` with swap display strategy
- **Mobile-first breakpoints**: 320px (base), 640px (sm), 768px (md), 1024px (lg)
- **Max width**: 1400px (2xl), centered on desktop
