const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');const {ROOT}=require('./strip-images');
const given=process.argv[2]||process.env.QA_SOURCE;if(!given)throw Error('Usage: npm run qa -- "C:\\path\\index.html"');const source=path.resolve(given);if(!fs.statSync(source).isFile())throw Error('Source must be a file');
process.chdir(ROOT);function run(script,args=[]){const r=spawnSync(process.execPath,[(path.isAbsolute(script)?script:path.join(ROOT,script)),...args],{stdio:'inherit',env:process.env});if(r.error)throw r.error;return r.status??1;}
for(const script of ['scripts/strip-images.js','scripts/verify-source.js','scripts/audit-source.js'])if(run(script,[path.resolve(source)]))process.exit(1);
const history=path.join(ROOT,'reports/runs',new Date().toISOString().replace(/[:.]/g,'-'));fs.mkdirSync(history,{recursive:true});
for(const name of ['results.json','QA_Report.html','release-gate.json','mutations.json']){const p=path.join(ROOT,'reports',name);if(fs.existsSync(p)){fs.copyFileSync(p,path.join(history,name));fs.rmSync(p);}}
const cli=require('./playwright-runtime').cliPath;
const testStatus=run(cli,['test','--config='+path.join(ROOT,'playwright.config.js')]);
const mutationStatus=run('scripts/mutations.js');
if(!fs.existsSync(path.join(ROOT,'reports/results.json')))throw Error('No fresh test results. Cannot reuse a previous report.');
run('scripts/record-environment.js');run('scripts/report.js');const gateStatus=run('scripts/gate.js');const exitCode=testStatus||mutationStatus||gateStatus;
fs.writeFileSync(path.join(ROOT,'reports/pipeline.json'),JSON.stringify({completedAt:new Date().toISOString(),source,testStatus,mutationStatus,gateStatus,exitCode},null,2));process.exit(exitCode);
