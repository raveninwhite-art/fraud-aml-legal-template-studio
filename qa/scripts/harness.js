const fs=require('fs'),path=require('path');
const {ROOT,hash}=require('./strip-images');
const ORIGIN='http://127.0.0.1:4173';
let css;
async function styles(){
  if(!css){const postcss=require('postcss'),tailwind=require('tailwindcss');
    css=(await postcss([tailwind({content:[path.join(ROOT,'source/index.qa-lite.html')],corePlugins:{preflight:true}})]).process('@tailwind base;@tailwind components;@tailwind utilities;',{from:undefined})).css;
  }return css;
}
async function install(context,options={}){
  const style=await styles();
  await context.addInitScript(()=>{
    window.__qaActions=[];
    for(const type of ['click','input','change'])document.addEventListener(type,e=>{
      const n=e.target;if(n.matches?.('input,textarea,select,button')){const a={event:type,key:n.id||'@'+n.name+':'+n.value};window.__qaActions.push(a);if(window.__qaRecord)window.__qaRecord(a).catch(()=>{});}
    },true);
  });
  await context.route('**/*',async route=>{
    const u=route.request().url();
    if(u.startsWith(ORIGIN+'/')){
      const p=options.source || path.join(ROOT,'source/index.qa-lite.html');
      return route.fulfill({contentType:'text/html; charset=utf-8',body:fs.readFileSync(p,'utf8')});
    }
    if(u.startsWith('https://cdn.tailwindcss.com/')) return route.fulfill({contentType:'text/javascript',body:`{const style=document.createElement('style');style.textContent=${JSON.stringify(style)};document.head.appendChild(style)}`});
    // No production server, telemetry, fonts or third-party requests are allowed.
    return route.abort('blockedbyclient');
  });
  await context.grantPermissions(['clipboard-read','clipboard-write'],{origin:ORIGIN});
}
async function open(page){await page.goto(ORIGIN+'/index.html',{waitUntil:'domcontentloaded'});await page.locator('#preview-container').waitFor();}
async function set(page,key,value){
  const loc=key.startsWith('@')?page.locator(`input[name="${key.slice(1)}"][value="${value}"]`):page.locator('#'+key);
  if(!await loc.count())throw Error('Missing control: '+key);
  const type=await loc.getAttribute('type');
  if(type==='radio'){await loc.check();return;}
  if(type==='checkbox'){await loc.setChecked(value);return;}
  if(await loc.evaluate(e=>e.tagName)==='SELECT'){await loc.selectOption(value);return;}
  await loc.fill(String(value));
}
async function apply(page,fixture){
  for(const step of fixture.steps||[]){
    if(step.click) await page.locator('#'+step.click).click();
    else if(step.set) await set(page,...step.set);
    else throw Error('Unknown fixture step '+JSON.stringify(step));
  }
}
async function state(page){return page.locator('input,textarea,select').evaluateAll(ns=>ns.map(n=>({key:n.id||'@'+n.name+':'+n.value,id:n.id,name:n.name,type:n.type,value:n.value,checked:n.checked,disabled:n.disabled})));}
async function capture(page){
  const text=await page.locator('#preview-container').innerText();
  const sections=await page.evaluate(()=>buildSectionsData());
  return {text,sections,state:await state(page),snapshotHash:hash(text)};
}
function pollution(text){return /undefined|\bNaN\b|\[object Object\]|第第|㈩undefined/.test(text);}
function assertGolden(snap,rules){
  const errors=[];
  for(const r of rules){const text=r.section==='text'?snap.text:snap.sections[r.section];
    if(typeof text!=='string'){errors.push({...r,error:'missing output section'});continue;}
    if(r.kind==='contains'&&!text.includes(r.text))errors.push({...r,error:'missing required text'});
    if(r.kind==='notContains'&&text.includes(r.text))errors.push({...r,error:'forbidden text present'});
    if(r.kind==='order'){let start=0;for(const t of r.texts){const i=text.indexOf(t,start);if(i<0){errors.push({...r,error:'missing or out of order: '+t});break;}start=i+t.length;}}
    if(r.kind==='numbering'){
      const nums=[...text.matchAll(/^\s*([㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩])/gm)].map(m=>m[1]);
      if(nums.join('')!=='㈠㈡㈢㈣㈤㈥㈦㈧㈨㈩'.slice(0,nums.length))errors.push({...r,error:'subparagraph numbering is not sequential'});
    }
  }return errors;
}
function compareSnapshots(before,after){
  const {diffLines}=require('diff');const changes=[];
  for(const key of new Set([...Object.keys(before.sections),...Object.keys(after.sections)])){
    if(before.sections[key]!==after.sections[key])changes.push({section:key,diff:diffLines(before.sections[key]||'',after.sections[key]||'')});
  }
  if(before.text!==after.text)changes.push({section:'DOM preview (exact)',diff:diffLines(before.text,after.text)});
  const inputChanges=after.state.filter(x=>JSON.stringify(x)!==JSON.stringify(before.state.find(y=>y.key===x.key)));
  return {changes,inputChanges};
}
module.exports={ROOT,ORIGIN,styles,install,open,set,apply,state,capture,pollution,assertGolden,compareSnapshots};
