# Kidrise Telescope Explorer

Interactive bilingual learning site for the Kidrise telescope kit. It includes a rotatable planisphere, time controls, map styles, a compass, observing-weather guidance, learning modules, quizzes, a telescope guide, and downloadable space postcards.

The task-first home screen includes beginner/advanced navigation, local achievement badges, a device-readiness check, and an installable PWA. Red-light night mode reduces bright and blue-toned output for outdoor use. The default maps and application shell work offline after the first visit; larger advanced map styles and images are cached after they are opened. Preferences and progress remain in the browser and are not sent to a server.

## Local development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. No API key is required.

The access-code screen is a client-side product-onboarding gate. It is not an authentication or security boundary; any content that must be private needs a server-side access system.

The observing planner reads public weather data from the Hong Kong Observatory. If that service or the network is unavailable, the rest of the app remains usable and the planner shows fallback data.

## Verification

Run the complete local quality gate before merging or deploying:

```bash
npm run check
```

This runs strict TypeScript checking, astronomy/weather regression tests, and a production build. GitHub Actions runs the same checks for pull requests and changes to `main`.

## Production

The site is configured for `https://telescope.stemtoy.com.hk`. The `public/CNAME` file is included in the production build.

```bash
npm run deploy
```

After deployment, verify the custom domain directly, sign in with a valid product code, test mouse and touch interactions on the star map, toggle red-light mode, install the PWA, reload once while offline, create and download a postcard, and check the browser console and network panel for errors or missing assets.
