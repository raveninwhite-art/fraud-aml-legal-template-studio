const fs=require('fs'),path=require('path');const {ROOT,hash}=require('./strip-images');
const [id,actor,reference]=process.argv.slice(2);
if(!/^G0[1-5]$/.test(id||'')||!actor||!reference)throw Error('Usage: npm run golden:approve -- G01 "核准人" "核准紀錄或案號". Run only after explicit human legal/editorial review.');
const f=path.join(ROOT,'fixtures/golden-proposed',id+'.json'),b=path.join(ROOT,'baselines/golden-proposed',id+'.json'),approvalsPath=path.join(ROOT,'baselines/golden-approved/approvals.json');
const baseline=JSON.parse(fs.readFileSync(b));if(baseline.fixtureSha256!==hash(fs.readFileSync(f)))throw Error('Candidate and proposed baseline differ; reconcile before human approval.');
const data=JSON.parse(fs.readFileSync(approvalsPath));data.approvals.push({id,actor,reference,approvedAt:new Date().toISOString(),fixtureSha256:hash(fs.readFileSync(f)),baselineSha256:hash(fs.readFileSync(b)),scope:'machine assertions only; editorial and release require separate human review'});fs.writeFileSync(approvalsPath,JSON.stringify(data,null,2));console.log('Recorded explicit approval for exact revision '+id);
