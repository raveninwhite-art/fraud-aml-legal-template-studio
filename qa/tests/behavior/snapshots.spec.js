const fs=require('fs'),path=require('path');const {qa,expect,apply,capture,compareSnapshots,ROOT}=require('../support');const {hash}=require('../../scripts/strip-images');
const cases=JSON.parse(fs.readFileSync(path.join(ROOT,'fixtures/behavior/cases.json')));
for(const f of cases)qa(f.id,'P1','Behavior '+f.title,async({page},info)=>{
 const baseline=JSON.parse(fs.readFileSync(path.join(ROOT,'baselines/behavior',f.id+'.json')));
 expect(baseline.status).toBe('CURRENT_BEHAVIOR_NOT_LEGAL_APPROVAL');
 expect(hash(JSON.stringify(f)),'Fixture changed; review input changes before updating baseline').toBe(baseline.fixtureSha256);
 expect(hash(baseline.text),'Baseline file integrity').toBe(baseline.snapshotHash);
 await apply(page,f);const actual=await capture(page);const diff=compareSnapshots(baseline,actual);
 await info.attach('case-detail',{body:JSON.stringify({fixture:f,baselineSource:baseline.sourceSha256,actual,diff},null,2),contentType:'application/json'});
 expect(actual.text,'Exact DOM snapshot; inspect section diff').toBe(baseline.text);expect(actual.sections).toEqual(baseline.sections);expect(actual.state).toEqual(baseline.state);
});
