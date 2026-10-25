# Output Section Map

buildSectionsData回傳14項；真正preview.innerText另存完整Snapshot。各欄位來源與跨段影響見Code_Inventory與Dependency_Matrix。

|欄位|角色|包含關係|
|---|---|---|
|caseNo|法院＋字號識別|不單獨作為全文段落|
|headerBlock|首部|完整DOM第一段|
|holdingText|主文|刑度、沒收附隨宣告、緩刑主文|
|factText|事實|三種引用模式|
|reasonFullText|完整理由|程序／證據＋crimeText＋confText|
|crimeText|論罪科刑所有子段|lawCompare、罪名、競合、加重、mit、sentencing、probation|
|lawCompareText|使用者自填比較|crimeText首子段（非空時）|
|enhText|累犯理由|注意不含另加的44條／其他加重|
|mitText|減輕理由|crimeText內|
|sentencingText|量刑|crimeText內|
|confText|沒收理由|reasonFullText末段|
|probationText|緩刑理由|crimeText末子段，與主文另外生成|
|closingBlock|據上論斷與簽名告知|完整理由之後|
|appendixText|法條＋文字附表|全文末段|

Metamorphic允許容器跟隨局部段落改變，但會檢查無關葉節點不變。Behavior Diff同時顯示葉段、容器與DOM全文，因此同一變更可能出現在多處，不能當成多個獨立錯誤計數。
