# 輸入與產文 Dependency Matrix

每個輸入的精確引用行號與輸出分類見 `source/dependency-map.json`，全欄位表見 Code_Inventory。以下為最重要的跨段相依。

|條件|主文|論罪／減刑|量刑|沒收|附錄|現行約束|
|---|---|---|---|---|---|---|
|crime-*|無自動同步|罪名、吸收與競合列舉|無|未自動同步角色|自動（可停用）|可同勾不相容罪名|
|holding-*|直接決定|無|無|主文宣告|僅44條主文同步44法條|主文／理由可能相反|
|fraud-ml-mit-mode|無|47條／23條敘述|47條適用提示|無|無|自白與所得模式未連動其他欄|
|ml23-mit-mode|無|獨立洗錢減刑|無|無|無|可與上一組互相矛盾|
|conf-role-mode|無|無|無|正犯／幫助沒收整段替換|無|不會切換罪名／主文|
|未扣案所得三個金額|獨立|val-mit-unpaid-amt|無|val-conf-proc-unseized|無|必須人工一致，F30檢查缺少防護|
|已繳交所得三個金額|獨立|val-mit-paid-amt|無|val-conf-proc-seized|無|必須人工一致|
|probation-mode／年數|雙向同步|緩刑子段|無|無|無|直接套用預設繞過同步|
|程序|首部稱謂|理由一有無與上層編號|無|無|無|結尾同步，隱藏上訴告知不切換|
|自填新舊法比較|無|插入首子段、後段重新編號|無|無|無|不是法規自動判斷|
|各快速預設|局部覆寫|局部覆寫|局部覆寫|局部覆寫|重新同步|歷史狀態可能殘留|

Allowed Change：姓名只許首部、主文、理由一；法院只許headerBlock/caseNo；新舊法比較只許lawCompareText/crimeText/reasonFullText並改子段編號；所得同步修改只許holding/mit/conf及其容器；緩刑只許holding/probation及其容器。M01–M09為可執行規格。
