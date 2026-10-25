const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const launch=require('./browser'),h=require('./harness'),{verify}=require('./verify-source');
(async()=>{const m=JSON.parse(fs.readFileSync(path.join(h.ROOT,'source/source-manifest.json')));
  const staticAudit=verify(process.env.QA_SOURCE||m.sourcePath);const b=await launch();const results=[];
  const fixtures=[{id:'original-default',steps:[]},{id:'original-attempt',steps:[{click:'preset-attempt-btn'}]},{id:'original-accessory',steps:[{click:'preset-v9-account-btn'}]}];
  for(const f of fixtures){const snaps=[];
    for(const source of [process.env.QA_SOURCE||m.sourcePath,path.join(h.ROOT,'source/index.qa-lite.html')]){
      const c=await b.newContext();await h.install(c,{source});const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await h.open(p);await h.apply(p,f);snaps.push(await h.capture(p));assert.deepEqual(errors,[]);await c.close();
    }
    assert.deepEqual(snaps[0],snaps[1],f.id+' original/lite DOM, sections and states');results.push({id:f.id,status:'PASS',snapshotHash:snaps[0].snapshotHash});
  }
  const c=await b.newContext();await h.install(c);const p=await c.newPage();await h.open(p);
  const inventory=await p.locator('input,textarea,select').evaluateAll(ns=>ns.map(n=>({tag:n.tagName.toLowerCase(),id:n.id,name:n.name,type:n.type,defaultValue:n.defaultValue??n.value,value:n.value,checked:n.checked,defaultChecked:n.defaultChecked,disabled:n.disabled,readOnly:n.readOnly,visible:!!(n.offsetWidth||n.offsetHeight||n.getClientRects().length),panel:n.closest('.form-panel')?.id,attributes:Object.fromEntries([...n.attributes].map(a=>[a.name,a.value])),options:n.options?[...n.options].map(o=>({value:o.value,text:o.text,selected:o.selected})):undefined,label:(n.closest('label')?.textContent||n.previousElementSibling?.textContent||'').trim().slice(0,180)})));
  const buttons=await p.locator('button').evaluateAll(ns=>ns.map(n=>({id:n.id,text:n.textContent.trim(),attributes:Object.fromEntries([...n.attributes].map(a=>[a.name,a.value]))})));
  await c.close();await b.close();fs.mkdirSync(path.join(h.ROOT,'reports'),{recursive:true});
  fs.writeFileSync(path.join(h.ROOT,'reports/source-audit.json'),JSON.stringify({staticAudit,smoke:results,browser:b.version(),runAt:new Date().toISOString()},null,2));
  fs.writeFileSync(path.join(h.ROOT,'source/input-inventory.json'),JSON.stringify({inputs:inventory,buttons},null,2));console.log({staticAudit,smoke:results,inputs:inventory.length,buttons:buttons.length});
})().catch(e=>{console.error(e);process.exitCode=1});
