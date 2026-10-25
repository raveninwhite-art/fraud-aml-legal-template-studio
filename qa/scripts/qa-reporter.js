const fs=require('fs'),path=require('path');const {ROOT}=require('./strip-images');
class Reporter{
 constructor(){this.results=[];}
 onBegin(config,suite){this.start=new Date().toISOString();this.total=suite.allTests().length;}
 onTestEnd(test,result){
  const id=test.title.split(' ')[0],priority=/\[(P\d)\]/.exec(test.title)?.[1]||'P1';
  const attachments={};for(const a of result.attachments){if(a.body){try{attachments[a.name]=JSON.parse(a.body.toString());}catch{attachments[a.name]=a.body.toString();}}}
  const needsReview=test.annotations.some(a=>a.type==='NEEDS_REVIEW');
  const status=result.status==='passed'?(needsReview?'Needs Review':'Passed'):result.status==='skipped'?'Skipped':'Failed';
  const module= id.startsWith('L0-')?'smoke':({B:'behavior',G:'golden',F:'functional',S:'state',M:'metamorphic'}[id[0]]||'unknown');
  const file=test.titlePath().find(x=>x.endsWith('.spec.js'))||test.location.file;
  const steps=[];function walk(ss){for(const s of ss||[]){if(s.category==='pw:api')steps.push(s.title);walk(s.steps);}}walk(result.steps);
  this.results.push({id,title:test.title,priority,module,file:path.isAbsolute(file)?path.relative(ROOT,file):file,line:test.location.line,status,playwrightStatus:result.status,durationMs:result.duration,annotations:test.annotations,errors:result.errors.map(e=>(e.message||e.value||'').replace(/\x1b\[[0-9;]*m/g,'')),attachments,steps});
 }
 onError(error){this.globalErrors??=[];this.globalErrors.push(error.message||String(error));}
 onEnd(result){
  fs.mkdirSync(path.join(ROOT,'reports'),{recursive:true});
  const manifest=JSON.parse(fs.readFileSync(path.join(ROOT,'source/source-manifest.json')));
  const data={schemaVersion:1,runAt:this.start,endedAt:new Date().toISOString(),runnerStatus:result.status,selectedTests:this.total,fullSuite:JSON.stringify(this.results.map(x=>x.id).sort())===JSON.stringify(require('../tests/test-plan.json').expectedIds.slice().sort()),source:manifest,browser:this.results.find(x=>x.attachments['browser-metadata'])?.attachments['browser-metadata']||{},globalErrors:this.globalErrors||[],results:this.results};
  fs.writeFileSync(path.join(ROOT,'reports/results.json'),JSON.stringify(data,null,2));
  require('./report').generate(data);
 }
}
module.exports=Reporter;
