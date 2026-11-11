// Minimal stand-in for the dashboard runtime the page was built on.
// It loads the JSON files in /data, runs the derived calculations, and calls each drawing.
//
//   dash.data(id)          -> { status: 'loading' | 'ok' | 'error', data }
//   dash.calc(id, spec)    -> spec = { inputs: [ids], fn(...inputs) => rows }
//   dash.draw(name, spec)  -> spec = { mount(el) => made, update(el, made) } or fn(el);
//                             dash.draw(name) with no spec redraws it.
(function () {
  const DATASETS = { offers: 'data/offers.json', lounges: 'data/lounges.json', fx: 'data/fx.json' };
  const store = {};
  const calcs = {};
  const draws = {};
  let ready = false;

  function data(id) {
    return store[id] || { status: 'loading', data: [] };
  }

  function runCalcs() {
    Object.entries(calcs).forEach(([id, spec]) => {
      try {
        const inputs = spec.inputs.map((i) => data(i));
        if (inputs.some((x) => x.status !== 'ok')) return;
        store[id] = { status: 'ok', data: spec.fn(...inputs.map((x) => x.data)) };
      } catch (e) {
        console.error('calc failed:', id, e);
        store[id] = { status: 'error', data: [] };
      }
    });
  }

  function runDraw(name) {
    const d = draws[name];
    if (!d) return;
    document.querySelectorAll('[data-draw="' + name + '"]').forEach((el) => {
      try {
        if (typeof d.spec === 'function') { d.spec(el); return; }
        if (!el.__made) el.__made = d.spec.mount ? d.spec.mount(el) : {};
        if (d.spec.update) d.spec.update(el, el.__made);
      } catch (e) {
        console.error('draw failed:', name, e);
      }
    });
  }

  window.dash = {
    colors: ['#984063', '#41436a', '#fe9677', '#f64668'],
    data,
    calc(id, spec) { calcs[id] = spec; if (ready) runCalcs(); },
    draw(name, spec) {
      if (spec) draws[name] = { spec };
      if (ready) runDraw(name);
    },
  };

  async function load() {
    await Promise.all(Object.entries(DATASETS).map(async ([id, url]) => {
      try {
        const r = await fetch(url, { cache: 'no-cache' });
        if (!r.ok) throw new Error(r.status + ' ' + r.statusText);
        store[id] = { status: 'ok', data: await r.json() };
      } catch (e) {
        console.error('Could not load ' + url + '. Serve this folder over http (see README).', e);
        store[id] = { status: 'error', data: [] };
      }
    }));
    ready = true;
    runCalcs();
    Object.keys(draws).forEach(runDraw);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load);
  else load();
})();
