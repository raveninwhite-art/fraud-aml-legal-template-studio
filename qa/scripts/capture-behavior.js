const fs=require('fs'),path=require('path'),launch=require('./browser'),h=require('./harness'),{hash}=require('./strip-images');
(async()=>{
  const initialize=process.argv.includes('--initialize');
  const dest=path.join(h.ROOT,initialize?'baselines/behavior':'reports/candidates/behavior');
  const cases=JSON.parse(fs.readFileSync(path.join(h.ROOT,'fixtures/behavior/cases.json'))), manifest=JSON.parse(fs.readFileSync(path.join(h.ROOT,'source/source-manifest.json')));
  if(initialize&&fs.existsSync(path.join(dest,'B01.json')))throw Error('Initial baseline exists. Capture a candidate and review diffs; overwrite refused.');
  fs.mkdirSync(dest,{recursive:true});const b=await launch();
  try{for(const f of cases){const c=await b.newContext();await h.install(c);const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await h.open(p);await h.apply(p,f);if(errors.length)throw Error(errors.join('\n'));
    const snapshot=await h.capture(p);
    fs.writeFileSync(path.join(dest,f.id+'.json'),JSON.stringify({id:f.id,status:'CURRENT_BEHAVIOR_NOT_LEGAL_APPROVAL',sourceSha256:manifest.sourceSha256,fixtureSha256:hash(JSON.stringify(f)),capturedAt:new Date().toISOString(),browser:b.version(),fixture:f,...snapshot},null,2));await c.close();
  }}finally{await b.close();}console.log('Captured '+cases.length+' behavior snapshots at '+path.relative(h.ROOT,dest));
})().catch(e=>{console.error(e);process.exitCode=1});
