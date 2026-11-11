# England soccer tickets

Ticket and hospitality research for an England trip, 8–18 April 2027.

| Match | Date | Folder |
| --- | --- | --- |
| Liverpool v Newcastle United, Anfield | Sat 10 Apr 2027, 3:00pm BST | [`liverpool-v-newcastle/`](liverpool-v-newcastle/) |
| Brighton & Hove Albion v Chelsea, American Express Stadium | Sat 17 Apr 2027, 3:00pm BST | [`brighton-v-chelsea/`](brighton-v-chelsea/) |
| West Bromwich Albion v Middlesbrough, The Hawthorns | Sat 17 Apr 2027, 3:00pm BST | [`west-brom-v-middlesbrough/`](west-brom-v-middlesbrough/) |

The `index.html` at the repository root shows all three matches on one page, with a tab for each. Each tab loads that match's folder, so the folders stay self-contained and still work on their own. The page remembers the last tab you opened, and you can link straight to one with `#liverpool`, `#brighton` or `#westbrom`.

To view it locally, run a web server from the repository root:

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

With GitHub Pages turned on (Settings → Pages → deploy from `main`, root folder), the tabbed page is at `https://puetznicklas.github.io/england-soccer-tickets/` and each match is also at `https://puetznicklas.github.io/england-soccer-tickets/<folder>/`.
