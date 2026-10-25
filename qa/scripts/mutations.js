const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');const launch=require('./browser'),h=require('./harness'),{hash}=require('./strip-images');
(async()=>{
 const file=path.join(h.ROOT,'source/index.qa-lite.html'),original=fs.readFileSync(file,'utf8');
 const cases=JSON.parse(fs.readFileSync(path.join(h.ROOT,'fixtures/behavior/cases.json')));
 const mutations=[
  {id:'N01',name:'罪名漏字',fixture:'B01',from:"fullCrimeNames.push('刑法第339條之4第1項第2款之三人以上共同詐欺取財罪');",to:"fullCrimeNames.push('刑法第339條之4第1項第2款之三人以上共同詐欺取罪');",assertion:s=>s.sections.crimeText.includes('刑法第339條之4第1項第2款之三人以上共同詐欺取財罪')},
  {id:'N02',name:'未扣案金額錯置',fixture:'B06',from:"const uAmt = val('val-conf-proc-unseized') || 'O元';",to:"const uAmt = '9,999元';",assertion:s=>s.sections.confText.includes('獲得報酬4,000元')},
  {id:'N03',name:'論罪段落意外刪除',fixture:'B01',from:"reasonSections.push(`${chineseTopNums[topIdx++]}、論罪科刑：\\n${crimeSubSections.join('\\n')}`);",to:'/* isolated mutation: omitted crime reason */',assertion:s=>s.text.includes('論罪科刑：')}
 ];
 const tmp=path.join(h.ROOT,'reports/mutation-temp');fs.mkdirSync(tmp,{recursive:true});const b=await launch();const result=[];
 try{for(const m of mutations){assert.equal(original.split(m.from).length-1,1,'Mutation anchor must match exactly once: '+m.id);const mutated=original.replace(m.from,m.to),dest=path.join(tmp,m.id+'.html');fs.writeFileSync(dest,mutated);
  const f=cases.find(f=>f.id===m.fixture);
  // Positive control uses the current source, never an older behavior snapshot.
  const control=await b.newContext();await h.install(control,{source:file});const controlPage=await control.newPage();await h.open(controlPage);await h.apply(controlPage,f);const baseline=await h.capture(controlPage);await control.close();
  assert(m.assertion(baseline),'Current-source positive control failed '+m.id);
  const c=await b.newContext();await h.install(c,{source:dest});const p=await c.newPage();await h.open(p);await h.apply(p,f);const actual=await h.capture(p);const snapshotDetected=baseline.text!==actual.text,ruleDetected=!m.assertion(actual);
  result.push({id:m.id,name:m.name,fixture:m.fixture,positiveControl:true,mutationSha256:hash(mutated),snapshotDetected,independentAssertionDetected:ruleDetected,status:snapshotDetected&&ruleDetected?'DETECTED':'MISSED',diff:h.compareSnapshots(baseline,actual)});await c.close();
 }}finally{await b.close();fs.rmSync(tmp,{recursive:true,force:true});}
 assert.equal(hash(fs.readFileSync(file)),hash(original),'Lite source must remain unchanged');
 const manifest=JSON.parse(fs.readFileSync(path.join(h.ROOT,'source/source-manifest.json')));
 const report={runAt:new Date().toISOString(),sourceSha256:manifest.sourceSha256,liteSha256:hash(original),isolatedCopiesDeleted:true,sourceUnchanged:true,detected:result.filter(x=>x.status==='DETECTED').length,total:result.length,results:result};fs.writeFileSync(path.join(h.ROOT,'reports/mutations.json'),JSON.stringify(report,null,2));console.log({detected:report.detected,total:report.total});if(report.detected!==report.total)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
