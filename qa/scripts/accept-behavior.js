const fs=require('fs'),path=require('path');const {ROOT,hash}=require('./strip-images');
const [id,actor,reason,scope]=process.argv.slice(2);
if(!/^B\d\d$/.test(id||'')||!actor||!reason||!scope)throw Error('Usage: npm run baseline:accept -- B01 "審查人" "核准紀錄" "允許變動段落及理由". This updates behavior only, not Golden.');
const candidate=path.join(ROOT,'reports/candidates/behavior',id+'.json'),dest=path.join(ROOT,'baselines/behavior',id+'.json');
const before=fs.readFileSync(dest),after=fs.readFileSync(candidate);JSON.parse(after);
const archive=path.join(ROOT,'baselines/behavior/history');fs.mkdirSync(archive,{recursive:true});fs.writeFileSync(path.join(archive,id+'-'+hash(before)+'.json'),before);
fs.appendFileSync(path.join(ROOT,'baselines/behavior/changes.jsonl'),JSON.stringify({id,actor,reason,scope,at:new Date().toISOString(),oldHash:hash(before),newHash:hash(after)})+'\n');fs.writeFileSync(dest,after);console.log('Accepted behavior revision '+id+'; Golden unchanged.');
