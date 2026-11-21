import {openModule} from './modulos.js';

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwI9V7Ahh3y_fFndJex9BXaszM3mWdNIm4GQwmaFQyhJlmOehzunaiirWsCzHWQnOF9/exec';
const protocol = 'identical.erp/1';
const sessionName = 'identical.erp.session';
const qs = s => document.querySelector(s);
const paths = {
  mail:'M3 5h18v14H3z M3 6l9 7 9-7',lock:'M5 10h14v11H5z M8 10V7a4 4 0 0 1 8 0v3',
  eye:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  arrow:'M4 12h16 M14 6l6 6-6 6',exit:'M10 4H4v16h6 M10 12h11 M17 8l4 4-4 4',
  req:'M6 4h12v17H6z M9 3h6v3H9z M9 11h6 M9 15h6',
  cart:'M2 4h3l2.5 11h11l2.5-8H6 M9 20h.01 M18 20h.01',
  kardex:'M3 7l9-5 9 5v10l-9 5-9-5z M3 7l9 5 9-5 M12 12v10 M7.5 4.5l9 5',
  maestra:'M3 5c0-4 18-4 18 0s-18 4-18 0z M3 5v7c0 4 18 4 18 0V5 M3 12v6c0 4 18 4 18 0v-6'
};
function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 24 24'); svg.setAttribute('aria-hidden','true');
  const path = document.createElementNS(svg.namespaceURI,'path'); path.setAttribute('d',paths[name]);svg.append(path);return svg;
}
function el(tag, cls, text) {
  const n = document.createElement(tag); if (cls) n.className=cls; if (text) n.textContent=text; return n;
}
function mark(name) {const n=el('span');n.dataset.icon=name;n.append(icon(name));return n;}
document.querySelectorAll('[data-icon]').forEach(n=>n.append(icon(n.dataset.icon)));
let sessionToken='';
try { sessionToken=sessionStorage.getItem(sessionName)||''; } catch (_) { /* La pestaña puede funcionar en memoria. */ }
let email='', current=null, renderSeq=0, dispose=()=>{}, controller=null, qrFrame=null;
const root=qs('#content'), form=qs('#login-form'), message=qs('#login-message');
function keepToken(value) {
  sessionToken=value;
  try { if(value) sessionStorage.setItem(sessionName,value); else sessionStorage.removeItem(sessionName); } catch (_) {}
}
function endLocal(msg='') {
  renderSeq++;controller?.abort();dispose();dispose=()=>{};qrFrame=null;current=null;email='';keepToken('');
  root.replaceChildren();qs('#app').hidden=true;qs('#login').hidden=false;qs('#user-email').textContent='';message.textContent=msg;
}
async function rpc(method,data={}, opts={}) {
  const id=crypto.randomUUID(), token=opts.token ?? sessionToken;
  const timeout=AbortSignal.timeout(165000);
  let res, reply;
  try {
    res=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=UTF-8'},credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',redirect:'follow',signal:timeout,body:JSON.stringify({protocol,id,method,data,token})});
    if(!res.ok) throw Error('HTTP '+res.status);
    reply=await res.json();
  } catch (_) { throw Error('No se pudo confirmar la operación con Google Sheets. Comprueba la conexión y vuelve a intentar.'); }
  if(reply.protocol!==protocol||reply.id!==id) throw Error('Google no confirmó la solicitud del portal. Actualiza la página y reintenta.');
  if(!reply.ok) {
    if(reply.code==='AUTH_REQUIRED' && token===sessionToken) endLocal(reply.error);
    throw Error(reply.error||'La operación no se pudo completar.');
  }
  return reply.result;
}
const hex=buf=>Array.from(new Uint8Array(buf),n=>n.toString(16).padStart(2,'0')).join('');
async function prove(password,challenge) {
  const enc=new TextEncoder();
  const key=await crypto.subtle.importKey('raw',enc.encode(password),'PBKDF2',false,['deriveKey']);
  if(!Number.isInteger(challenge.iterations)||challenge.iterations<100000||challenge.iterations>2000000||!/^[a-f0-9]{64}$/.test(challenge.nonce))throw Error('Respuesta de acceso inválida.');
  const signer=await crypto.subtle.deriveKey({name:'PBKDF2',hash:'SHA-256',salt:Uint8Array.from(atob(challenge.salt),c=>c.charCodeAt(0)),iterations:challenge.iterations},key,{name:'HMAC',hash:'SHA-256',length:256},false,['sign']);
  return hex(await crypto.subtle.sign('HMAC',signer,enc.encode(challenge.nonce)));
}
qs('#reveal').onclick=()=>{const inp=qs('#password'),show=inp.type==='password';inp.type=show?'text':'password';qs('#reveal').setAttribute('aria-pressed',String(show));qs('#reveal').setAttribute('aria-label',show?'Ocultar contraseña':'Mostrar contraseña');};
function enter(result) {
  email=result.email;qs('#user-email').textContent=email;qs('#login').hidden=true;qs('#app').hidden=false;
  const route=readRoute();go(route.key,route.options,false);
}
form.onsubmit=async event=>{
  event.preventDefault();const button=qs('#enter');if(button.disabled)return;
  button.disabled=true;message.textContent='Verificando acceso…';
  try {
    const c=await rpc('auth.challenge',{}, {token:''});
    const login=await rpc('auth.login',{email:qs('#email').value.trim(),nonce:c.nonce,proof:await prove(qs('#password').value,c)},{token:''});
    keepToken(login.token);qs('#password').value='';message.textContent='';enter(login);
  } catch(error){message.textContent=error.message;} finally {button.disabled=false;}
};
qs('#logout').onclick=async()=>{
  const token=sessionToken;endLocal();history.replaceState(null,'',location.pathname);
  if(token){try{await rpc('auth.logout',{}, {token});}catch(_){/* La copia de sesión de este dispositivo ya se descartó. */}}
};
const allowedSections=['consumo','stock','scan','labels','locations','history','base','ingreso','salida','traslado'];
function readRoute(){
  const p=new URLSearchParams(location.search);
  let key=p.get('module')||'home';
  if(p.has('section')&&allowedSections.includes(p.get('section'))&&!p.has('module'))key='qr';
  const options={};for(const k of ['section','code','warehouse','lot','location','exp'])if(p.get(k))options[k]=p.get(k);
  return {key,options};
}
function home(){
  const heading=el('div','home-heading');heading.append(el('h1','','Módulos de logística'),el('p','','Selecciona el módulo en el que vas a trabajar.'));
  const grid=el('div','module-grid');
  const modules=[['req','Requerimientos','Solicitudes de materiales de las sedes.',''],['cart','Compras','Cotizaciones, comparativos y órdenes de compra.',''],['kardex','Kardex','Consulta el stock, registra movimientos e imprime etiquetas QR.','Ingresar a Kardex'],['maestra','Data Maestra','Administra productos, proveedores y los catálogos de las sedes.','Ingresar a Data Maestra']];
  for(const [key,title,desc,action] of modules){
    const card=el(action?'button':'article','module-card '+(action?key:'inactive'));if(action){card.type='button';card.onclick=()=>go(key);}
    const ico=mark(key);ico.className='module-icon';
    const label=el('span','card-action',action||'No disponible');if(action)label.append(mark('arrow'));
    card.append(ico,el('h2','',title),el('p','',desc),label);grid.append(card);
  }root.append(heading,grid);
}
function makeQR(options){
  const box=el('div','qr-heading'),head=el('div');head.append(el('h1','','Etiquetas y movimientos QR'));box.append(head);root.append(box);
  const frame=el('iframe','qr-frame');frame.title='Escáner, etiquetas y registro de movimientos';frame.allow='camera; clipboard-write; web-share';frame.setAttribute('allowfullscreen','');const src=new URL('./qr.html',location.href);
  for(const k of ['section','code','warehouse','lot','location','exp'])if(options[k])src.searchParams.set(k,options[k]);qrFrame=frame;frame.src=src.href;root.append(frame);
}
function go(key='home',options={},push=true){
  if(!email)return;if(!['home','kardex','maestra','qr'].includes(key))key='home';
  const gen=++renderSeq;controller?.abort();dispose();dispose=()=>{};qrFrame=null;controller=new AbortController();current=key;root.replaceChildren();
  if(push){const dest=new URL(location.href);dest.search='';dest.hash='';if(key!=='home')dest.searchParams.set('module',key);if(key==='qr')for(const k of ['section','code','warehouse','lot','location','exp'])if(options[k])dest.searchParams.set(k,options[k]);history.pushState(null,'',dest);}
  document.title=({home:'Módulos',maestra:'Data Maestra',kardex:'Kardex',qr:'Etiquetas QR'}[key])+' · Identical';
  document.querySelectorAll('#nav button').forEach(b=>{if(b.dataset.go===key)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});
  if(key==='home')home();else if(key==='qr')makeQR(options);else {
    try{const cleanup=openModule(key,{root,rpc,go,signal:controller.signal,onStatus:()=>{}});if(typeof cleanup==='function')dispose=cleanup;else if(cleanup?.catch)cleanup.catch(e=>{if(gen===renderSeq)root.append(el('p','portal-error',e.message));});}
    catch(e){root.append(el('p','portal-error',e.message));}
  }
  window.scrollTo(0,0);
}
const qrMethods=new Set(['qr.options','qr.catalog','qr.status','qr.stock','qr.operations','qr.movement','qr.reconfirm','qr.list','qr.append']);
window.addEventListener('message',async e=>{
  if(!email||!qrFrame||e.origin!==location.origin||e.source!==qrFrame.contentWindow)return;
  const m=e.data;if(!m||m.type!=='identical.erp.rpc'||!qrMethods.has(m.method)||typeof m.id!=='string'||m.id.length>100)return;
  const target=e.source;
  try {const result=await rpc(m.method,m.data||{});if(target===qrFrame?.contentWindow)target.postMessage({type:'identical.erp.result',id:m.id,ok:true,result},location.origin);}
  catch(error){target.postMessage({type:'identical.erp.result',id:m.id,ok:false,error:error.message},location.origin);}
});
qs('#home-brand').onclick=()=>go('home');document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>go(b.dataset.go));
window.addEventListener('popstate',()=>{if(email){const route=readRoute();go(route.key,route.options,false);}});
if(sessionToken){
  qs('#enter').disabled=true;message.textContent='Verificando tu sesión…';
  rpc('auth.session').then(enter).catch(e=>{message.textContent=e.message;}).finally(()=>{qs('#enter').disabled=false;});
}
