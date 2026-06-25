# Campaign Dashboard

A responsive Campaign Management Dashboard built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, following **Feature-Sliced Design (FSD)** architecture for strong scalability.

---

## Setup

Open the project folder in your terminal and run:

```bash
npm install
npm run dev
```

---

## Technologies

| Tool                  | Version |
| --------------------- | ------- |
| React                 | 19      |
| Vite                  | 8       |
| TypeScript            | 6       |
| Tailwind CSS          | 4       |
| clsx + tailwind-merge | latest  |
| uuid                  | latest  |

---

## Project Structure

```
src/
├── app/        # App shell, providers, global styles
├── pages/      # DashboardPage — composes all widgets
├── widgets/    # CampaignToolbar, CampaignList, CampaignFormModal
├── features/   # Search, filter, add, edit, delete campaign logic
├── entities/   # Campaign type, mock data, API layer, card UI
└── shared/     # Reusable UI kit, utilities, constants
```

---

## Key Decisions

### FSD Architecture

Selected to demonstrate familiarity with scalable frontend architecture conventions — a deliberate choice for portfolio and presentation value. For a project of this scope, a simpler structure (flat `components/` folder with co-located hooks) would be more practical, though less scalable. To manage the added complexity, some shared-layer components were adapted from a prior personal project with style adjustments, allowing me to meet the deadline without compromising the architectural approach.

### Other Decisions

| Decision                        | Rationale                                                                               |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| **Vite over Next.js**           | Single-page app — no SSR needed                                                         |
| **React Context + useReducer**  | No external state library required at this scale                                        |
| **localStorage**                | Acts as persistence layer; only `campaignApi.ts` touches it |
| **Mock API**                    | Simulated async delays (500–800ms) to demonstrate loading states                        |
| **Card layout**                 | Works cleanly on both mobile and desktop                                                |
| **Tab filters**                 | Immediate visibility into status counts vs. a dropdown                                  |
| **"Fail Next API Call" button** | Simulates backend errors to demonstrate frontend failure state handling                 |
