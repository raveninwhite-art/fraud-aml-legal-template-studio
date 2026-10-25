const fs=require('fs'),path=require('path');const {ROOT}=require('./strip-images');
const r=JSON.parse(fs.readFileSync(path.join(ROOT,'reports/results.json')));
const github=process.env.GITHUB_ACTIONS==='true';const browser=r.browser.version||null;
const executed=r.results.length>0,defaultEngine=executed&&browser?.startsWith('145.')&&r.source.playwrightVersion==='1.58.2';
const data={requestedNodeMajor:22,requestedPlaywright:'1.58.2',actualNode:r.source.nodeVersion,actualPlaywright:r.source.playwrightVersion,actualBrowser:browser,
 actualRunAt:r.runAt,actualFullSuite:r.fullSuite,defaultBrowserForPlaywright:'145.0.7632.6',
 defaultBrowserFullSuiteStatus:defaultEngine&&r.fullSuite?'EXECUTED':'NOT_EXECUTED',
 defaultBrowserReason:defaultEngine?'See results.json for outcomes; executed does not mean passed.':'This run did not exercise the default Chromium 145 engine.',
 githubExistingSmoke:'USER_REPORTED_PASSED',githubFrameworkL0L5:github&&executed?'EXECUTED':'NOT_EXECUTED',
 githubRunId:github?process.env.GITHUB_RUN_ID||null:null,githubCommit:github?process.env.GITHUB_SHA||null:null,
 remoteRepositoryMutations:0};
fs.writeFileSync(path.join(ROOT,'reports/target-environment.json'),JSON.stringify(data,null,2));console.log(data);
