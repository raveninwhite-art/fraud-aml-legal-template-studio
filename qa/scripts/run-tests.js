const path=require('path'),{spawnSync}=require('child_process');
const {ROOT}=require('./strip-images');const {cliPath}=require('./playwright-runtime');
const r=spawnSync(process.execPath,[cliPath,'test','--config='+path.join(ROOT,'playwright.config.js'),...process.argv.slice(2)],{cwd:ROOT,stdio:'inherit',env:process.env});
if(r.error)throw r.error;
if(require('fs').existsSync(path.join(ROOT,'reports/results.json'))){require('./record-environment');require('./report').generate();}
process.exitCode=r.status??1;
