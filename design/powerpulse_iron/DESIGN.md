---
name: PowerPulse Iron
colors:
  surface: '#12131a'
  surface-dim: '#12131a'
  surface-bright: '#383941'
  surface-container-lowest: '#0d0e15'
  surface-container-low: '#1a1b22'
  surface-container: '#1e1f26'
  surface-container-high: '#292931'
  surface-container-highest: '#33343c'
  on-surface: '#e3e1ec'
  on-surface-variant: '#e9bcb5'
  inverse-surface: '#e3e1ec'
  inverse-on-surface: '#2f3038'
  outline: '#af8781'
  outline-variant: '#5e3f3a'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#680200'
  primary-container: '#e10600'
  on-primary-container: '#fff2f0'
  inverse-primary: '#c00500'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b4b4'
  tertiary: '#ffb3ad'
  on-tertiary: '#68000a'
  tertiary-container: '#d32f33'
  on-tertiary-container: '#fff2f0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410100'
  on-primary-fixed-variant: '#930300'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#12131a'
  on-background: '#e3e1ec'
  surface-variant: '#33343c'
typography:
  display-hero:
    fontFamily: Oswald
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 68px
    letterSpacing: 0.04em
  display-hero-mobile:
    fontFamily: Oswald
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: 0.03em
  headline-lg:
    fontFamily: Oswald
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Oswald
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Oswald
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Oswald
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: 0.02em
  metric-xl:
    fontFamily: Oswald
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  metric-md:
    fontFamily: Oswald
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-caps:
    fontFamily: Oswald
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-mono:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies high-intensity athletic performance, relentless discipline, and precision tracking. Designed for serious lifters, performance athletes, and biomechanics-focused users, the aesthetic is raw, aggressive, and razor-sharp without sacrificing utilitarian clarity.

### Personality & Emotional Response
The interface evokes the visceral focus of a blackout weight room: heavy iron, redline heart rates, and absolute signal-to-noise efficiency. Users must feel empowered, accountable, and driven by unyielding data clarity. There are no friendly pastels, whimsical illustrations, or soft cushions. Every element communicates tension, power, and exactitude.

### Design Movement
**High-Contrast Aggressive Minimalist / Dark Brutalist Performance:**
- Deep pitch-black canvases create infinite depth and maximum battery preservation under high-nit gym environments.
- Stark industrial layout rhythm with sharp, structural gridlines.
- Tactical red accents act as immediate visual priority anchors—reserved strictly for effort metrics, active states, and max thresholds.
- Dense data readouts paired with massive condensed industrial typography mirror elite telemetry dashboards and competition scoreboards.

## Colors

The palette is engineered for extreme contrast, dark-adapted vision, and clinical data clarity under harsh gym lighting.

### Palette Architecture
- **Primary Canvas (`#000000`) & Base Surface (`#0A0A0A`):** Pure pitch black anchors the UI, eliminating ambient screen glow and establishing total contrast.
- **Card & Component Surfaces (`#121212`, `#181818`):** Deep onyx slate tiers generate precise layered depth without losing dark-room density.
- **Aggressive Kinetic Crimson (`#E10600`):** The primary redline engine. Applied purposefully to primary calls to action, PR indicators, active workout states, and live telemetry pulses.
- **Electric Accent Red (`#EF4444`):** High-visibility secondary red used for active toggles, critical warnings, and peak heart rate zone markers.
- **Stark White (`#FFFFFF`):** Reserved for primary metrics, condensed headline reads, and uncompromising legibility.
- **Technical Grays (`#9CA3AF`, `#71717A`):** Cool-toned zinc scale used for secondary metadata, set counters, structural divider lines, and inactive states.
- **Structural Borders (`#27272A` / `rgba(225, 6, 0, 0.25)`):** Hairline edge definitions that provide tectonic structure without cluttering visual hierarchy.

## Typography

The typographic hierarchy enforces immediate visual triage between dynamic output (condensed, vertical, commanding) and structural contextual information (neutral, clean, highly legible).

### Headline & Metric Voice
`Oswald` is deployed across all numerical readouts, titles, uppercase labels, and display modules. Its condensed vertical proportion maximizes horizontal screen real estate for 3-to-4 digit weight loads, rep counters, rest timers, and split times. All headlines are styled strictly in uppercase to convey structural authority.

### Body & Data Voice
`Inter` handles all multi-line instructions, AI recovery recommendations, biomechanical notes, and micro-labels. Set at medium and regular weights with balanced aperture, it maintains uncompromising clarity even when dimmed to secondary zinc levels.

## Layout & Spacing

The layout model optimizes space for fast thumb-reach operation during high-exertion training. Data is presented in modular telemetry blocks that avoid accidental input while lifting.

### Grid Rhythm & Adapting Layouts
- **Mobile (< 768px):** Single-column stacked telemetry modules with a 4-column sub-grid for numerical split inputs (Set, Reps, Load, RPE). 16px lateral margin preserves active thumb zones.
- **Tablet (768px - 1024px):** 8-column layout allowing side-by-side active workout loggers and live telemetry charts.
- **Desktop (> 1024px):** 12-column fixed-max dashboard (1280px max-width) housing multi-pane analytical overviews, load distribution models, and mesocycle progression trees.

### Spacing Philosophy
Compact vertical rhythm prevents excessive scrolling during sets. Component padding adheres strictly to `space-sm` (8px) for compact tabular inputs and `space-md` (16px) for card containers.

## Elevation & Depth

This design system avoids soft, pillowy drop shadows. Visual depth is established through tonal stacking, razor-thin perimeter boundaries, and selective laser-edge illumination.

### Tonal Tiers
- **Tier 0 (Canvas):** Pure `#000000`. Base viewport background.
- **Tier 1 (Surface Default):** `#0A0A0A` to `#121212`. Grouped sections, exercise module cards, and table containers.
- **Tier 2 (Surface Elevated):** `#181818`. Interactive overlays, slide-up weight input sheets, and active metric cards.
- **Tier 3 (Surface Focused):** `#202020` with a `1px` solid `#E10600` perimeter stroke for items requiring immediate user interaction.

### Edge Definition & Glow
Shadows are hard or nonexistent. Under active workout or rest-timer states, an edge illumination token (`0 0 16px -2px rgba(225, 6, 0, 0.4)`) signifies ongoing live states without blurring UI boundaries.

## Shapes

The geometry of the design system is architectural, muscular, and restrained.

### Corner Radii
Curvature is strictly constrained to a soft/subtle index (`roundedness: 1`). 
- **Base Components (Inputs, Chips, Small Buttons):** `4px` (`0.25rem`). Sharp enough to convey industrial precision, soft enough to prevent pixel aliasing.
- **Containers & Cards (`rounded-lg`):** `8px` (`0.5rem`). Keeps large dark cards firmly structured.
- **Action Triggers & Modals (`rounded-xl`):** `12px` (`0.75rem`). Maximum allowable corner radius. Bubbly, pill-shaped, or heavily rounded UI elements are strictly prohibited to maintain an athletic and aggressive posture.

## Components

### Buttons
- **Primary Action (Log Set, Complete Workout):** `#E10600` solid fill, `#FFFFFF` bold uppercase `Oswald` text, 4px corner radius. On hover/press: shifts to `#EF4444` with a subtle `inset 0 0 0 1px #FFFFFF`.
- **Secondary Action (Add Exercise, Plate Calculator):** `#181818` background, 1px `#27272A` border, stark white text. Active state triggers 1px `#E10600` stroke.
- **Destructive / Cancel:** Pure black background with `#71717A` border and text; turns crimson red only on confirmation.

### Metric & Telemetry Cards
- Structured within `#121212` backgrounds framed with 1px `#1F1F22` borders.
- Top row: Upper-case tracking label (`Oswald` 12px, zinc `#71717A`).
- Center: Giant high-contrast value (`Oswald` 32px–56px, white `#FFFFFF`) paired with unit indicators (kg, lbs, bpm) right-aligned in red `#E10600`.
- Bottom: Micro sparklines or delta percentages in emerald (surplus) or crimson (deficit).

### Data Input Fields (Load, Reps, RPE)
- Compact, high-visibility input blocks with centered `metric-md` typography.
- Background: `#0A0A0A`; Border: 1px `#27272A`.
- Active focus state: Border color changes to `#E10600` with zero layout shift. Increment/decrement steppers sit flush on lateral sides with tactical tactile tap areas.

### Status Chips & Badges
- Strict uppercase, 12px height text with tight horizontal padding (6px).
- Styling: Deep red tint background (`rgba(225, 6, 0, 0.15)`) enclosed in a 1px solid `#E10600` line for PRs, AI Target recommendations, and Drop-set markers.

### Checkboxes & Set Completion Radios
- Square 20x20px elements with 2px corner radius.
- Inactive: 1.5px `#3F3F46` border with pure black fill.
- Checked / Logged: Solid `#E10600` fill with a stark white `#FFFFFF` heavy check icon, instantly telegraphing a completed set.

### Live Telemetry Ring & Timer Bar
- Progress indicators use a high-visibility continuous stroke of `#E10600` contrasted against an un-filled track of `#1F1F22`.
- Active resting interval pulses a subtle crimson glow at terminal ends.