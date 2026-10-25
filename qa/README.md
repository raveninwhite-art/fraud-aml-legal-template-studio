# QA Framework v1｜Node 22／Playwright 1.58.2 整合版

已對齊您的qa-playwright分支。先讀 `docs/Repository_Integration.md`，再看 `reports/QA_Report.html`。

新增 `qa/` 目錄；沿用根目錄npm ci、@playwright/test 1.58.2、既有Smoke、Playwright設定及workflow。僅提供package／lock與現有workflow的增量候選，沒有修改遠端Repository。

整合後，於Repository根目錄執行：

```powershell
npm ci
npm run qa:v1
Start-Process ".\qa\reports\QA_Report.html"
```

完整指令會做來源鎖定、去圖及原版等價驗證、80項L0–L5、三項mutation、HTML報告與Gate。沒有修改正式產文程式。12組Behavior及五組Golden保持原始核准狀態；Golden一律待審查。

## 檔案

- tests、fixtures、baselines：完整可重跑測試及兩種獨立基準。
- source：最新版輕量副本及來源識別；每次執行重新驗證。
- scripts：跨獨立／父層node_modules解析、測試、報告、核准紀錄與修復流程。
- docs：盤點、相依、風險、Golden、Release Gate、Windows及Repository整合手冊。
- integration：唯讀設定依據、package／lock候選及現有workflow patch；沒有可自動啟用的新workflow。
- reports：實際執行數據及環境矩陣；包含失敗與未核准狀態。

## 單獨使用

若不放入Repository，可在qa資料夾內執行npm ci，再使用原有npm run qa -- "C:\path\index.html"。單獨安裝仍鎖定Node 22／Playwright 1.58.2。正式整合建議共用根目錄依賴。

本輪本機瀏覽器為Chromium 153；Playwright預設Chromium 145與GitHub完整框架尚未在此環境執行。具體證據以target-environment.json及HTML報告為準，不將目標環境推定為PASS。
