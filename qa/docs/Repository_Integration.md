# QA Framework v1｜既有 Repository 整合指南

目標：`raveninwhite-art/fraud-aml-legal-template-studio` 的 `qa-playwright` 分支。已唯讀檢查現有package、lock、Playwright設定及workflow；沒有修改遠端檔案、建立commit、PR或觸發Actions。受測程式仍只有本次上傳的最新版HTML。

## 建議配置

將ZIP內的 `qa/` 放到Repository根目錄。框架使用獨立 `qa/playwright.config.js`，既有根目錄設定與Smoke Test保留。根目錄的一次 `npm ci` 即可供兩套測試共用依賴，不必在CI再執行 `npm ci --prefix qa`，也不增加另一套workflow。

|Repository檔案|動作|精確調整|
|---|---|---|
|`qa/`|新增|框架程式、L0–L5、fixtures、baselines、文件；產生報告於qa/reports|
|`package.json`|修改|保留@playwright/test 1.58.2、http-server、既有test指令；新增parse5 7.2.1、diff 8.0.2、tailwindcss 3.4.17與qa:v1指令|
|`package-lock.json`|修改|與package一起更新；附已驗證npm ci的候選lock，不需升級Playwright|
|`playwright.config.js`|保留|既有webServer、Chromium project、重試與HTML reporter不變|
|`tests/smoke.spec.js`|保留|既有Smoke維持原樣；未重新製作或重新驗證這份測試|
|`.github/workflows/playwright.yml`|修改|既有npm test之後追加npm run qa:v1；報告artifact追加qa/reports的指定檔案|
|`.gitignore`|追加|忽略產生報告、去圖副本／manifest、測試暫存與node_modules；範本見root.gitignore.append.txt|
|`index.html`|不修改|仍為正式來源；每次qa:v1都重新建立並驗證輕量副本|

## 可審查的設定候選

- `qa/integration/root.package.json.proposed`：從您現有package增量合併；沒有移除既有指令或依賴。
- `qa/integration/root.package-lock.json.proposed`：對應候選package，已在Node 22下以npm ci安裝成功。
- `qa/integration/existing-workflow.patch`：只對現有workflow增加完整QA步驟及報告路徑。
- `qa/integration/playwright.yml.proposed`：同一份workflow的合併後檢視稿，不是第二套workflow。
- `qa/integration/observed/`：本輪唯讀取得的設定，及Repository_Readonly_Audit.json記錄其Git blob SHA。套用前請先核對遠端是否又有更新。

這些檔案均未套用到遠端。若之後Repository有其他變更，請依patch合併；不要以候選整檔覆蓋新內容。

## 實際整合步驟

1. 在qa-playwright分支加入qa目錄；既有根目錄tests與playwright.config.js保留。
2. 合併候選package及lock。您也可自行執行下列指令更新lock，之後保留兩個檔案一起提交：

```powershell
npm install --save-dev --save-exact parse5@7.2.1 diff@8.0.2 tailwindcss@3.4.17
npm pkg set "scripts.qa:v1=node qa/scripts/qa.js index.html"
npm pkg set "scripts.qa:v1:tests=node qa/scripts/run-tests.js"
npm pkg set "scripts.qa:v1:report=node qa/scripts/report.js"
```

3. 依existing-workflow.patch，在既有 `Run Playwright tests: npm test` 後增加：

```yaml
- name: Run QA Framework v1
  run: npm run qa:v1
```

既有Checkout、Node 22、npm ci與安裝Chromium步驟沿用。不要新增另一個workflow，亦不需要更換根目錄Playwright設定。

4. 既有Upload test report保留if: always()，artifact的path追加下列檔案，才能在QA紅燈時下載報告：

```text
qa/reports/QA_Report.html
qa/reports/results.json
qa/reports/source-audit.json
qa/reports/release-gate.json
qa/reports/mutations.json
qa/reports/Coverage_Matrix.csv
qa/reports/target-environment.json
qa/reports/pipeline.json
```

這是原artifact步驟的擴充；沒有設定GitHub Pages發布。原始PDF不提交、不加入artifact。未來若改用真實資料，要先檢查輸出內容及Repository／artifact存取範圍。

## 執行與報告

套用候選後，在Repository根目錄：

```powershell
npm ci
npm run qa:v1
Start-Process ".\qa\reports\QA_Report.html"
```

`qa:v1`包含去圖、原版／副本等價、欄位清冊、80項測試、三項負向驗證、報告及Gate。既有Smoke仍由 `npm test` 執行，兩者不互相取代。

```powershell
npm run qa:v1:tests -- tests/state
npm run qa:v1:tests -- --grep F19
npm run qa:v1:report
```

單模組報告會標示PARTIAL，不可當完整驗收。初始版本仍有已知失敗、Golden未核准，GitHub Actions應回報失敗並保留報告；不可使用continue-on-error、刪除測試或更新Expected來掩蓋紅燈。

## 環境與證據邊界

- 您已完成的GitHub Actions基礎Smoke：採您提供的執行結果，未代為重跑或重建。
- 本輪完整框架：在本機Linux，Node 22.23.4、Playwright 1.58.2、現有Chromium 153實跑；以交付報告實際數據為準。
- Playwright 1.58.2預設Chromium 145.0.7632.6：本機下載失敗，這一組完整80項尚未執行，沒有推定通過。您的既有CI將沿用它自行實跑。
- Windows／Microsoft Word實際排版：未實機驗證。

`target-environment.json`分開記錄實際環境、未執行的目標瀏覽器與GitHub驗證狀態。三者不能合併成一個PASS。

本輪完整結果為68 Passed、7 Failed、5 Needs Review。Playwright主控台可能顯示73 passed，因五案候選的規則蒐集也執行完成；自訂QA Report會將這五案重新分類為Needs Review，不能算正式Golden通過。

## 核准與Baseline

12組Behavior與五組Golden fixtures／規則均沿用原Phase 1，不因環境調整而重建Expected。正式來源、產文JavaScript、法律文字及Golden核准狀態不變。Golden仍PROPOSED_NOT_APPROVED；修復SOP與逐段diff流程照舊。
