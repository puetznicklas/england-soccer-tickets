# Brighton v Chelsea Tickets

A one-page dashboard comparing hospitality packages for **Brighton & Hove Albion v Chelsea** at the American Express Stadium, Saturday 17 April 2027, 3:00pm BST. Every package here is sold direct by Brighton & Hove Albion. The club does not publish a list of authorised hospitality resellers, so no third-party sellers are included.

## What it does

- Lists every package cheapest first, or grouped by company, lounge or seating area.
- Hover or tap a lounge to see what's included; hover or tap a seat to see where it is on a stadium map.
- Hotel, food and drink are shown as coloured dots (green included, yellow additional cost, red not included). Click a dot to change it.
- Double-click any text to edit it. Edits, dot changes and deleted rows are saved in your own browser (`localStorage`), not in the files.
- On a phone the table shows Company and Cost; tap a row to open the rest.

## About the prices

Brighton prices hospitality by match grade (C, B, A or A+). The Chelsea match is an A grade match, so the Cost column shows the club's A grade price per person, including VAT. Executive and Legends boxes are sold per box and are price on application for A grade matches.

## Run it

The page loads its data with `fetch`, so it needs to be served over http rather than opened as a file:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Run that from this folder, or from the repository root and open `/brighton-v-chelsea/`. It also works as-is on GitHub Pages (see the README at the repository root).

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The page: layout, styles and drawing code |
| `css/theme.css` | Base colour, type and spacing tokens (light and dark) |
| `js/dash-runtime.js` | Small loader that reads the JSON files, works out USD prices and draws the table |
| `data/offers.json` | One row per package: seller, lounge, seats, price, hotel, food, drink, notes, link |
| `data/lounges.json` | What each lounge includes, used in the lounge popups |
| `data/fx.json` | GBP/USD rate used to convert pound prices |
| `assets/chelsea-bus-banner.webp` | Banner illustration |

## Updating prices

Edit `data/offers.json`. `price` is the listed price in `currency` (`GBP` or `USD`); set `price_max` as well to show a range. `fee_pct` adds a booking fee, and pound prices are converted with the rate in `data/fx.json`. Set `price` to `null` and fill `price_short` (for example "Ask club") when no per-person price is published.

Prices and inclusions were collected from brightonandhovealbion.com on 11 Nov 2026.

## Dependencies

[d3](https://d3js.org) 7.9.0 and the Inter font, both loaded from public CDNs.
