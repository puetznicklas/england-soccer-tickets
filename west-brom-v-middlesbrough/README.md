# West Brom v Middlesbrough Tickets

A one-page dashboard comparing hospitality packages for **West Bromwich Albion v Middlesbrough** at The Hawthorns, Saturday 17 April 2027, 3:00pm BST (Championship). Every package here is sold direct by West Bromwich Albion. The club does not publish a list of authorised hospitality resellers, so no third-party sellers are included.

## What it does

- Lists every package cheapest first, or grouped by company, lounge or seating area.
- Hover or tap a lounge to see what's included; hover or tap a seat to see where it is on a stadium map.
- Hotel, food and drink are shown as coloured dots (green included, yellow additional cost, red not included). Click a dot to change it.
- Double-click any text to edit it. Edits, dot changes and deleted rows are saved in your own browser (`localStorage`), not in the files.
- On a phone the table shows Company and Cost; tap a row to open the rest.

## About the prices

West Brom grades each home match Platinum, Gold or Silver and lists prices plus VAT. Its booking site prices this match at the Gold rate. The booking site shows a "from" price that is the under-17 rate (20% off); the adult prices here are the Gold rate plus 20% VAT, which matches that "from" price exactly. The Executive Box and Matchball Sponsor packages were sold out when checked. Seasonal-only lounges and the junior Mascot Experience are not listed.

## Run it

The page loads its data with `fetch`, so it needs to be served over http rather than opened as a file:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Run that from this folder, or from the repository root and open `/west-brom-v-middlesbrough/`. It also works as-is on GitHub Pages (see the README at the repository root).

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The page: layout, styles and drawing code |
| `css/theme.css` | Base colour, type and spacing tokens (light and dark) |
| `js/dash-runtime.js` | Small loader that reads the JSON files, works out USD prices and draws the table |
| `data/offers.json` | One row per package: seller, lounge, seats, price, hotel, food, drink, notes, link |
| `data/lounges.json` | What each lounge includes, used in the lounge popups |
| `data/fx.json` | GBP/USD rate used to convert pound prices |

## Updating prices

Edit `data/offers.json`. `price` is the listed price in `currency` (`GBP` or `USD`); `vat_excluded: true` adds 20% VAT, `fee_pct` adds a booking fee, and pound prices are converted with the rate in `data/fx.json`. Set `price` to `null` and fill `price_short` (for example "Sold out") when there is no price to show.

Prices and inclusions were collected from wba.co.uk and hospitality.wba.co.uk on 11 Nov 2026.

## Dependencies

[d3](https://d3js.org) 7.9.0 and the Inter font, both loaded from public CDNs.
