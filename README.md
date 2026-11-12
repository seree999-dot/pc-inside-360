# PC INSIDE 360° — Interactive Computer Hardware Learning Lab

**Explore. Rotate. Understand. Assemble.** · สำรวจ · หมุน · เข้าใจ · ประกอบ

A browser-based, real-time 3D learning platform for university computer-hardware courses.
Thai is the default language; English is complete.

## Quick start

```bash
cd pc-inside-360
npm install
npm run dev        # http://localhost:5173
npm test           # 30 unit tests (compatibility rules, quiz engine, mentor matcher, content integrity)
npm run build      # type-check + production build into dist/
```

Requires Node 18+ (developed on Node 24).

## Deploying

`npm run build` produces **one self-contained file, `dist/index.html`** (all JS/CSS inlined, hash-based routing).
It opens by double-click (`file://`) and from any web server or sub-folder — for example copy it to
`C:\xampp\htdocs\pc360\index.html` and open `http://localhost/pc360/`. No server code is needed.

Do **not** open the project's root `index.html` directly or through Apache: it is the development source and
only works through `npm run dev` (it now shows a notice explaining this instead of a blank page).

### Optional: Hardware Mentor AI (real LLM answers)

By default the Mentor runs in **offline mode** with 37 curated, verified Q&A entries and says so in its header.
To enable AI answers without ever exposing a key in the browser:

```bash
ANTHROPIC_API_KEY=sk-... ALLOWED_ORIGIN=https://your.site node server/mentor-proxy.mjs   # port 8787
```

then build the front end with `VITE_MENTOR_ENDPOINT=https://your.site:8787 npm run build`.
The proxy has no dependencies, validates input, rate-limits per IP and only forwards the question and
the current 3D context. If the proxy fails, the UI falls back to curated answers.

## What is in it

| Screen | What students do |
|---|---|
| Landing | Live, auto-rotating 3D PC they can already drag; start onboarding or lessons |
| 3D Explorer | Three-panel lab: searchable component list · 3D viewport · Learning Inspector |
| Lessons | 10 guided lessons (Bloom: remember → analyse) that fly the camera and toggle views, with checkpoints |
| Assembly Lab | 10-step build with pointer drag-and-drop + snap targets, CPU orientation, DIMM slot choice, thermal paste, cable routing, POST simulation; practice mode + 3 challenges |
| Compare | 6 side-by-side comparisons with **synchronised** rotation and structured tables |
| Quiz | 55 questions: 5-choice MCQ, scenario, compatibility, 3D identification, motherboard hotspot click, matching, ordering; practice (retry) and test modes |
| Troubleshoot | 6 scenarios: choose diagnostic steps, see simulated results, conclude a cause, scored |
| Progress | Real local analytics: lessons, accuracy by topic, explored parts, assembly, active time, badges |
| Instructor | Preview layout using **clearly labelled demonstration data** |
| Mentor | Floating assistant, context-aware (selected part / current lesson), "show me in 3D" links |

3D toolbar: rotate / pan, zoom, reset, fit, 7 camera presets, auto-rotate, **exploded view**, **x-ray with
opacity slider**, **isolate**, hide/show any part, animated data/power/heat connection paths,
airflow + heat overlay, annotations on/off, PNG screenshot, and a pausable / skippable / replayable guided tour.
Double-click focuses a point; selecting a part highlights it, flies the camera, opens the inspector and its hotspots.

## Architecture

```
src/
  data/            Typed bilingual content (separate from UI): 20 components, 59 hotspots, 10 lessons,
                   55 quiz items, 6 comparisons, 6 troubleshooting cases, 37 mentor Q&As + types.ts
  three/           R3F scene: layout table, camera rig, selectable Part wrapper, hotspots, effects,
    models/        original procedural models + a registry (swap any entry for a licensed GLB)
  explorer/        Component list, Inspector, lesson player, onboarding, toolbar, tour, diagrams
  assembly/        Part catalogue, compatibility rules (compat.ts), step machine, scene, view
  quiz/            Pure quiz engine + question renderers
  mentor/          Offline matcher + chat UI
  store/           Zustand: app/scene state, persisted progress (localStorage)
  views/           Remaining screens
server/            Optional AI proxy (Node, no deps)
```

Key decisions:

- **Vite + React + TypeScript instead of Next.js.** The app is fully client-side 3D with no server rendering
  benefit; a static build deploys anywhere, including the existing Apache/XAMPP setup.
- **React Three Fiber + Drei** for the scene; one shared unit box/cylinder geometry instanced by scale,
  `Instances` for fin stacks and keycaps, adaptive DPR + `PerformanceMonitor`, lazy-loaded screens, error boundary
  and a non-WebGL fallback message.
- **Asset-agnostic placement.** `three/layout.ts` holds positions / explode offsets; `three/models/index.tsx`
  maps ids to models. Replacing a procedural model with a GLB does not touch content or layout.
- **Compatibility is rule-based on explicit data** (`assembly/catalog.ts` + `assembly/compat.ts`): socket,
  chipset / firmware support, DDR generation (board and CPU), DIMM count, form factor, GPU length, cooler height,
  radiator mounts, cooler socket and capacity, M.2 protocol, 3.5" bays, PSU wattage with 30% headroom and
  connector availability. Every rule is unit-tested.
- Hand-rolled CSS design tokens (dark + light themes, glass panels) rather than Tailwind/shadcn, to keep the
  static bundle dependency-free; the spec's palette is used as specified.

## Accessibility

Keyboard-operable controls with visible focus, `aria-pressed` / roles on toggles and tabs, live regions for
feedback, skip link, `prefers-reduced-motion` honoured (camera flights, fans, animations), up/down buttons as the
non-drag alternative for ordering, click-to-pair for matching and cables, an **Install** button and clickable
targets as alternatives to drag-and-drop, arrow-key rotation in the comparison lab, and a non-3D fallback.

## Known limitations (please read)

- **3D models are original procedural representations**, built from primitives at real standard dimensions.
  They are recognisable and labelled, but not photoreal; no licensed GLB assets were available. The registry is
  ready for replacements.
- The CPU die view and the airflow overlay are **conceptual** and labelled as such.
- The Assembly Lab bench always shows a generic ATX board model, even when a micro-ATX / Mini-ITX board is chosen
  (a note says so). Installation is a simplified snap interaction, not a physics simulation.
- **No backend / authentication yet.** Progress is stored only in the student's browser. The instructor
  dashboard uses demonstration data, clearly marked; real class analytics need an authenticated backend
  (e.g. Supabase with row-level security per course).
- The AI Mentor is offline (curated answers) unless the proxy above is deployed with a key.
- Educational content was drafted with AI assistance and is structurally validated by tests (bilingual fields,
  valid references, answer indices), but **it should be reviewed by the course instructor for technical accuracy**
  before classroom use. Some multiple-choice items may have a noticeably longer correct option.
- No end-to-end (Playwright) or automated accessibility test suite yet; flows were checked manually in a browser.
- The main JS chunk is ~395 kB gzipped (three.js) plus ~233 kB gzipped of bilingual content.
