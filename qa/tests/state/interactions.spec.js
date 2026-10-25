const {qa,expect,set,capture,state}=require('../support');
async function fresh(page,preset){await page.reload({waitUntil:'domcontentloaded'});await page.locator('#'+preset).click();return capture(page);}
for(const [id,a,b]of [
 ['S01','preset-typical-btn','preset-attempt-btn'],
 ['S02','preset-attempt-btn','preset-typical-btn'],
 ['S03','preset-v9-account-btn','preset-typical-btn'],
 ['S04','preset-typical-btn','preset-v9-account-btn']
])qa(id,'P1',`${a} → ${b} 與直接套用相同`,async({page},info)=>{
 await page.locator('#'+a).click();await page.locator('#'+b).click();const mixed=await capture(page);const direct=await fresh(page,b);
 const diff=require('../../scripts/harness').compareSnapshots(direct,mixed);await info.attach('state-diff',{body:JSON.stringify(diff,null,2),contentType:'application/json'});
 expect(mixed.state,'Preset final input state must be history independent').toEqual(direct.state);expect(mixed.text).toBe(direct.text);
});
for(const [id,preset]of [['S05','preset-typical-btn'],['S06','preset-attempt-btn'],['S07','preset-v9-account-btn']])qa(id,'P1','預設重複套用具冪等性 '+preset,async({page})=>{await page.locator('#'+preset).click();const a=await capture(page);await page.locator('#'+preset).click();expect(await capture(page)).toEqual(a);});
qa('S08','P1','清空後套典型與新載入直接套用相同',async({page},info)=>{await page.locator('#preset-clear-btn').click();await page.locator('#preset-typical-btn').click();const cleared=await capture(page);const direct=await fresh(page,'preset-typical-btn');await info.attach('state-diff',{body:JSON.stringify(require('../../scripts/harness').compareSnapshots(direct,cleared),null,2),contentType:'application/json'});expect(cleared.state).toEqual(direct.state);expect(cleared.text).toBe(direct.text);});
qa('S09','P1','相同最終輸入狀態不受操作順序影響',async({page})=>{await set(page,'input-defendant-name','測試甲');await set(page,'val-sent-age','正值青年');const a=await capture(page);await page.reload({waitUntil:'domcontentloaded'});await set(page,'val-sent-age','正值青年');await set(page,'input-defendant-name','測試甲');const b=await capture(page);expect(b.state).toEqual(a.state);expect(b.text).toBe(a.text);});
qa('S10','P1','勾選取消再勾選可還原產文與附錄',async({page})=>{const a=await capture(page);await set(page,'crime-forgery-210',false);await set(page,'crime-forgery-210',true);expect(await capture(page)).toEqual(a);});
qa('S11','P1','僅 input 事件即時更新文字與刑度',async({page})=>{await page.locator('#val-h1-sentence').fill('處有期徒刑壹年貳月。');expect((await capture(page)).sections.holdingText).toContain('處有期徒刑壹年貳月。');});
qa('S12','P2','隔離計數器載入遞增、欄位重設及損壞值復原',async({page,context})=>{expect(await page.locator('#usage-counter').innerText()).toBe('1');await set(page,'input-defendant-name','測試甲');await page.reload({waitUntil:'domcontentloaded'});expect(await page.locator('#usage-counter').innerText()).toBe('2');expect(await page.locator('#input-defendant-name').inputValue()).toBe('');await page.evaluate(()=>localStorage.setItem('criminalJudgmentGeneratorUsageCount','not-a-number'));await page.reload({waitUntil:'domcontentloaded'});expect(await page.locator('#usage-counter').innerText()).toBe('1');});
qa('S13','P2','分頁切換及單頁展開狀態',async({page})=>{const a=await capture(page);await set(page,'show-all-sections-toggle',false);await page.locator('[data-tab="tab-crimes"]').click();await expect(page.locator('#tab-crimes')).toBeVisible();await expect(page.locator('#tab-basic')).toBeHidden();await set(page,'show-all-sections-toggle',true);for(const p of await page.locator('.form-panel').all())await expect(p).toBeVisible();expect((await capture(page)).text).toBe(a.text);});
qa('S14','P1','預設重設緩刑時主文核取方塊與理由面板同步',async({page})=>{await set(page,'holding-probation-grant',true);await page.locator('#preset-attempt-btn').click();expect(await page.locator('input[name="probation-mode"]:checked').inputValue()).toBe('omit');await expect(page.locator('#holding-probation-grant')).not.toBeChecked();await expect(page.locator('#probation-grant-box')).toBeHidden();});
