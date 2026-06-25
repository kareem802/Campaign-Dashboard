Campaign Dashboard
==================

A responsive Campaign Management Dashboard built with React, Vite, TypeScript, and Tailwind CSS,
following feature sliced design (FSD) architecture for strong scalability.


SETUP
-----
-open the project folder in CMD and run the following two lines:

npm install
npm run dev


TECHNOLOGIES
------------
- React 19
- Vite 8
- TypeScript 6
- Tailwind CSS 4
- clsx + tailwind-merge
- uuid


PROJECT STRUCTURE
-----------------
src/
  app/         App shell, providers, global styles

  pages/       DashboardPage — composes all widgets

  widgets/     CampaignToolbar, CampaignList, CampaignFormModal

  features/    search, filter, add, edit, delete campaign logic

  entities/    Campaign type, mock data, API layer, card UI

  shared/      Reusable UI kit, utilities, constants


KEY DECISIONS
-------------

- FSD Architecture: Selected to demonstrate familiarity with scalable frontend architecture conventions, a deliberate choice for presentation.
For a project of this scope, a simpler structure (flat components/ folder with co-located hooks) would be more practical, though less scalable.
To manage the added complexity, some shared-layer components were adapted from a prior personal project with style adjustments, allowing me to meet the deadline without compromising the architectural approach.

- Added a "Fail Next API Call" button to simulate backend errors and demonstrate how well the frontend handles failure states.

- Vite over Next.js: single-page app, no SSR needed

- React Context + useReducer: no external state library required at this scale

- localStorage: acts as persistence layer, only campaignApi.ts touches it

- Mock API: simulated async delays (500–800ms) to demonstrate loading/error states

- Card layout: works cleanly on both mobile and desktop

- Tab filters: immediate visibility into status counts vs. a dropdown