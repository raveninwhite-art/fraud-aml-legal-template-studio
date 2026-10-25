const fs=require('fs'),path=require('path');const {qa,expect,apply,capture,assertGolden,ROOT}=require('../support');const {hash}=require('../../scripts/strip-images');
for(const id of ['G01','G02','G03','G04','G05'])qa(id,'P0','Golden 候選（核准前僅供審查）',async({page},info)=>{
 const file=path.join(ROOT,'fixtures/golden-proposed',id+'.json');const f=JSON.parse(fs.readFileSync(file));
 const approvals=JSON.parse(fs.readFileSync(path.join(ROOT,'baselines/golden-approved/approvals.json'))).approvals;
 const baseline=JSON.parse(fs.readFileSync(path.join(ROOT,'baselines/golden-proposed',id+'.json')));
 expect(hash(fs.readFileSync(file)),'Candidate/baseline revision mismatch').toBe(baseline.fixtureSha256);
 expect(f.assertions).toEqual(baseline.assertions);
 const approved=approvals.find(x=>x.id===id&&x.fixtureSha256===hash(fs.readFileSync(file))&&x.baselineSha256===hash(fs.readFileSync(path.join(ROOT,'baselines/golden-proposed',id+'.json'))));
 await apply(page,f);const actual=await capture(page);const errors=assertGolden(actual,f.assertions);
 await info.attach('golden-evaluation',{body:JSON.stringify({id,status:approved?'APPROVED':'PROPOSED_NOT_APPROVED',fixture:f,assertionCount:f.assertions.length,passedAssertions:f.assertions.length-errors.length,errors,actual},null,2),contentType:'application/json'});
 info.annotations.push({type:approved?'GOLDEN_APPROVED':'NEEDS_REVIEW',description:errors.length+' candidate assertion(s) failed; '+f.coverageGaps.length+' coverage gaps'});
 if(approved)expect(errors).toEqual([]);
});
