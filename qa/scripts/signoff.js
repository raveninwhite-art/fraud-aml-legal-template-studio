const fs=require('fs'),path=require('path');const {ROOT,hash}=require('./strip-images');
const [actor,reference]=process.argv.slice(2);if(!actor||!reference)throw Error('Usage: node scripts/signoff.js "法律驗收人" "核准紀錄"');
const data=JSON.parse(fs.readFileSync(path.join(ROOT,'reports/results.json')));
if(!data.fullSuite||data.results.some(x=>['Failed','Skipped','Needs Review'].includes(x.status)))throw Error('Must first pass a full suite with all five Golden approved. Cannot sign off failed or pending run.');
fs.writeFileSync(path.join(ROOT,'baselines/release-signoff.json'),JSON.stringify({actor,reference,approvedAt:new Date().toISOString(),sourceSha256:data.source.sourceSha256,resultsSha256:hash(JSON.stringify(data))},null,2));console.log('Recorded release sign-off for exact source and test result.');
