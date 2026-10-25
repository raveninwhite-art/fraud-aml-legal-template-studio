本手冊的逐步指令於qa資料夾執行；整合Repository時請先讀Repository_Integration.md，根目錄用npm run qa:v1，沿用既有瀏覽器環境。

# Windows PowerShell 執行手冊

## 1. 初次安裝

安裝Node.js 22 LTS。解壓ZIP，PowerShell進入含package.json的資料夾。確認：

```powershell
node --version
npm --version
npm ci
npx playwright install chromium
```

若PowerShell擋npm.ps1，可用 `npm.cmd` / `npx.cmd` 取代；不必放寬整台電腦的執行原則。瀏覽器下載失敗時，先處理網路；不要把未跑案例當PASS。若已有相容Chromium，可指定：

```powershell
$env:QA_CHROMIUM_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"
```

Chrome版本不同可能造成剪貼簿、DOM文字或下載差異，先檢查報告。未在Windows實測，不能保證所有本機環境無需調整。

## 2. 每次收到新的index.html：建議一行執行

```powershell
npm run qa -- "C:\工作\新版\index.html"
Start-Process ".\reports\QA_Report.html"
```

此流程不修改傳入的HTML。自動更新副本、manifest與DOM清冊；保留既有Behavior，故有文字變化時會紅燈。現行有7項已知失敗與5案待核准，非零退出碼是預期結果。

## 3. 分步執行

```powershell
npm run prepare-source -- "C:\工作\新版\index.html"
npm run verify-source
npm run audit-source
npm test
npm run mutations
npm run report
npm run gate
```

先prepare-source才執行其餘指令。來源manifest的sourcePath記住實際原檔位置；搬移檔案後需重新prepare。audit-source會做原版／副本三組實跑。不得跳過驗證後直接將不明去圖版作為正式來源。

## 4. 只跑一個模組或測試

```powershell
npm run test:smoke
npm run test:behavior
npm run test:golden
npm run test:functional
npm run test:state
npm run test:metamorphic
npx playwright test --grep "S03"
```

單模組結果明載PARTIAL，不通過Release Gate；之後需 `npm run qa -- "C:\工作\新版\index.html"` 做完整驗證。子集執行會覆寫當前report，先前完整qa報告在reports/runs中；初始交付報告可保留ZIP備份。

## 5. 看差異及修復範圍

開QA Report，展開B01–B12或S系列，逐個段落看紅色刪除、綠色新增及輸入差異。CLI可直接讀 `reports/results.json`。不要用相似度分數判斷。

```powershell
Copy-Item ".\docs\repair-plan.example.json" ".\docs\repair-plan.current.json"
# 編輯repair-plan.current.json，列出本次允許變動的case及section
$env:QA_REPAIR_PLAN=(Resolve-Path ".\docs\repair-plan.current.json").Path
npm run report
```

這只協助分流，不會把差異自動視為核准或更動Expected。取消設定：`Remove-Item Env:QA_REPAIR_PLAN`。

## 6. Behavior Baseline更新

先完成全部測試及逐段差異審查。產生候選不覆蓋正式Expected：

```powershell
npm run baseline:candidate
```

候選放reports/candidates/behavior。取得具體核准後，每案明列審查人、紀錄及允許變動範圍：

```powershell
npm run baseline:accept -- B01 "審查人" "R001核准紀錄" "僅量刑自白句及容器編號"
```

會封存舊版本與追加changes.jsonl。此命令不碰Golden。禁止為了全綠批次接受所有Expected。

## 7. Golden維護與核准

閱讀Golden_Case_Spec及各Gxx.json，確認輸入可重現原判決法律結構、Strict規則正確，並處理Editorial Review與Coverage Gap。候選修改時同步baselines/golden-proposed的assertions及fixtureSha256；未同步會測試失敗。每次內容變更舊核准雜湊自動失效。

```powershell
npm run golden:approve -- G01 "法律審查人" "明確核准紀錄編號"
```

G01–G05須分案核准；首次交付沒有執行此命令。命令只登錄使用者已作成的核准，不會替代法律審查。核准後完整重跑；Golden失敗將成正式P0紅燈。未支援內容不得因核准規則而被認定已完成。

## 8. Release與例外

五案已核准且完整測試全綠後，法律與Editorial驗收完成，再登錄精確版本與結果：

```powershell
npm run release:signoff -- "驗收人" "正式核准紀錄"
npm run gate
```

signoff會拒絕仍有Fail/Skipped/Needs Review的完整結果。新來源或新結果需要重新核准。P0不提供自動豁免；P1/P2例外另填Exception_Record.json，不會讓機器燈號轉綠，須使用者明確裁定並留存期限、風險及替代檢核。
