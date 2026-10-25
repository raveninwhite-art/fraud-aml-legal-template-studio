# Repair Workflow（供未來Work重複使用）

## Red → Green → 全套驗收

1. 取得最新版唯一index.html，prepare-source/verify-source/audit-source，記錄hash。不得用其他版本替代。
2. 新增Issue紀錄：輸入、操作順序、實際段落、預期規則、證據出處及分級；使用虛構資料。
3. 先新增能抓住問題的DOM測試；在未修正程式上實跑失敗。保存Red結果，不得只有推測。
4. 建repair-plan（case、段落、Allowed Change及核准範圍）。Phase 2才可修改正式產文；本次未進行。
5. 最小修正後跑新增測試，確認Green。不要順便改無關範本。
6. 完整qa，檢查全部Behavior逐段diff及欄位差異，區分修復內／外變化；新操作順序若暴露狀態問題，加入State或Metamorphic。
7. 基準差異不自動核准。Behavior候選另存，具體核准後逐案accept。Golden若法律規則真需改變，重新提交人工核准；勿用Snapshot覆寫Golden。
8. 刷新來源及結果，P0/P1/P2達標、三項mutation有效，再經Human Gate及Release Sign-off發布。

## 工作紀錄

Issue格式至少包含：id、sourceSha256、fixture、steps、actual、expectedRule、sourceEvidence、priority、repairScope、Red run、Green run、fullSuite run、diffDecision、humanApprovalRef。`docs/repair-plan.example.json`可複製使用。

- 既有缺陷：同一初始來源已重現；列Known Issues但維持紅燈。
- 新Regression：新版出現先前通過的規則失敗，或Behavior有未核准差異；必須檢查段落。
- 框架問題：錯誤的selector、parser或環境；修框架、說明證據，不能改產品Expected掩蓋問題。
- Coverage Gap：目前UI無法表達；不建虛構欄位、不宣稱測過。
- 法律／文句待核准：列Needs Review，不自動PASS。

## Baseline與例外

Behavior baseline:candidate不覆寫Expected；accept會封存前版及記錄審查人、理由、範圍與雜湊。Golden approvals綁fixture及候選規格hash，任何變動即失效。例外需有期限與替代檢核，不刪測試、不清空fail、不修改Expected來讓報告綠燈。

新增測試後同步更新tests/test-plan.json並審查測試數，避免只跑子集卻被當完整驗收。
