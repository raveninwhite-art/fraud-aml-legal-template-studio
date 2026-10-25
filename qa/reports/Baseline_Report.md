# Baseline Report

本次整合環境完整測試執行時間：2026-10-25T14:39:27.991Z–2026-10-25T14:40:39.983Z（UTC；臺灣時間+8）。Node v22.23.4、Playwright 1.58.2、Chromium 153.0.8010.0。唯一來源SHA-256：`2d990428e4ce6a60576189745e5c5b2d3440151142ea0eebc90bcb35eb85729c`。正式檔未修改。

根目錄單次npm ci及qa:v1已在本機父層依賴配置驗證；GitHub Actions完整框架與預設Chromium 145未在此實跑。

## 真實執行結果

80項：**68 Passed / 7 Failed / 0 Skipped / 5 Needs Review**。不是全部通過，也不是正式法律驗收。

|模組|Passed|Failed|Skipped|Needs Review|
|---|---|---|---|---|
|behavior|12|0|0|0|
|functional|29|3|0|0|
|golden|0|0|0|5|
|metamorphic|9|0|0|0|
|smoke|8|0|0|0|
|state|10|4|0|0|

## Baseline區分

- Behavior 12案均與本次最新版實際Snapshot完全一致。狀態CURRENT_BEHAVIOR_NOT_LEGAL_APPROVAL。來源hash、fixture及操作順序、DOM文字、14個回傳欄位、247個欄位狀態與Snapshot hash均保存。
- Golden 5案均為PROPOSED_NOT_APPROVED，沒有正式核准。Structural／Strict從附件法律條件設計，沒有將Behavior全文複製為Expected。

|候選|符合機器候選規則|未符合|正式狀態|
|---|---|---|---|
|G01|26/26|無|Needs Review|
|G02|27/27|無|Needs Review|
|G03|21/22|G03-A17|Needs Review|
|G04|27/27|無|Needs Review|
|G05|32/32|無|Needs Review|

五案合計133/134條候選機器規則符合；G03偵查未自白與量刑自始均坦承相衝突。這不是Golden PASS率。所有Editorial Review及Coverage Gap仍待人工處理。

## 負向驗證

3/3已偵測；每項均先在當前來源做正向控制，再改獨立副本，快照與獨立規則都能抓到。副本已刪除，原始／去圖檔未改。結果見mutations.json。

## 覆蓋與未涵蓋

- 直接操作102/247控制項（41.3%）；初始可見操作98/188（52.1%）。其餘控制項預設狀態有保存，不代表有效分支已測。
- 覆蓋既遂／未遂、正犯／幫助、新舊洗錢附錄、偽造文書、競合、累犯、減刑、所得、緩刑、程序、組織罪、HTML escaping、七種複製操作及Word下載。
- 九項局部不變性檢查通過；只改姓名、法院、所得、比較、緩刑、單一罪名、年齡、事實、程序的允許範圍均有明確規則。
- 沒有程式碼分支或所有組合覆蓋率。未窮舉高風險法條任意互斥組合，也沒有Windows／Microsoft Word排版實測。
- 五份PDF皆以正犯車手為主；幫助、未遂及緩刑雖有功能測試，目前沒有對應已核准Golden。

## 當前分類與下一階段

六組Known Issues對應七個失敗測試。新增Behavior Regression：0（本輪為首次建基準，無歷史版比較）；已修復正式程式項目：0。框架開發曾有Word解析誤報，已修正並在最終全套確認通過。

Gate：BLOCKED / BASELINE_PENDING_APPROVAL。P0 F19/F29/F30未清零，State S02/S03/S08/S14失敗，Golden未核准。

Phase 2建議：先修K01編號與K02自白文句；再修K04預設完整重設、K05/K06介面及清空；接著依使用者選定的規格補K03金額一致性防護。每項先Red再Green，最後全套與逐段diff。五案法律及固定文字核准應與修復並行，但不得以核准候選為由忽略Coverage Gap。
