const base=require('@playwright/test');const h=require('../scripts/harness');
const test=base.test.extend({page:async({page,context},use,info)=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const actions=[];await context.exposeBinding('__qaRecord',(_source,a)=>{actions.push(a);});
  await h.install(context);await h.open(page);
  await use(page);
  await info.attach('dom-actions',{body:JSON.stringify(actions),contentType:'application/json'});
  await info.attach('final-snapshot',{body:JSON.stringify(await h.capture(page)),contentType:'application/json'});
  await info.attach('browser-metadata',{body:JSON.stringify({version:context.browser().version(),engine:'Chromium',isolatedContext:true,remoteRequestsBlocked:true}),contentType:'application/json'});
  await info.attach('runtime-errors',{body:JSON.stringify(errors),contentType:'application/json'});
  base.expect(errors,'No JavaScript runtime error in every case').toEqual([]);
}});
function qa(id,priority,title,fn){test(`${id} [${priority}] ${title}`,fn);}
module.exports={...h,test,expect:base.expect,qa};
