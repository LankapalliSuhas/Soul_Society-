# NETRA — Frontend (05_FRONTEND)

React + Vite + Tailwind frontend for the NETRA retail intelligence dashboard.

## Status: UI preview, running on mock data

`07_INTEGRATION/api_contract.json` and the `06_DATA/schemas/*.json` files
have not been provided yet, so this build cannot be wired to the real
backend. Every field name and endpoint path in `src/services/api.js` and
`src/websocket/liveEvents.js` is a **placeholder** based only on the design
brief. A small banner ("UI PREVIEW · MOCK DATA") is shown at all times to
make this obvious.

`VITE_USE_MOCK=true` (the default, see `.env.example`) makes `api.js` and
`liveEvents.js` generate realistic-looking data client-side instead of
calling the network, so the four screens, loading/empty/error states, and
the live event feed can all be reviewed without a backend running.

## Getting the real integration done

Once the contract files exist:

1. Update the endpoint paths inside `src/services/api.js` (marked `TODO`)
   to match `api_contract.json` exactly — do not rename fields.
2. Update the event type names inside `src/websocket/liveEvents.js` to
   match `event_schema.json`.
3. Set `VITE_USE_MOCK=false` in `.env`.
4. Remove the mock generator functions once real responses are confirmed
   to match what the components expect (they already only reference the
   fields named in this design pass — `lane`, `people_count`, `eta_min`,
   `burden`, `status`, `sku`, `stock`, `par`, `confidence` — swap those for
   whatever the real schema calls them if different).

## Structure

```
src/
  charts/        QueueETAChart.jsx, StockChart.jsx — small inline SVG/DOM bar charts
  components/    Presentational pieces shared across pages
  hooks/         useApi.js (REST + polling), useConnectionStatus.js (WebSocket)
  pages/         CommandCenter, Inventory, Queue, LiveEvents — one per P0 screen
  services/      api.js — all REST calls, centralized
  websocket/     liveEvents.js — WebSocket connect/parse/reconnect logic
  styles/        Tailwind entry + the linen-texture/base styles
```

## Running it

```bash
npm install
cp .env.example .env
npm run dev
```

Then open the printed local URL. `npm run build` produces a production
build; `npm run preview` serves it locally to sanity-check before a demo.

## Design system

Oat-milk / linen / leaf palette, Manrope for display type, Inter for body
and data. Tokens live in `tailwind.config.js` under `theme.extend.colors`.
