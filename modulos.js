// Vistas del ERP. Los datos y las credenciales de sesión pertenecen al contenedor.
const NS = 'http://www.w3.org/2000/svg';
const shapes = {
  panel: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
  box: 'm3 7 9-5 9 5v10l-9 5-9-5zM3 7l9 5 9-5M12 12v10M7.5 4.5l9 5',
  store: 'm2 9 10-6 10 6M4 8v13h16V8M8 21v-9h8v9M8 15h8M8 18h8',
  move: 'M3 7h17m-5-5 5 5-5 5M21 17H4m5 5-5-5 5-5',
  calendar: 'M4 5h16v16H4zM7 3v4m10-4v4M4 10h16m-11 5h3',
  qr: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zm6 0v3m-6 3h3m3 0h1',
  print: 'M7 9V3h10v6M7 17H3v-7h18v7h-4M7 14h10v7H7zm10-3h1',
  down: 'M12 3v12m-5-5 5 5 5-5M3 16v5h18v-5',
  up: 'M12 16V4m-5 5 5-5 5 5M3 16v5h18v-5',
  search: 'M15 15l6 6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  layers: 'm2 8 10-5 10 5-10 5zM2 12l10 5 10-5M2 16l10 5 10-5',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0m-5 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0',
  history: 'M3 11a9 9 0 1 1 2 7M3 4v7h7M12 7v5l4 2',
  barcode: 'M3 4v16m3-16v16m4-16v16m2-16v16m4-16v16m3-16v16m2-16v16',
  refresh: 'M20 7a8 8 0 0 0-14-1L3 9m0-5v5h5m-4 8a8 8 0 0 0 14 1l3-3m0 5v-5h-5',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h1m-1 6h1m-1 6h1',
  file: 'M5 3h9l5 5v13H5zM14 3v5h5M8 13h8m-8 4h6',
  edit: 'm4 16-1 5 5-1 12-12-4-4zM14 6l4 4',
  plus: 'M12 5v14M5 12h14',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12m12 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0',
  users: 'M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M14 8a4 4 0 1 0-8 0 4 4 0 0 0 8 0m3-3a4 4 0 0 1 0 7m1 3a4 4 0 0 1 3 4v2',
  tag: 'M3 4h8l10 10-7 7L3 10zM7 8h.01',
  link: 'm10 14 4-4m-6 6-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 1 1-1a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0',
  health: 'M8 3h8v5h5v8h-5v5H8v-5H3V8h5z',
  path: 'M4 4h5v5H4zM15 15h5v5h-5zM6.5 9v5a3.5 3.5 0 0 0 3.5 3.5h5M9 6.5h9v5',
  money: 'M2 5h20v14H2zM14.5 12a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0M5 9h1m12 6h1',
  close: 'm6 6 12 12M18 6 6 18',
  prev: 'm14 5-7 7 7 7',
  next: 'm9 5 7 7-7 7',
  photo: 'M3 4h18v16H3zM3 16l5-5 4 4 3-3 6 6M15 8h.01',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  check: 'm4 12 5 5 11-11',
  alert: 'm12 3 10 18H2zM12 9v5m0 3h.01'
};
function icon(key) {
  const svg = document.createElementNS(NS, 'svg');
  for (const [k, v] of Object.entries({
    viewBox: '0 0 24 24',
    width: '20',
    height: '20',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.7',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'aria-hidden': 'true'
  })) svg.setAttribute(k, v);
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', shapes[key] || shapes.list);
  svg.append(path);
  return svg;
}
function el(tag, attrs = {}, ...children) {
  const element = document.createElement(tag);
  for (const [name, val] of Object.entries(attrs)) {
    if (val == null || val === false) continue;
    if (name === 'class') element.className = val;else if (name.startsWith('on')) element.addEventListener(name.slice(2).toLowerCase(), val);else if (name === 'value') element.value = val;else element.setAttribute(name, val === true ? '' : String(val));
  }
  for (const child of children.flat(Infinity)) if (child != null && child !== false) element.append(child instanceof Node ? child : document.createTextNode(String(child)));
  return element;
}
const formatNumber = new Intl.NumberFormat('es-PE', {
  maximumFractionDigits: 3
});
const fmt = v => v == null || v === '' || !Number.isFinite(Number(v)) ? '—' : formatNumber.format(Number(v));
const clean = v => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
const words = v => clean(v).split(/\s+/).filter(Boolean);
const contains = (query, fields) => {
  const entry = clean(fields.join(' '));
  return words(query).every(word => entry.includes(word));
};
const dateLabel = value => String(value || '').replace(/^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/, '$3/$2/$1') || '—';
const textValue = value => value == null || value === '' ? '—' : String(value);
const numberSort = new Intl.Collator('es', {
  numeric: true,
  sensitivity: 'base'
}).compare;
const nowDay = () => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Lima',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return p.year + '-' + p.month + '-' + p.day;
};
const daysTo = (date, today) => /^\d{4}-\d{2}-\d{2}$/.test(date || '') ? Math.round((Date.parse(date + 'T00:00:00Z') - Date.parse(today + 'T00:00:00Z')) / 86400000) : null;
const nextExpiration = lots => lots.filter(l => l.exp && Number(l.balance) > 0).map(l => l.exp).sort()[0] || '';
const unique = list => [...new Set(list.filter(x => x !== '' && x != null))];
const btn = (label, glyph, action, tone = '', extra = {}) => el('button', {
  type: 'button',
  class: 'ix-button ' + tone,
  onclick: action,
  ...extra
}, glyph && icon(glyph), el('span', {}, label));
const badge = (value, tone = '') => el('span', {
  class: 'ix-badge ' + tone
}, value);
const heading = (label, glyph, tools) => el('div', {
  class: 'ix-cardhead'
}, el('h2', {}, glyph && icon(glyph), label), tools);
const stat = (label, value, glyph, tone, act) => {
  const attrs = {
    class: 'ix-stat ' + tone
  };
  if (act) Object.assign(attrs, {
    type: 'button',
    onclick: act
  });
  return el(act ? 'button' : 'div', attrs, el('span', {
    class: 'ix-stat-icon'
  }, icon(glyph)), el('span', {
    class: 'ix-stat-values'
  }, el('span', {}, label), el('strong', {}, fmt(value))));
};
const lineNotice = (text, tone = '') => el('p', {
  class: 'ix-notice ' + tone,
  role: tone === 'error' ? 'alert' : 'status'
}, text);
const codeTag = value => el('span', {
  class: 'ix-code'
}, textValue(value));
const formField = (label, control) => el('label', {
  class: 'ix-field'
}, el('span', {}, label), control);
const actionBar = (...items) => el('div', {
  class: 'ix-actions'
}, items);
const inputSearch = (value, placeholder, key, action) => el('div', {
  class: 'ix-searchbox'
}, icon('search'), el('input', {
  type: 'search',
  value,
  placeholder,
  'aria-label': placeholder,
  'data-focus': key,
  oninput: e => action(e.target.value)
}));
function selectFilter(value, choices, label, key, change) {
  const s = el('select', {
    'aria-label': label,
    'data-focus': key,
    onchange: e => change(e.target.value)
  }, choices.map(c => el('option', {
    value: c[0]
  }, c[1])));
  s.value = value;
  return s;
}
function navItems(items, active, change, label) {
  return el('nav', {
    class: 'ix-nav',
    'aria-label': label
  }, items.map(([key, text, glyph]) => btn(text, glyph, () => change(key), active === key ? 'is-current' : '', {
    'aria-current': active === key ? 'page' : null,
    'data-section': key,
    'data-focus': 'section-' + key
  })));
}
function makeTable(columns, rows, empty) {
  const thead = el('thead', {}, el('tr', {}, columns.map(c => el('th', {
    scope: 'col',
    class: c.num ? 'is-num' : null
  }, c.label))));
  const tbody = el('tbody', {}, rows.length ? rows.map(row => el('tr', {}, columns.map(c => el('td', {
    class: c.num ? 'is-num' : null
  }, c.cell(row))))) : el('tr', {}, el('td', {
    colspan: columns.length,
    class: 'ix-empty'
  }, empty)));
  return el('div', {
    class: 'ix-table-scroll',
    tabindex: '0',
    'aria-label': 'Tabla de resultados'
  }, el('table', {
    class: 'ix-table'
  }, thead, tbody));
}
function pageRows(rows, page, size) {
  const pages = Math.max(1, Math.ceil(rows.length / size));
  const current = Math.max(0, Math.min(page, pages - 1));
  return {
    rows: rows.slice(current * size, (current + 1) * size),
    current,
    pages,
    start: rows.length ? current * size + 1 : 0,
    end: Math.min((current + 1) * size, rows.length),
    total: rows.length
  };
}
function paginator(page, change) {
  return el('div', {
    class: 'ix-pager'
  }, el('span', {}, page.total ? page.start + '–' + page.end + ' de ' + fmt(page.total) : '0 resultados'), el('div', {}, btn('Anterior', 'prev', () => change(page.current - 1), 'ix-small', {
    disabled: page.current === 0
  }), btn('Siguiente', 'next', () => change(page.current + 1), 'ix-small', {
    disabled: page.current + 1 >= page.pages
  })));
}
function exportCsv(name, headers, rows) {
  const escape = item => {
    let text = String(item ?? '');
    // Conserva ceros y neutraliza expresiones al abrir el archivo en una hoja de cálculo.
    if (/^[\s]*[=+@\-\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  const lines = [headers, ...rows].map(row => row.map(escape).join(';')).join('\r\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF', lines], {
    type: 'text/csv;charset=utf-8;'
  }));
  const a = el('a', {
    href: url,
    download: 'Identical-' + name + '.csv'
  });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function safeHref(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && !u.username && !u.password ? u.href : '';
  } catch {
    return '';
  }
}
function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = bytes[6] & 15 | 64;
  bytes[8] = bytes[8] & 63 | 128;
  const a = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
  return [a.slice(0, 8), a.slice(8, 12), a.slice(12, 16), a.slice(16, 20), a.slice(20)].join('-');
}
const errorText = e => String(e?.message || e || 'No se pudo completar la operación.');
const kSections = [['home', 'Panel general', 'panel'], ['stock', 'Stock por almacén', 'store'], ['moves', 'Movimientos', 'move'], ['lots', 'Lotes y vencimientos', 'calendar'], ['codes', 'Códigos registrados', 'barcode'], ['qr', 'Etiquetas QR', 'qr']];
const masterLabels = {
  productos: ['Productos', 'box', 'Nuevo producto'],
  tipos: ['Tipos de ítem', 'tag', 'Nuevo tipo'],
  proveedores: ['Proveedores', 'users', 'Nuevo proveedor'],
  aprobaciones: ['Aprobaciones', 'path', 'Nuevo flujo'],
  sedes: ['Sedes', 'pin', 'Nueva sede'],
  sistemas: ['Sistemas vinculados', 'link', 'Nuevo sistema'],
  recurrentes: ['Pagos recurrentes', 'calendar', 'Nuevo servicio'],
  servicios: ['Servicios clínicos', 'health', 'Nuevo servicio clínico'],
  historial: ['Historial de cambios', 'history', 'Nuevo registro']
};
export function openModule(key, ctx) {
  const master = ['maestra', 'master', 'data-maestra', 'dataMaestra'].includes(key);
  const root = ctx.root;
  const wrap = el('section', {
    class: 'ix-module',
    'aria-label': master ? 'Data Maestra' : 'Kardex'
  });
  root.replaceChildren(wrap);
  const s = {
    area: master ? 'productos' : 'home',
    data: null,
    loading: false,
    error: '',
    notice: '',
    noticeTone: '',
    page: 0,
    query: '',
    warehouse: '',
    filter: '',
    item: '',
    selected: '',
    selectedDetail: null,
    lookupId: 0,
    looking: false,
    searchError: '',
    dialog: null,
    closed: false,
    lastSuccess: 0,
    busy: false
  };
  let refreshAgain = false;
  const state = {
    s,
    ctx,
    wrap,
    master,
    render,
    refresh,
    goTab,
    interact,
    dialog,
    closeDialog,
    qr,
    lookup
  };
  const focus = () => wrap.contains(document.activeElement) ? document.activeElement : null;
  function render() {
    if (s.closed) return;
    const previous = focus(),
      key = previous?.dataset.focus;
    const selection = key && typeof previous.selectionStart === 'number' ? [previous.selectionStart, previous.selectionEnd] : null;
    const navX = wrap.querySelector('.ix-nav')?.scrollLeft || 0;
    const scrolls = [...wrap.querySelectorAll('.ix-table-scroll')].map(x => x.scrollLeft);
    const title = master ? 'Data Maestra' : 'Kardex';
    const head = el('header', {
      class: 'ix-pagehead'
    }, el('div', {
      class: 'ix-title'
    }, el('span', {
      class: 'ix-title-icon'
    }, icon(master ? 'layers' : 'box')), el('h1', {}, title)), el('div', {
      class: 'ix-head-actions'
    }, s.lastSuccess ? el('span', {
      class: 'ix-asof'
    }, 'Actualizado ', new Intl.DateTimeFormat('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Lima'
    }).format(new Date(s.lastSuccess))) : null, btn(s.loading ? 'Actualizando…' : 'Actualizar', 'refresh', () => refresh(true), 'ix-small', {
      disabled: s.loading,
      'data-focus': 'update'
    })));
    const parts = [head];
    if (s.notice) parts.push(lineNotice(s.notice, s.noticeTone));
    if (s.error) parts.push(lineNotice(s.error, 'error'));
    if (!s.data) {
      if (s.loading) parts.push(el('div', {
        class: 'ix-loading',
        role: 'status'
      }, el('span', {
        class: 'ix-spinner',
        'aria-hidden': true
      }), 'Consultando Google Sheets…'));
    } else if (master) parts.push(...masterView(state));else parts.push(...kardexView(state));
    wrap.replaceChildren(...parts);
    const nav = wrap.querySelector('.ix-nav');
    if (nav) nav.scrollLeft = navX;
    [...wrap.querySelectorAll('.ix-table-scroll')].forEach((x, i) => x.scrollLeft = scrolls[i] || 0);
    if (key) {
      const next = [...wrap.querySelectorAll('[data-focus]')].find(x => x.dataset.focus === key);
      if (next) {
        next.focus({
          preventScroll: true
        });
        if (selection && next.setSelectionRange) try {
          next.setSelectionRange(...selection);
        } catch {}
      }
    }
  }
  function interact(patch) {
    Object.assign(s, {
      page: 0
    }, patch);
    render();
  }
  function goTab(area, extra = {}) {
    s.lookupId++;
    Object.assign(s, {
      area,
      query: '',
      filter: '',
      page: 0,
      notice: '',
      searchError: '',
      item: '',
      looking: false,
      selectedDetail: null
    }, extra);
    render();
    const nav = wrap.querySelector('[aria-current=page]');
    if (nav) {
      const box = nav.parentElement;
      if (nav.offsetLeft < box.scrollLeft || nav.offsetLeft + nav.offsetWidth > box.scrollLeft + box.clientWidth) box.scrollLeft = nav.offsetLeft;
    }
  }
  function qr(section, params = {}) {
    ctx.go('qr', {
      section,
      ...params
    });
  }
  async function refresh(manual = false) {
    if (s.closed || !manual && (s.dialog || s.busy)) return;
    if (s.loading) {
      if (manual) refreshAgain = true;
      return;
    }
    s.loading = true;
    if (manual || !s.data) s.error = '';
    if (manual || !s.data) render();
    try {
      const data = await ctx.rpc(master ? 'master.snapshot' : 'kardex.snapshot', {});
      if (s.closed) return;
      if (master ? !Array.isArray(data?.sections) : !Array.isArray(data?.movements)) throw new Error('La hoja devolvió una respuesta incompleta. Vuelve a actualizar.');
      if (!master) {
        const options = data.warehouseOptions?.length ? data.warehouseOptions : data.warehouses || [];
        data.warehouses = options.map(w => typeof w === 'string' ? {
          value: w,
          label: w
        } : w);
      }
      s.data = data;
      s.lastSuccess = Date.now();
      s.error = '';
      if (master && !data.sections.some(a => a.key === s.area)) s.area = data.sections[0]?.key || 'productos';
      if (!master && s.selectedDetail) {
        s.selectedDetail = null;
        s.searchError = '';
      }
      ctx.onStatus?.('Sincronizado');
    } catch (e) {
      if (!s.closed) {
        s.error = 'No se pudo actualizar. ' + errorText(e);
        ctx.onStatus?.('Pendiente de sincronizar');
      }
    } finally {
      if (!s.closed) {
        s.loading = false;
        render();
        if (refreshAgain) {
          refreshAgain = false;
          refresh(true);
        }
      }
    }
  }
  function dialog(title, content, actions = [], onClose) {
    if (s.dialog) closeDialog();
    const prior = document.activeElement,
      titleId = 'ix-title-' + uuid(),
      body = el('div', {
        class: 'ix-dialog-content'
      }, content);
    const d = el('dialog', {
      class: 'ix-dialog',
      'aria-labelledby': titleId
    }, el('div', {
      class: 'ix-dialog-head'
    }, el('h2', {
      id: titleId
    }, title), btn('Cerrar', 'close', () => closeDialog(), 'ix-icon', {
      title: 'Cerrar'
    })), body, el('div', {
      class: 'ix-dialog-foot'
    }, actions));
    s.dialog = {
      node: d,
      onClose,
      prior
    };
    document.body.append(d);
    d.addEventListener('cancel', e => {
      e.preventDefault();
      closeDialog();
    });
    d.addEventListener('click', e => {
      if (e.target === d && !s.busy) {
        const r = d.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeDialog();
      }
    });
    d.showModal();
    return body;
  }
  function closeDialog(force = false) {
    if (!s.dialog || s.busy && !force) return;
    const old = s.dialog;
    s.dialog = null;
    old.node.close();
    old.node.remove();
    old.onClose?.();
    if (old.prior?.isConnected) old.prior.focus({
      preventScroll: true
    });
  }
  async function lookup(code) {
    const cleanCode = String(code || '').trim();
    if (!cleanCode) return;
    const gen = ++s.lookupId;
    s.looking = true;
    s.searchError = '';
    s.item = cleanCode;
    s.selectedDetail = null;
    render();
    try {
      const data = await ctx.rpc('kardex.stock', {
        code: cleanCode
      });
      if (s.closed || gen !== s.lookupId) return;
      if (!data?.product && !data?.lots?.length && !data?.warehouses?.length) {
        s.item = '';
        s.searchError = 'No se encontró ese código en el catálogo ni en los movimientos.';
      } else s.selectedDetail = data;
    } catch (e) {
      if (!s.closed && gen === s.lookupId) {
        s.item = '';
        s.searchError = errorText(e);
      }
    } finally {
      if (!s.closed && gen === s.lookupId) {
        s.looking = false;
        render();
      }
    }
  }
  function onVisible() {
    if (document.visibilityState === 'visible' && Date.now() - s.lastSuccess > 30000) refresh();
  }
  const timer = setInterval(() => {
    if (document.visibilityState === 'visible') refresh();
  }, 60000);
  document.addEventListener('visibilitychange', onVisible);
  const stop = () => {
    if (s.closed) return;
    s.closed = true;
    clearInterval(timer);
    document.removeEventListener('visibilitychange', onVisible);
    ctx.signal?.removeEventListener('abort', stop);
    closeDialog(true);
  };
  ctx.signal?.addEventListener('abort', stop, {
    once: true
  });
  if (ctx.signal?.aborted) {
    stop();
    return stop;
  }
  refresh(true);
  return stop;
}
const kardexIndexes = new WeakMap();
function kardexIndex(data) {
  if (kardexIndexes.has(data)) return kardexIndexes.get(data);
  const products = new Map(),
    byCodeLots = new Map(),
    byCodeStock = new Map();
  for (const row of [...(data.products || []), ...(data.registered || []), ...(data.stock || []), ...(data.lots || [])]) {
    const k = clean(row.code);
    if (k && !products.has(k)) products.set(k, {
      code: row.code,
      description: row.description,
      unit: row.unit
    });
  }
  const group = (map, row) => {
    const code = clean(row.code);
    if (!map.has(code)) map.set(code, []);
    map.get(code).push(row);
  };
  for (const lot of data.lots || []) group(byCodeLots, lot);
  for (const entry of data.stock || []) group(byCodeStock, entry);
  const lookup = [...products.values()].map(p => {
    const lots = byCodeLots.get(clean(p.code)) || [];
    return {
      p,
      text: clean([p.code, p.description, ...lots.map(l => l.lot)].join(' '))
    };
  });
  const latest = [...(data.movements || [])].sort((a, b) => String(b.dateTime || b.date || '').localeCompare(String(a.dateTime || a.date || '')) || Number(b.row || 0) - Number(a.row || 0));
  const index = {
    products,
    byCodeLots,
    byCodeStock,
    lookup,
    latest
  };
  kardexIndexes.set(data, index);
  return index;
}
const card = (...nodes) => el('section', {
  class: 'ix-card'
}, nodes);
const warehouseName = (d, v) => d.warehouses?.find(w => clean(w.value) === clean(v))?.label || textValue(v);
const inWarehouse = (selected, value) => !selected || clean(value) === clean(selected);
function warehouses(c) {
  const {
    s
  } = c;
  return selectFilter(s.warehouse, [['', 'Todos los almacenes'], ...(s.data.warehouses || []).map(w => [w.value, w.label])], 'Filtrar por almacén', 'warehouse', v => c.interact({
    warehouse: v
  }));
}
function modeInfo(m) {
  const name = String(m.mode || m.source || 'Movimiento');
  const key = clean(name);
  return key.includes('trasla') ? ['Traslado', 'violet'] : key.includes('salid') || key === 'out' ? ['Salida', 'blue'] : key.includes('ingre') || key === 'in' ? ['Ingreso', 'green'] : [name, ''];
}
function expiryInfo(date, today) {
  const days = daysTo(date, today);
  if (days == null) return ['Sin fecha', 'muted', 'none'];
  if (days < 0) return ['Vencido', 'red', 'expired'];
  if (days <= 90) return [days === 0 ? 'Vence hoy' : 'En ' + days + ' días', 'amber', 'soon'];
  return ['Vigente', 'green', 'current'];
}
function quickCode(c, p) {
  const selected = p.code;
  c.goTab('home', {
    item: selected,
    query: String(selected),
    searchError: '',
    looking: false,
    selectedDetail: null
  });
}
function codeLink(c, row) {
  return el('button', {
    type: 'button',
    class: 'ix-code ix-code-link',
    onclick: () => quickCode(c, row)
  }, textValue(row.code));
}
function lotActions(c, row) {
  const params = {
    code: row.code,
    warehouse: row.warehouse,
    lot: row.lot,
    location: row.location,
    exp: row.exp
  };
  return actionBar(btn('Salida', 'up', () => c.qr('salida', params), 'ix-small'), btn('Traslado', 'move', () => c.qr('traslado', params), 'ix-small'));
}
function quickResult(c, index, product) {
  const {
      s
    } = c,
    key = clean(product.code),
    detail = s.selectedDetail;
  const allLots = detail ? (detail.lots || []).map(l => ({
    ...l,
    code: product.code
  })) : index.byCodeLots.get(key) || [];
  const entries = (detail ? detail.warehouses || [] : index.byCodeStock.get(key) || []).filter(r => inWarehouse(s.warehouse, r.warehouse));
  const lots = allLots.filter(l => inWarehouse(s.warehouse, l.warehouse) && Number(l.balance) > 0).sort((a, b) => String(a.exp || '9999').localeCompare(String(b.exp || '9999')) || numberSort(a.location, b.location));
  const balance = entries.reduce((n, r) => n + (Number(r.balance) || 0), 0);
  const nearest = nextExpiration(lots);
  const params = {
    code: product.code,
    warehouse: s.warehouse
  };
  return el('div', {
    class: 'ix-quick-result'
  }, el('div', {
    class: 'ix-product-line'
  }, el('span', {
    class: 'ix-quick-icon'
  }, icon('box')), el('div', {}, codeTag(product.code), el('h3', {}, textValue(product.description)))), el('dl', {
    class: 'ix-kv-inline'
  }, el('div', {}, el('dt', {}, 'Stock'), el('dd', {}, fmt(balance) + ' ' + (product.unit || ''))), el('div', {}, el('dt', {}, 'Ubicación'), el('dd', {}, unique(lots.map(l => l.location)).join(' · ') || '—')), el('div', {}, el('dt', {}, 'Primer vencimiento'), el('dd', {}, dateLabel(nearest)))), actionBar(btn('Registrar ingreso', 'down', () => c.qr('ingreso', params), 'ix-small ix-primary'), btn('Registrar salida', 'up', () => c.qr('salida', params), 'ix-small'), btn('Trasladar', 'move', () => c.qr('traslado', params), 'ix-small'), btn('Ver lotes', 'layers', () => c.goTab('lots', {
    query: String(product.code)
  }), 'ix-small')), detail?.pending > 0 ? lineNotice('Movimientos con lote u origen pendiente para este código: ' + fmt(detail.pending) + '.', 'warning') : null, lots.length ? makeTable([{
    label: 'Almacén',
    cell: r => warehouseName(s.data, r.warehouse)
  }, {
    label: 'Lote',
    cell: r => textValue(r.lot)
  }, {
    label: 'Ubicación',
    cell: r => textValue(r.location)
  }, {
    label: 'Vence',
    cell: r => dateLabel(r.exp)
  }, {
    label: 'Saldo',
    num: true,
    cell: r => fmt(r.balance)
  }, {
    label: 'Acciones',
    cell: r => lotActions(c, r)
  }], lots.slice(0, 4), '') : el('p', {
    class: 'ix-empty-inline'
  }, 'Sin lotes con saldo en este almacén.'), lots.length > 4 ? btn('Ver los ' + fmt(lots.length) + ' lotes', 'next', () => c.goTab('lots', {
    query: String(product.code)
  }), 'ix-text') : null);
}
function quickPanel(c, index) {
  const {
    s
  } = c;
  const q = clean(s.query),
    tokens = words(q);
  const matches = tokens.length ? index.lookup.filter(item => tokens.every(t => item.text.includes(t))).map(i => i.p) : [];
  const exact = index.products.get(q);
  const found = s.selectedDetail?.product || index.products.get(clean(s.item)) || exact;
  function queryChange(value) {
    s.lookupId++;
    c.interact({
      query: value,
      item: '',
      looking: false,
      selectedDetail: null,
      searchError: ''
    });
  }
  function submit(e) {
    e.preventDefault();
    if (!q || s.looking) return;
    if (exact || matches.length === 1) c.lookup((exact || matches[0]).code);else if (!matches.length) c.lookup(s.query);else c.wrap.querySelector('.ix-suggestions button')?.focus();
  }
  const form = el('form', {
    class: 'ix-finder',
    onsubmit: submit
  }, inputSearch(s.query, 'Código, producto o lote', 'quick-search', queryChange), warehouses(c), el('button', {
    type: 'submit',
    class: 'ix-button ix-primary',
    disabled: s.looking || !q
  }, icon('search'), s.looking ? 'Buscando…' : 'Consultar'));
  let body;
  if (s.looking) body = lineNotice('Consultando el catálogo…');else if (s.searchError) body = lineNotice(s.searchError, 'error');else if (found) body = quickResult(c, index, found);else if (s.selectedDetail) body = quickResult(c, index, {
    code: s.selectedDetail.code,
    description: '',
    unit: ''
  });else if (matches.length) body = el('div', {
    class: 'ix-suggestions'
  }, matches.slice(0, 8).map(p => el('button', {
    type: 'button',
    onclick: () => quickCode(c, p)
  }, codeTag(p.code), el('span', {}, p.description), icon('next'))), matches.length > 8 ? el('p', {
    class: 'ix-hint'
  }, 'Hay ' + fmt(matches.length) + ' coincidencias. Escribe más para afinar la búsqueda.') : null);else if (q) body = el('p', {
    class: 'ix-empty-inline'
  }, 'Sin coincidencias en los movimientos. Pulsa Consultar para buscar el código en Productos.');else body = el('div', {
    class: 'ix-search-empty'
  }, el('span', {}, icon('pin')), el('div', {}, el('strong', {}, 'Consulta ubicaciones, lotes y saldos'), el('p', {}, 'Busca un producto para registrar su ingreso, salida o traslado.')));
  return card(heading('Consulta rápida de stock', 'search'), form, body);
}
function quickWarehouse(c) {
  const d = c.s.data;
  const items = (d.warehouses || []).map(w => {
    const positions = (d.stock || []).filter(r => clean(r.warehouse) === clean(w.value) && Number(r.balance) > 0);
    return {
      w,
      count: new Set(positions.map(r => clean(r.code))).size
    };
  });
  return card(heading('Stock por almacén', 'store'), el('div', {
    class: 'ix-list'
  }, items.length ? items.map(({
    w,
    count
  }) => el('button', {
    type: 'button',
    class: 'ix-side-row',
    onclick: () => c.goTab('stock', {
      warehouse: w.value
    })
  }, el('span', {}, w.label), el('span', {
    class: 'ix-side-count'
  }, fmt(count) + ' cód.', icon('next')))) : el('p', {
    class: 'ix-empty-inline'
  }, 'Sin almacenes registrados.')));
}
function moveCols(c, short = false) {
  const d = c.s.data;
  const base = [{
    label: 'Fecha',
    cell: r => dateLabel(r.date)
  }, {
    label: 'Código',
    cell: r => codeLink(c, r)
  }, {
    label: 'Producto',
    cell: r => textValue(r.description)
  }, {
    label: 'Movimiento',
    cell: r => badge(...modeInfo(r))
  }, {
    label: 'Cantidad',
    num: true,
    cell: r => fmt(r.amount) + ' ' + (r.unit || '')
  }];
  if (!short) base.push({
    label: 'Origen',
    cell: r => warehouseName(d, r.origin)
  }, {
    label: 'Destino',
    cell: r => warehouseName(d, r.destination)
  }, {
    label: 'Ubicación',
    cell: r => textValue(r.location)
  }, {
    label: 'Ubicación destino',
    cell: r => textValue(r.destinationLocation)
  }, {
    label: 'Lote',
    cell: r => textValue(r.lot)
  }, {
    label: 'Vencimiento',
    cell: r => dateLabel(r.exp)
  }, {
    label: 'Responsable',
    cell: r => textValue(r.responsible)
  }, {
    label: 'Motivo',
    cell: r => textValue(r.reason)
  }, {
    label: 'Documento',
    cell: r => textValue(r.document)
  });
  return base;
}
function kTables(c, index) {
  const {
      s
    } = c,
    d = s.data,
    today = nowDay(),
    area = s.area;
  let rows = [],
    cols = [],
    raw = [],
    filter,
    extra;
  const csvFields = keys => r => keys.map(k => r[k] ?? '');
  if (area === 'moves') {
    const modes = unique(index.latest.map(r => modeInfo(r)[0])).sort(numberSort);
    rows = index.latest.filter(r => (!s.warehouse || inWarehouse(s.warehouse, r.origin) || inWarehouse(s.warehouse, r.destination)) && (!s.filter || modeInfo(r)[0] === s.filter) && contains(s.query, [r.code, r.description, r.lot, r.responsible, r.document, r.location, r.destinationLocation]));
    cols = moveCols(c);
    raw = r => [r.date, r.code, r.description, modeInfo(r)[0], String(r.amount ?? '') + ' ' + (r.unit || ''), r.origin, r.destination, r.location, r.destinationLocation, r.lot, r.exp, r.responsible, r.reason, r.document];
    filter = selectFilter(s.filter, [['', 'Todos los movimientos'], ...modes.map(m => [m, m])], 'Tipo de movimiento', 'kind', v => c.interact({
      filter: v
    }));
    extra = btn('Historial QR', 'history', () => c.qr('history'), 'ix-small');
  } else if (area === 'lots') {
    rows = (d.lots || []).filter(r => Number(r.balance) > 0 && inWarehouse(s.warehouse, r.warehouse) && (!s.filter || expiryInfo(r.exp, today)[2] === s.filter) && contains(s.query, [r.code, r.description, r.lot, r.location])).sort((a, b) => String(a.exp || '9999').localeCompare(String(b.exp || '9999')) || numberSort(a.code, b.code));
    cols = [{
      label: 'Código',
      cell: r => codeLink(c, r)
    }, {
      label: 'Producto',
      cell: r => textValue(r.description)
    }, {
      label: 'Almacén',
      cell: r => warehouseName(d, r.warehouse)
    }, {
      label: 'Ubicación',
      cell: r => textValue(r.location)
    }, {
      label: 'Lote',
      cell: r => textValue(r.lot)
    }, {
      label: 'Vencimiento',
      cell: r => dateLabel(r.exp)
    }, {
      label: 'Estado',
      cell: r => badge(...expiryInfo(r.exp, today).slice(0, 2))
    }, {
      label: 'Saldo',
      num: true,
      cell: r => fmt(r.balance) + ' ' + (r.unit || '')
    }, {
      label: 'Acciones',
      cell: r => lotActions(c, r)
    }];
    raw = r => [r.code, r.description, r.warehouse, r.location, r.lot, r.exp, expiryInfo(r.exp, today)[0], String(r.balance ?? '') + ' ' + (r.unit || '')];
    filter = selectFilter(s.filter, [['', 'Todos los vencimientos'], ['expired', 'Vencidos'], ['soon', 'Próximos 90 días'], ['current', 'Más de 90 días'], ['none', 'Sin fecha']], 'Filtrar vencimiento', 'expiry', v => c.interact({
      filter: v
    }));
  } else if (area === 'codes') {
    rows = (d.registered || []).filter(r => contains(s.query, [r.code, r.description, r.unit])).sort((a, b) => numberSort(a.code, b.code));
    cols = [{
      label: 'Código',
      cell: r => codeLink(c, r)
    }, {
      label: 'Producto',
      cell: r => textValue(r.description)
    }, {
      label: 'U.M.',
      cell: r => textValue(r.unit)
    }];
    raw = csvFields(['code', 'description', 'unit']);
  } else {
    rows = (d.stock || []).filter(r => inWarehouse(s.warehouse, r.warehouse) && contains(s.query, [r.code, r.description, r.warehouse])).sort((a, b) => numberSort(a.code, b.code) || numberSort(a.warehouse, b.warehouse));
    function lots(r) {
      return (index.byCodeLots.get(clean(r.code)) || []).filter(l => inWarehouse(r.warehouse, l.warehouse) && Number(l.balance) > 0);
    }
    cols = [{
      label: 'Código',
      cell: r => codeLink(c, r)
    }, {
      label: 'Producto',
      cell: r => textValue(r.description)
    }, {
      label: 'U.M.',
      cell: r => textValue(r.unit)
    }, {
      label: 'Almacén',
      cell: r => warehouseName(d, r.warehouse)
    }, {
      label: 'Stock',
      num: true,
      cell: r => fmt(r.balance)
    }, {
      label: 'Ubicación',
      cell: r => unique(lots(r).map(l => l.location)).join(' · ') || '—'
    }, {
      label: 'Primer vencimiento',
      cell: r => dateLabel(nextExpiration(lots(r)))
    }];
    raw = r => [r.code, r.description, r.unit, r.warehouse, r.balance, unique(lots(r).map(l => l.location)).join(' · '), nextExpiration(lots(r))];
  }
  const page = pageRows(rows, s.page, 18),
    spec = kSections.find(a => a[0] === area) || kSections[1],
    printable = cols.filter(x => x.label !== 'Acciones');
  const exportBtn = btn('Exportar', 'down', () => exportCsv(spec[1], printable.map(x => x.label), rows.map(raw)), 'ix-small', {
    disabled: !rows.length
  });
  return card(heading(spec[1], spec[2], actionBar(extra, exportBtn)), el('div', {
    class: 'ix-filters'
  }, inputSearch(s.query, area === 'codes' ? 'Buscar código o producto' : 'Buscar en los resultados', 'table-search', v => c.interact({
    query: v
  })), area !== 'codes' ? warehouses(c) : null, filter), area === 'lots' && d.pendingCount > 0 ? lineNotice('Hay ' + fmt(d.pendingCount) + ' movimientos con datos de lote u origen pendientes en Kardex.', 'warning') : null, makeTable(cols, page.rows, 'No hay registros que coincidan con los filtros.'), paginator(page, p => c.interact({
    page: p
  })));
}
function qrTools(c) {
  const actions = [['scan', 'Escanear QR', 'qr'], ['ingreso', 'Registrar ingreso', 'down'], ['salida', 'Registrar salida', 'up'], ['consumo', 'Salida por consumo', 'up'], ['traslado', 'Registrar traslado', 'move'], ['labels', 'Etiquetas de productos', 'print'], ['locations', 'Etiquetas de ubicaciones', 'pin'], ['history', 'Historial QR', 'history'], ['base', 'Catálogo QR', 'barcode']];
  return card(heading('Herramientas QR', 'qr'), el('div', {
    class: 'ix-tool-grid'
  }, actions.map(([k, l, g]) => el('button', {
    type: 'button',
    class: 'ix-tool',
    onclick: () => c.qr(k)
  }, el('span', {
    class: 'ix-tool-icon'
  }, icon(g)), el('strong', {}, l), icon('next')))));
}
function kardexView(c) {
  const {
      s
    } = c,
    d = s.data,
    index = kardexIndex(d),
    stats = d.stats || {};
  const result = [navItems(kSections, s.area, k => c.goTab(k), 'Secciones de Kardex')];
  if (s.area === 'qr') return [...result, qrTools(c)];
  if (s.area !== 'home') return [...result, kTables(c, index)];
  result.push(el('div', {
    class: 'ix-stats'
  }, stat('Códigos registrados', stats.registered ?? d.registered?.length, 'box', 'mint', () => c.goTab('codes')), stat('Almacenes', d.warehouses?.length, 'store', 'sky', () => c.goTab('stock', {
    warehouse: ''
  })), stat('Movimientos', stats.movements ?? d.movements?.length, 'move', 'lilac', () => c.goTab('moves', {
    warehouse: ''
  })), stat('Vencen en 90 días', stats.nearExpiry, 'calendar', 'peach', () => c.goTab('lots', {
    filter: 'soon',
    warehouse: ''
  }))), el('div', {
    class: 'ix-operation-bar'
  }, btn('Nuevo ingreso', 'down', () => c.qr('ingreso'), 'ix-green'), btn('Nueva salida', 'up', () => c.qr('salida'), 'ix-blue'), btn('Trasladar', 'move', () => c.qr('traslado')), btn('Escanear QR', 'qr', () => c.qr('scan'), 'ix-outlined')), el('div', {
    class: 'ix-columns'
  }, quickPanel(c, index), quickWarehouse(c)), card(heading('Últimos movimientos', 'history', btn('Ver todos', 'next', () => c.goTab('moves', {
    warehouse: ''
  }), 'ix-text')), makeTable(moveCols(c, true), index.latest.slice(0, 6), 'Todavía no hay movimientos registrados.')));
  return result;
}
const masterDisplay = {
  productos: [1, 2, 4, 3, 6],
  tipos: [0, 1, 2, 3],
  proveedores: [1, 2, 3, 4, 7],
  aprobaciones: [0, 1, 2, 3, 4],
  sedes: [0, 1, 2],
  sistemas: [0, 2, 3, 4],
  recurrentes: [2, 4, 5, 6, 8, 9, 10, 14],
  servicios: [0, 1, 2, 3, 4],
  historial: [0, 1, 2, 3, 4, 6]
};
const masterStateIndex = {
  productos: 6,
  tipos: 3,
  proveedores: 7,
  aprobaciones: 4,
  sedes: 2,
  sistemas: 3,
  recurrentes: 14
};
function rowLabel(section, row) {
  const byKey = {
    productos: [1, 2],
    tipos: [1],
    proveedores: [2, 3],
    aprobaciones: [0],
    sedes: [1],
    sistemas: [0],
    recurrentes: [2],
    servicios: [2, 3],
    historial: [0, 2]
  };
  return (byKey[section.key] || [0]).map(i => row.cells[i]).filter(Boolean).join(' · ') || row.id || section.title;
}
function displayCell(section, row, i) {
  const field = section.fields?.find(f => f.index === i),
    value = row.cells[i];
  if (value == null || value === '') {
    if (section.key === 'servicios' && i === 1 && row.group) return row.group;
    return '—';
  }
  if (i === masterStateIndex[section.key]) {
    const positive = ['activo', 'si', 'yes'].includes(clean(value)),
      negative = ['inactivo', 'no'].includes(clean(value));
    return badge(value, positive ? 'green' : negative ? 'muted' : '');
  }
  if (field?.type === 'date') return dateLabel(value);
  if (field?.type === 'number') return fmt(value);
  if (field?.type === 'url') {
    const href = safeHref(value);
    return href ? el('a', {
      href,
      target: '_blank',
      rel: 'noopener noreferrer'
    }, 'Ver imagen') : textValue(value);
  }
  return textValue(value);
}
function masterView(c) {
  const {
      s
    } = c,
    sections = s.data.sections;
  const active = sections.find(a => a.key === s.area);
  if (!active) return [lineNotice('La hoja no contiene secciones para consultar.')];
  const nav = navItems(sections.map(sec => [sec.key, masterLabels[sec.key]?.[0] || sec.title, masterLabels[sec.key]?.[1] || 'layers']), active.key, k => c.goTab(k), 'Secciones de Data Maestra');
  const stats = el('div', {
    class: 'ix-stats'
  }, [['productos', 'Productos', 'box', 'sky'], ['proveedores', 'Proveedores', 'users', 'mint'], ['tipos', 'Tipos de ítem', 'tag', 'lilac'], ['recurrentes', 'Pagos recurrentes', 'calendar', 'peach']].map(([k, label, g, tone]) => {
    const thisSection = sections.find(x => x.key === k);
    return thisSection ? stat(label, thisSection.rows.length, g, tone, () => c.goTab(k)) : null;
  }));
  const stateIndex = masterStateIndex[active.key],
    states = stateIndex === undefined ? [] : unique(active.rows.map(r => r.cells[stateIndex])).sort(numberSort);
  let rows = active.rows.filter(r => (!s.filter || clean(r.cells[stateIndex]) === clean(s.filter)) && contains(s.query, [...r.cells, r.group || '']));
  if (active.key === 'historial') rows = rows.slice().reverse();
  const defs = (masterDisplay[active.key] || active.headers.map((_, i) => i)).filter(i => i < active.headers.length);
  const editable = active.editable || [];
  const cols = defs.map(i => ({
    label: active.headers[i] || 'Campo ' + (i + 1),
    num: active.fields?.[i]?.type === 'number',
    cell: r => active.key === 'productos' && i === 1 ? el('button', {
      type: 'button',
      class: 'ix-code ix-code-link',
      onclick: () => masterDetails(c, active, r)
    }, r.cells[i]) : displayCell(active, r, i)
  }));
  cols.push({
    label: 'Acciones',
    cell: r => actionBar(btn('Ver', 'eye', () => masterDetails(c, active, r), 'ix-small'), editable.length && r.id && editable.some(i => !(r.locked || []).includes(i)) ? btn('Editar', 'edit', () => editMaster(c, active, r), 'ix-small') : null)
  });
  const tools = actionBar(active.canCreate ? btn(masterLabels[active.key]?.[2] || 'Nuevo registro', 'plus', () => editMaster(c, active, null), 'ix-primary') : null, active.key === 'productos' ? btn('Sincronizar', 'refresh', () => syncMaster(c), 'ix-small') : null, btn('Exportar', 'down', () => exportCsv(active.title, active.headers, rows.map(r => r.cells)), 'ix-small', {
    disabled: !rows.length
  }));
  const page = pageRows(rows, s.page, 15);
  return [nav, stats, card(heading(active.title, masterLabels[active.key]?.[1] || 'layers', tools), el('div', {
    class: 'ix-filters'
  }, inputSearch(s.query, active.key === 'productos' ? 'Buscar código, producto o tipo de ítem' : 'Buscar en ' + active.title.toLowerCase(), 'master-search', v => c.interact({
    query: v
  })), states.length ? selectFilter(s.filter, [['', 'Todos los estados'], ...states.map(x => [x, x])], 'Filtrar por estado', 'master-filter', v => c.interact({
    filter: v
  })) : null), makeTable(cols, page.rows, 'No hay registros que coincidan con la búsqueda.'), paginator(page, p => c.interact({
    page: p
  })))];
}
function detailEdit(c, section, row, focusIndex) {
  c.closeDialog();
  editMaster(c, section, row, focusIndex);
}
function masterDetails(c, section, row) {
  const editable = section.editable || [],
    locked = row.locked || [];
  const pairs = section.headers.map((label, i) => el('div', {}, el('dt', {}, label), el('dd', {}, displayCell(section, row, i))));
  const actions = [];
  if (section.key === 'productos' && row.id) {
    if (!locked.includes(1) && editable.includes(1)) actions.push(btn('Cambiar código', 'barcode', () => detailEdit(c, section, row, 1), 'ix-small'));
    if (!locked.includes(2) && editable.includes(2)) actions.push(btn('Cambiar descripción', 'edit', () => detailEdit(c, section, row, 2), 'ix-small'));
    if (!locked.includes(5) && editable.includes(5) && clean(row.cells[6]) !== 'inactivo') actions.push(btn('Subir imagen', 'photo', () => {
      c.closeDialog();
      photoMaster(c, section, row);
    }, 'ix-small'));
    if (!locked.includes(6) && editable.includes(6) && clean(row.cells[6]) === 'activo') actions.push(btn('Desactivar', 'close', () => {
      c.closeDialog();
      confirmMaster(c, section, row, false);
    }, 'ix-small'));
  }
  if (section.canDelete && row.id) actions.push(btn('Eliminar', 'trash', () => {
    c.closeDialog();
    confirmMaster(c, section, row, true);
  }, 'ix-small ix-danger'));
  c.dialog(rowLabel(section, row), el('div', {}, el('dl', {
    class: 'ix-details'
  }, pairs), actions.length ? el('div', {
    class: 'ix-detail-actions'
  }, actionBar(...actions)) : null), [btn('Cerrar', null, () => c.closeDialog()), editable.some(i => !locked.includes(i)) && row.id ? btn('Editar', 'edit', () => detailEdit(c, section, row), 'ix-primary') : null]);
}
function masterWrite(c, method, button, errorBox, progress, success) {
  let requestId = '',
    signature = '';
  return async function (payload) {
    if (c.s.busy || c.s.closed) return;
    const current = JSON.stringify(payload);
    if (current !== signature || !requestId) {
      requestId = uuid();
      signature = current;
    }
    c.s.busy = true;
    const modal = c.s.dialog?.node,
      original = button.lastElementChild?.textContent;
    const enabled = modal ? [...modal.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled)')] : [];
    for (const field of enabled) field.disabled = true;
    errorBox.textContent = '';
    button.setAttribute('aria-busy', 'true');
    if (button.lastElementChild) button.lastElementChild.textContent = progress;
    try {
      const result = await c.ctx.rpc(method, {
        ...payload,
        requestId
      });
      if (c.s.closed) return;
      if (!result?.ok) throw Error(result?.error || 'La hoja no confirmó la operación.');
      c.s.busy = false;
      c.closeDialog();
      const warnings = (Array.isArray(result.warnings) ? result.warnings : []).map(String);
      c.s.notice = success + (warnings.length ? ' ' + warnings.join(' ') : '');
      c.s.noticeTone = warnings.length ? 'warning' : '';
      await c.refresh(true);
    } catch (e) {
      if (!c.s.closed) {
        errorBox.textContent = errorText(e);
        errorBox.focus();
      }
    } finally {
      if (!c.s.closed) {
        c.s.busy = false;
        enabled.forEach(field => field.disabled = false);
        button.removeAttribute('aria-busy');
        if (button.lastElementChild) button.lastElementChild.textContent = original;
      }
    }
  };
}
function formError() {
  return el('div', {
    class: 'ix-form-error',
    role: 'alert',
    tabindex: '-1'
  });
}
function editMaster(c, section, row, focusIndex) {
  if (!row && !section.canCreate) return;
  const models = (section.fields || []).filter(f => (section.editable || []).includes(f.index) && !f.readOnly && !(row?.locked || []).includes(f.index));
  if (!models.length) return;
  const controls = new Map(),
    initial = new Map(),
    suggestions = [];
  const fields = models.map(f => {
    const i = f.index,
      old = row ? row.cells[i] : f.default;
    const value = f.sensitive ? '' : String(old ?? '');
    const name = section.headers[i] || 'Campo ' + (i + 1);
    const attrs = {
      name: 'campo-' + i,
      value,
      required: f.required,
      'data-index': i,
      autocomplete: 'off'
    };
    let control;
    if (f.type === 'select') {
      const options = unique([...(f.options || []), value]);
      control = el('select', attrs, el('option', {
        value: ''
      }, 'Seleccionar…'), options.map(v => el('option', {
        value: v
      }, v)));
      control.value = value;
    } else {
      const type = ['number', 'date', 'email', 'url'].includes(f.type) ? f.type : 'text';
      if (f.sensitive) {
        attrs.placeholder = old ? 'Dato registrado. Escribe para reemplazarlo.' : '';
        attrs.autocomplete = 'off';
      }
      if (type === 'number') {
        attrs.min = '0';
        attrs.step = 'any';
      }
      if (section.key === 'productos' && i === 4) {
        const id = 'ix-tipos-' + uuid(),
          tipos = c.s.data.sections.find(x => x.key === 'tipos');
        if (tipos) {
          attrs.list = id;
          suggestions.push(el('datalist', {
            id
          }, unique(tipos.rows.filter(r => clean(r.cells[3]) !== 'inactivo').map(r => r.cells[1])).map(v => el('option', {
            value: v
          }))));
        }
      }
      if (/observac/i.test(name)) control = el('textarea', {
        ...attrs,
        rows: 3,
        maxlength: 1600
      }, value);else control = el('input', {
        ...attrs,
        type,
        maxlength: type === 'text' ? 1600 : undefined
      });
    }
    controls.set(i, control);
    initial.set(i, value);
    return formField(name + (f.required ? ' *' : ''), control);
  });
  const error = formError();
  const form = el('form', {}, el('fieldset', {
    class: 'ix-fields'
  }, fields), suggestions, error);
  const save = btn('Guardar', 'check', () => form.requestSubmit(), 'ix-primary');
  const send = masterWrite(c, 'master.save', save, error, 'Guardando…', row ? 'Cambios guardados en Data Maestra.' : 'Registro creado en Data Maestra.');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (c.s.busy || !form.reportValidity()) return;
    const values = {};
    for (const f of models) {
      const v = controls.get(f.index).value.trim();
      if (row && v === initial.get(f.index)) continue;
      if (!row && !v) continue;
      values[f.index] = f.type === 'number' && v !== '' ? Number(v) : v;
    }
    if (!Object.keys(values).length) {
      error.textContent = 'Ingresa los datos que deseas guardar.';
      return;
    }
    const payload = {
      section: section.key,
      values
    };
    if (row) Object.assign(payload, {
      id: row.id,
      version: row.version
    });
    send(payload);
  });
  c.dialog(row ? 'Editar · ' + rowLabel(section, row) : masterLabels[section.key]?.[2] || 'Nuevo registro', form, [btn('Cancelar', null, () => c.closeDialog()), save]);
  (controls.get(focusIndex) || controls.values().next().value)?.focus();
}
function confirmMaster(c, section, row, remove) {
  const error = formError();
  const title = remove ? 'Eliminar producto' : 'Desactivar producto';
  const confirm = btn(title, remove ? 'trash' : 'check', submit, remove ? 'ix-solid-danger' : 'ix-primary');
  const send = masterWrite(c, remove ? 'master.delete' : 'master.save', confirm, error, remove ? 'Eliminando…' : 'Guardando…', remove ? 'Producto eliminado de Data Maestra.' : 'Producto desactivado.');
  function submit() {
    const p = {
      section: section.key,
      id: row.id,
      version: row.version
    };
    if (!remove) p.values = {
      6: 'INACTIVO'
    };
    send(p);
  }
  c.dialog(title, el('div', {}, el('p', {
    class: 'ix-dialog-copy'
  }, remove ? 'Se eliminará la fila de este producto en Data Maestra.' : 'El producto pasará a INACTIVO en Data Maestra.'), el('strong', {}, rowLabel(section, row)), error), [btn('Cancelar', null, () => c.closeDialog()), confirm]);
}
function syncMaster(c) {
  const err = formError(),
    button = btn('Sincronizar', 'refresh', () => send({}), 'ix-primary');
  const send = masterWrite(c, 'master.sync', button, err, 'Sincronizando…', 'Sincronización de catálogos completada.');
  c.dialog('Sincronizar catálogos', el('div', {}, el('p', {
    class: 'ix-dialog-copy'
  }, 'Se actualizarán los catálogos vinculados de Requerimientos y Compras desde Data Maestra.'), err), [btn('Cancelar', null, () => c.closeDialog()), button]);
}
function photoMaster(c, section, row) {
  const err = formError(),
    file = el('input', {
      type: 'file',
      accept: 'image/*,.heic,.heif,.avif,.tif,.tiff',
      required: true
    });
  const form = el('form', {}, el('p', {
    class: 'ix-dialog-copy'
  }, rowLabel(section, row)), formField('Fotografía del producto', file), el('p', {
    class: 'ix-hint'
  }, 'Tamaño máximo de 10 MB.'), err);
  const button = btn('Subir imagen', 'photo', () => form.requestSubmit(), 'ix-primary');
  const send = masterWrite(c, 'master.photo', button, err, 'Subiendo…', 'Imagen actualizada en Data Maestra.');
  let reading = false;
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (c.s.busy || reading || !form.reportValidity()) return;
    const img = file.files?.[0];
    if (!img) return;
    if (!img.size || img.size > 10 * 1024 * 1024) {
      err.textContent = 'Selecciona una imagen de hasta 10 MB.';
      return;
    }
    reading = true;
    button.disabled = true;
    err.textContent = '';
    const reader = new FileReader(),
      thisDialog = c.s.dialog;
    reader.onerror = () => {
      reading = false;
      button.disabled = false;
      err.textContent = 'No se pudo leer la fotografía.';
    };
    reader.onload = () => {
      reading = false;
      button.disabled = false;
      if (c.s.closed || c.s.dialog !== thisDialog) return;
      const encoded = String(reader.result || '').split(',')[1];
      if (!encoded) {
        err.textContent = 'La imagen no pudo leerse.';
        return;
      }
      send({
        codigo: row.cells[1],
        id: row.id,
        version: row.version,
        mimeType: img.type,
        nombreOriginal: img.name,
        base64: encoded
      });
    };
    reader.readAsDataURL(img);
  });
  c.dialog('Subir imagen del producto', form, [btn('Cancelar', null, () => c.closeDialog()), button]);
}
