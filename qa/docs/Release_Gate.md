# Release Gate

首次交付：BASELINE_PENDING_APPROVAL，正式發布BLOCKED；Phase 1框架完成不等同產品驗收。

|門檻|規則|
|---|---|
|P0|罪名、法條、金額、刑度、法律結論、主文理由矛盾或重大產文錯誤必須0 Fail|
|P1|Behavior無未核准差異；核准Golden及功能回歸全部通過；既有失敗不得以known-issues清單放行|
|P2|載入、分頁、複製、下載等基本操作正常|
|完整執行|test-plan.json中的80個ID全部且僅執行一次；子集、Skip或基礎設施錯誤不可驗收|
|負向驗證|當前受測來源的三項正向控制與mutation均偵測成功；舊資料不得代用|
|Human|五案Golden精確hash核准，另完成法律、Editorial及未涵蓋條件之驗收與Release Sign-off|

`npm run gate`在阻擋時回傳2。僅有npm test回傳0仍不足：候選Golden在Playwright執行器內完成規則蒐集，QA Reporter會改列Needs Review。請以QA_Report及release-gate.json為準。

核准檔是本機程序紀錄，沒有權限驗證或數位簽章；使用者或Reviewer應審查Git／檔案變更。不得由模型自行產生核准人或核准紀錄。原始法律規格不得用目前Snapshot推導。

正式例外不得隱藏Fail。Exception_Record.json須記錄issue、受測hash、風險、核准人、依據、期限及補強措施。此框架不提供自動P0放行；任何例外需獨立的人工作業裁定。未做人工核准時保持BLOCKED。
