# Liverpool v Newcastle Tickets

A one-page dashboard comparing hospitality packages for **Liverpool v Newcastle United** at Anfield, Saturday 10 April 2027, 3:00pm BST. It covers Liverpool FC's own Forever Reds Lounge and the club's officially listed match-break suppliers.

## What it does

- Lists every package cheapest first, or grouped by company, lounge or seating area.
- Hover or tap a lounge to see what's included; hover or tap a seat to see the blocks on a stadium map.
- Hotel, food and drink are shown as coloured dots (green included, yellow additional cost, red not included). Click a dot to change it.
- Double-click any text to edit it. Edits, dot changes and deleted rows are saved in your own browser (`localStorage`), not in the files.
- On a phone the table shows Company and Cost; tap a row to open the rest.

## Run it

The page loads its data with `fetch`, so it needs to be served over http rather than opened as a file:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

It also works as-is on GitHub Pages (Settings → Pages → deploy from the `main` branch, root folder).

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The page: layout, styles and drawing code |
| `css/theme.css` | Base colour, type and spacing tokens (light and dark) |
| `js/dash-runtime.js` | Small loader that reads the JSON files, works out USD prices and draws the table |
| `data/offers.json` | One row per package: seller, lounge, seats, price, hotel, food, drink, notes, link |
| `data/lounges.json` | What each lounge includes, used in the lounge popups |
| `data/fx.json` | GBP/USD rate used to convert pound prices |
| `assets/anfield-banner-wide.jpg` | Banner illustration |

## Updating prices

Edit `data/offers.json`. `price` is the seller's listed price in `currency` (`GBP` or `USD`); `fee_pct` adds a booking fee, and pound prices are converted with the rate in `data/fx.json`. Set `price` to `null` and fill `price_short` (for example "Ask seller") when no price is published.

Prices were collected from each seller's match page on 2 Nov 2026 and change with demand.

## Dependencies

[d3](https://d3js.org) 7.9.0 and the Inter font, both loaded from public CDNs.
