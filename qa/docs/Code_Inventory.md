# 最新版 Code Inventory

唯一來源：`index(1).html`；版本 `html-2d990428e4ce`；SHA-256 `2d990428e4ce6a60576189745e5c5b2d3440151142ea0eebc90bcb35eb85729c`。以下行號以去圖副本為準；替換圖片未增減換行。

## 輸入與操作總覽

實際DOM：247 個 input/textarea/select；188 個初始可見；25 個 button。完整屬性、選項、label、預設與初始化後狀態見 `source/input-inventory.json`。條件式緩刑欄位初始隱藏但有作用，不能將所有隱藏欄位當無效。

沒有停用條件互斥：可同時選正犯／幫助、既遂／未遂、新法／舊法；使用者須自行保持一致。主文與理由多為分開輸入，僅緩刑年數、宣告模式及附錄法條有部分同步。舊模式按鈕隱藏且事件只呼叫 renderPreview，不再切換產文版本。

## 函式與輸出路徑

|函式／機制|位置|實際作用與風險|
|---|---|---|
|el / isChecked / val / radioVal|1306–1324|取DOM，字串 trim；遺失ID多採空值，可能默默退回預設|
|joinWithAnd / formatSubclauses|1335–1344|中文列舉；未選任何款次時預設回傳第2款，欠缺警示|
|syncAppendixStatutes|1346–1360|只在罪名checkbox變更、44條主文及auto-sync事件或預設套用呼叫；初始化沒有呼叫|
|toFinancialChineseNumber / uppercaseHoldingCondition|1362–1368|僅特定緩刑主文條件格式化；parseInt；1000以上回傳阿拉伯數字；一般所得金額／刑度為字串照填，無全域轉換|
|buildSectionsData|1370–1909|純讀DOM組字；回傳14個欄位，PAREN_NUMS僅10個，子段超量會產生undefined|
|renderPreview / escapeHtml|1911–1933|全文件組合，文字以HTML escaping及br呈現；輸入不可執行HTML|
|copyTextToClipboard / fallbackCopy|1935–1959|Clipboard API拒絕後使用execCommand(copy)；fallback未檢查布林回傳值，有待跨環境驗證|
|initApp|1961–2232|註冊事件、計數器、預設、緩刑同步並產生預覽|

## 輸出段落地圖

|讀取與輸出|主要條件|合理的跨段連動|
|---|---|---|
|首部 headerBlock / caseNo|法院、字號、程序、姓名、辯護人、偵查案號|程序亦影響理由一、結尾、檢察官稱謂；案由不推導罪名|
|主文 holdingText|各主文checkbox、刑度、獨立所得金額、緩刑|罪名文字多自由輸入，未同步論罪；累犯主文與enh-recidivist獨立|
|事實 factText|standard / quote / amend、val-fact-amend|不自動重建犯罪事實|
|理由一及證據|程序、include-reason-one、evid-mode|簡易程序略去理由一並重新編號|
|論罪 crimeText|所有crime-*、款次、共同正犯、吸收、競合、數罪、擴張審理|罪名帶入想像競合列舉；從一重罪仍須自行填寫|
|新舊法比較 lawCompareText|input-custom-law-compare|非空才插入第一子段，後續編號移動；無自動比較|
|累犯 enhText|enh-recidivist、recid-enhance-opt、val-recid-detail|enh-fpa44與enh-other也加入crimeText，但不在enhText回傳，區段複製要核對|
|減刑 mitText|fraud-ml-mit-mode、ml23-mit-mode、未遂／幫助／自首／組織自白|兩組自白選項可產生互斥敘述，程式無攔阻；部分隱藏舊checkbox不讀取|
|量刑 sentencingText|driver_full / accessory_full / short、年齡、情狀、求刑、不併罰金|driver_full固定含自始均坦承，與偵查未自白條件有矛盾風險|
|緩刑 probationText|grant/deny/omit、年數、74條款次、義務、監督|主文及理由同步模式與年數，但預設直接改radio繞過同步函式|
|沒收 confText|conf-role-mode、conf-proc-mode、報酬、扣案物／過苛|accessory模式會清空先前正犯沒收段；主文所得與理由金額互不連動|
|結尾 closingBlock|程序、449/450選項、檢察官、日期、庭別、簽名|日期西元轉民國；上訴文字為隱藏input，未隨程序切換|
|附錄 appendixText|stat-*、include-schedule、附表文字|由罪名同步；auto-sync停用可手動管理；沒有ML第2條專用附錄|

## 快速預設與持續狀態

- 兩個程序預設只改程序radio；三個案件預設採局部覆寫，非完整reset。
- 典型未清除未遂罪名、未遂減刑與先前幫助減刑等；幫助→典型可能殘留不同被害人選項。
- 未遂預設toast寫「未遂+緩刑」，卻將probation-mode設為omit、顯示grant面板。
- 清空只清大部分checkbox與少數文字，保留radio與其餘文字；未呼叫附錄同步，不等同恢復初始值。
- localStorage key `criminalJudgmentGeneratorUsageCount` 每次載入+1；不是訪客人數、事件次數或全站統計。測試各context隔離。
- 文字複製：全文取實際preview.innerText；六個區段複製以buildSectionsData回傳值組合。
- Word匯出：BOM+HTML，MIME application/msword，副檔名.doc；非OOXML .docx。需另用真實Word核對排版。
- 無列印按鈕事件實作；原始碼有Print button註解，不能列為已有功能。

## 全部輸入清冊

|ID／radio群組|型別|原始預設值|預設勾選|可見性|產文影響（靜態追溯）|
|---|---|---|---|---|---|
|show-all-sections-toggle|checkbox||✓|初始可見|無直接產文讀取；僅事件／同步／介面引用|
|input-court-name|text|臺灣OO地方法院||初始可見|首部 headerBlock / caseNo|
|input-case-no|text|O年度訴字第O號||初始可見|首部 headerBlock / caseNo|
|input-case-cause|text|||初始可見|首部 headerBlock / caseNo|
|input-defendant-name|text|||初始可見|首部 headerBlock / caseNo|
|input-lawyer-name|text|||初始可見|首部 headerBlock / caseNo|
|input-judgment-date|date|||初始可見|結尾 closingBlock|
|input-court-div|text|刑事第O庭||初始可見|結尾 closingBlock|
|input-judge-name|text|||初始可見|結尾 closingBlock|
|input-clerk-name|text|||初始可見|結尾 closingBlock|
|chk-pros-indict|checkbox||✓|初始可見|首部 headerBlock / caseNo|
|val-pros-indict|text|O年度偵字第O號||初始可見|首部 headerBlock / caseNo|
|chk-pros-add|checkbox|||初始可見|首部 headerBlock / caseNo|
|val-pros-add|text|O年度O字第O號||初始可見|首部 headerBlock / caseNo|
|chk-pros-merge|checkbox|||初始可見|首部 headerBlock / caseNo|
|val-pros-merge|text|O年度O字第O號||初始可見|首部 headerBlock / caseNo|
|chk-prosecutor-indict|checkbox||✓|初始可見|結尾 closingBlock|
|val-prosecutor-indict|text|||初始可見|結尾 closingBlock|
|chk-prosecutor-trial|checkbox||✓|初始可見|結尾 closingBlock|
|val-prosecutor-trial|text|||初始可見|結尾 closingBlock|
|rad-proc-summary-trial|radio|summary_trial|✓|初始可見|無直接產文讀取；僅事件／同步／介面引用|
|chk-include-reason-one|checkbox||✓|初始可見|事實 factText|
|rad-proc-simple-judgment|radio|simple_judgment||初始可見|無直接產文讀取；僅事件／同步／介面引用|
|chk-v9-proc-449-1|checkbox||✓|初始可見|沒收 confText / reasonFullText|
|chk-v9-proc-449-2|checkbox|||初始可見|沒收 confText / reasonFullText|
|chk-v9-proc-450|checkbox||✓|初始可見|沒收 confText / reasonFullText|
|chk-holding-recidivist|checkbox|||初始可見|首部 headerBlock / caseNo|
|chk-holding-1|checkbox||✓|初始可見|主文 holdingText|
|val-h1-crime-title|text|三人以上共同詐欺取財罪||初始可見|主文 holdingText|
|val-h1-sentence|text|處有期徒刑O年O月。||初始可見|主文 holdingText|
|chk-h1-sub1|checkbox|||初始可見|無直接產文讀取；保留控制項|
|chk-h1-sub2|checkbox||✓|初始可見|無直接產文讀取；保留控制項|
|chk-h1-sub3|checkbox|||初始可見|無直接產文讀取；保留控制項|
|chk-h1-sub4|checkbox|||初始可見|無直接產文讀取；保留控制項|
|chk-holding-2|checkbox|||初始可見|主文 holdingText|
|val-h2-crime-title|text|三人以上共同詐欺取財未遂罪||初始可見|主文 holdingText|
|val-h2-sentence|text|處有期徒刑O年O月。||初始可見|主文 holdingText|
|chk-h2-sub1|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-h2-sub2|checkbox||✓|隱藏／條件式|無直接產文讀取；保留控制項|
|chk-h2-sub3|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-h2-sub4|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-holding-3|checkbox|||初始可見|主文 holdingText, 法條同步 → appendixText|
|chk-h3-sub1|checkbox||✓|初始可見|主文 holdingText|
|chk-h3-sub2|checkbox|||初始可見|主文 holdingText|
|chk-h3-sub3|checkbox|||初始可見|主文 holdingText|
|val-h3-sentence|text|處有期徒刑O年O月。||初始可見|主文 holdingText|
|chk-v9-holding-recidivist|checkbox|||初始可見|首部 headerBlock / caseNo|
|chk-v9-h1|checkbox|||初始可見|主文 holdingText|
|val-v9-h1-term|text|O月||初始可見|主文 holdingText|
|chk-v9-h2|checkbox|||初始可見|主文 holdingText|
|val-v9-h2-term|text|O月||初始可見|主文 holdingText|
|val-v9-h2-fine|text|O元||初始可見|主文 holdingText|
|chk-v9-h3|checkbox|||初始可見|主文 holdingText|
|val-v9-h3-term|text|O月||初始可見|主文 holdingText|
|val-v9-h3-fine|text|O元||初始可見|主文 holdingText|
|chk-v9-h4|checkbox|||初始可見|主文 holdingText|
|val-v9-h4-term|text|O月||初始可見|主文 holdingText|
|chk-v9-h5|checkbox|||初始可見|主文 holdingText|
|val-v9-h5-term|text|O月||初始可見|主文 holdingText|
|val-v9-h5-fine|text|O元||初始可見|主文 holdingText|
|chk-v9-h6|checkbox|||初始可見|主文 holdingText|
|val-v9-h6-term|text|O月||初始可見|主文 holdingText|
|val-v9-h6-fine|text|O元||初始可見|主文 holdingText|
|chk-h-conf-table|checkbox||✓|初始可見|主文 holdingText|
|chk-h-conf-unseized|checkbox|||初始可見|主文 holdingText|
|val-h-unseized-amt|text|O元||初始可見|主文 holdingText|
|chk-h-conf-paid|checkbox|||初始可見|主文 holdingText|
|val-h-paid-amt|text|O元||初始可見|主文 holdingText|
|holding-probation-grant|checkbox|||初始可見|無直接產文讀取；僅事件／同步／介面引用|
|holding-probation-years|text|O||初始可見|主文 holdingText|
|val-holding-extra|text|||初始可見|主文 holdingText|
|rad-fact-standard|radio|standard|✓|初始可見|無直接產文讀取；保留控制項|
|rad-fact-quote|radio|quote||初始可見|無直接產文讀取；保留控制項|
|rad-fact-amend|radio|amend||初始可見|無直接產文讀取；保留控制項|
|val-fact-amend|textarea|一、（請於此處貼入或填寫本案犯罪事實） 二、案經告訴人訴由警察局報告臺灣OO地方檢察署檢察官偵查起訴。||初始可見|主文 holdingText|
|rad-evid-standard|radio|standard|✓|初始可見|無直接產文讀取；保留控制項|
|rad-evid-quote|radio|quote||初始可見|無直接產文讀取；保留控制項|
|rad-evid-amend|radio|amend||初始可見|無直接產文讀取；保留控制項|
|val-evid-amend|textarea|上開犯罪事實，業據被告於警詢、偵查、本院準備程序及簡式審判程序中均坦承不諱，核與證人即告訴人於警詢中之證述大致相符，並有扣押筆錄、扣押物品目錄表、對話紀錄截圖、偽造之收據在卷可查，足認被告上開任意性之自白與事實相符，堪以採信。||初始可見|理由 reasonFullText：程序與證據|
|auto-sync-statutes|checkbox||✓|初始可見|法條同步 → appendixText|
|crime-fraud-339-4|checkbox||✓|初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|c3394-sub1|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|c3394-sub2|checkbox||✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|c3394-sub3|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|c3394-sub4|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|crime-fpa-44|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|cfpa44-sub1|checkbox||✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|cfpa44-sub2|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|cfpa44-sub3|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|cfpa44-del-sub3|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|crime-fraud-339-4-att|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|c3394att-sub1|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|c3394att-sub2|checkbox||✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|c3394att-sub3|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|c3394att-sub4|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|crime-forgery-210|checkbox||✓|初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-forgery-220|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|val-forgery-220-part|text|O||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|crime-forgery-212|checkbox||✓|初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-ml-new19|checkbox||✓|初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-ml-old14|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-fraud-339|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-fraud-339-att|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-org-join|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-org-join-dup|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|crime-org-recruit|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-org-recruit-abroad|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|crime-org-recruit-minor|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|crime-org-force|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-org-force-join|checkbox||✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|crime-org-force-leave|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|crime-v9-30-1|checkbox|||初始可見|法條同步 → appendixText|
|crime-v9-339|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-v9-ml-old14|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-v9-ml-new19|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-v9-339-att|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-v9-ml-old14-att|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|crime-v9-ml-new19-att|checkbox|||初始可見|法條同步 → appendixText, 論罪／加重／減輕 crimeText / reasonFullText|
|chk-coprincipal|checkbox||✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|coprincipal-style|radio|detailed|✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|coprincipal-style|radio|concise||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|val-coprincipal-members|text|所屬詐欺集團成員||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-forgery-absorb|checkbox||✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|chk-imag-concur|checkbox||✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|chk-imag-diff-victims|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|val-imag-heavy-crime|text|刑法第339條之4第1項第2款三人以上共同詐欺取財||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|rad-multi-none|radio|none|✓|初始可見|無直接產文讀取；保留控制項|
|rad-multi-yes|radio|yes||初始可見|無直接產文讀取；保留控制項|
|val-multi-crimes|text|上開各次犯行||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|chk-fact-expand|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|chk-expand-indict|checkbox||✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|chk-expand-summary|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|input-custom-law-compare|textarea|||初始可見|理由 reasonFullText：程序與證據|
|chk-enable-ml-compare|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-enable-fpa-compare|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-law-compare-summary|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-law-compare-summary|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-v9-row1|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-v9-row2|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-v9-row3|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-v9-row4|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-v9-row5|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-v9-row6|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|enh-recidivist|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|val-recid-detail|textarea|被告前因OO案件，經法院判處有期徒刑O月確定，於民國O年O月O日執行完畢等情，有法院前案紀錄表在卷可參||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|recid-enhance-opt|radio|yes|✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|recid-enhance-opt|radio|no||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|val-recid-date|text|O年O月O日||隱藏／條件式|無直接產文讀取；保留控制項|
|val-recid-case|text|O年度O字第O號||隱藏／條件式|無直接產文讀取；保留控制項|
|enh-fpa44|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|enh-other|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|val-enh-other|text|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|chk-mit-imag-merge-theory|checkbox||✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|fraud-ml-mit-mode|radio|confess_no_proceeds|✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|fraud-ml-mit-mode|radio|confess_paid_proceeds||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|val-mit-paid-amt|text|O元||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|fraud-ml-mit-mode|radio|confess_unpaid_proceeds||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|val-mit-unpaid-amt|text|O元||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|fraud-ml-mit-mode|radio|no_confess_in_investigation||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|fraud-ml-mit-mode|radio|omit||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|ml23-mit-mode|radio|deny||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|ml23-mit-mode|radio|confess||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|ml23-mit-mode|radio|omit|✓|初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|mit-attempt-25|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|mit-accessory-30|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|mit-org-8|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|mit-surrender-62|checkbox|||初始可見|論罪／加重／減輕 crimeText / reasonFullText|
|mit-ml-old16|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|mit-ml-old16-sentonly|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|mit-ml-new23|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|mit-ml-new23-sentonly|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|mit-org-8-sentonly|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|mit-fpa-old47|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|mit-fpa-old47-court|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|mit-fpa-new47|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|mit-fpa-new47-deemed|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-surrender-reason|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|mit-art59|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-art59-reason|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|chk-art70-71|checkbox||✓|隱藏／條件式|無直接產文讀取；保留控制項|
|sentencing-style|radio|driver_full|✓|初始可見|量刑 sentencingText / crimeText / reasonFullText|
|sentencing-style|radio|accessory_full||初始可見|量刑 sentencingText / crimeText / reasonFullText|
|sentencing-style|radio|short||初始可見|量刑 sentencingText / crimeText / reasonFullText|
|val-sent-age|text|正值壯年||初始可見|量刑 sentencingText / crimeText / reasonFullText|
|val-sentencing-factors|text|OO之智識程度、家庭及經濟狀況||初始可見|量刑 sentencingText / crimeText / reasonFullText|
|val-sent-prosecutor-ask|text|有期徒刑O年以上刑度||初始可見|量刑 sentencingText / crimeText / reasonFullText|
|chk-sent-no-fine|checkbox||✓|初始可見|量刑 sentencingText / crimeText / reasonFullText|
|probation-mode|radio|omit|✓|初始可見|主文 holdingText, 量刑 sentencingText / crimeText / reasonFullText|
|probation-mode|radio|deny||初始可見|主文 holdingText, 量刑 sentencingText / crimeText / reasonFullText|
|probation-mode|radio|grant||初始可見|主文 holdingText, 量刑 sentencingText / crimeText / reasonFullText|
|prob-deny-5yr|checkbox||✓|隱藏／條件式|緩刑 probationText / crimeText / reasonFullText|
|val-prob-deny-other|text|||隱藏／條件式|緩刑 probationText / crimeText / reasonFullText|
|val-prob-clause|select-one|第1款||隱藏／條件式|緩刑 probationText / crimeText / reasonFullText|
|val-prob-years|text|O||隱藏／條件式|主文 holdingText, 緩刑 probationText / crimeText / reasonFullText|
|prob-reason-confess|checkbox||✓|隱藏／條件式|緩刑 probationText / crimeText / reasonFullText|
|prob-reason-settle|checkbox||✓|隱藏／條件式|緩刑 probationText / crimeText / reasonFullText|
|prob-supervision|checkbox||✓|隱藏／條件式|主文 holdingText, 緩刑 probationText / crimeText / reasonFullText|
|prob-cond-3|checkbox||✓|隱藏／條件式|主文 holdingText, 緩刑 probationText / crimeText / reasonFullText|
|val-prob-cond-3|text|應向告訴人支付共計O萬元，自O年O月O日起，於每月O日前匯款O元至告訴人指定之帳戶。||隱藏／條件式|主文 holdingText, 緩刑 probationText / crimeText / reasonFullText|
|prob-cond-4|checkbox|||隱藏／條件式|主文 holdingText, 緩刑 probationText / crimeText / reasonFullText|
|val-prob-cond-4|text|應於本判決確定後O個月內向公庫支付新臺幣O萬元。||隱藏／條件式|主文 holdingText, 緩刑 probationText / crimeText / reasonFullText|
|prob-cond-5|checkbox|||隱藏／條件式|主文 holdingText, 緩刑 probationText / crimeText / reasonFullText|
|val-prob-cond-5|text|並應於本案判決確定後O年內，向執行檢察官指定之政府機關、政府機構、行政法人、社區或其他符合公益目的之機構或團體提供OO小時之義務勞務。||隱藏／條件式|主文 holdingText, 緩刑 probationText / crimeText / reasonFullText|
|conf-role-mode|radio|principal|✓|初始可見|沒收 confText / reasonFullText|
|conf-role-mode|radio|accessory||初始可見|沒收 confText / reasonFullText|
|accessory-conf-income|radio|none|✓|初始可見|沒收 confText / reasonFullText|
|accessory-conf-income|radio|received||初始可見|沒收 confText / reasonFullText|
|val-accessory-proceeds|text|O元||初始可見|沒收 confText / reasonFullText|
|chk-conf-ml25-intro|checkbox||✓|初始可見|沒收 confText / reasonFullText|
|chk-conf-proceeds-section|checkbox||✓|初始可見|沒收 confText / reasonFullText|
|conf-proc-mode|radio|no_proceeds|✓|初始可見|沒收 confText / reasonFullText|
|conf-proc-mode|radio|unseized_proceeds||初始可見|沒收 confText / reasonFullText|
|val-conf-proc-unseized|text|O元||初始可見|沒收 confText / reasonFullText|
|conf-proc-mode|radio|paid_proceeds||初始可見|沒收 confText / reasonFullText|
|val-conf-proc-seized|text|O元||初始可見|沒收 confText / reasonFullText|
|conf-fpa48|checkbox||✓|初始可見|沒收 confText / reasonFullText|
|conf-adj-fpa-lowcost|checkbox||✓|初始可見|沒收 confText / reasonFullText|
|val-conf-adj-lowcost-item|text|偽造工作證||初始可見|沒收 confText / reasonFullText|
|conf-v9-no-proceeds|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|conf-v9-no-ml-prop|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-conf-fpa48-seized|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-conf-fpa48-unseized|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|conf-proceeds-38-1|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|conf-collect-38-1-3|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|conf-collect-except|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-conf-collect-except-item|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|conf-ml-25|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-conf-ml25-amt|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-conf-ml25-acct|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|conf-adj-proceeds|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-conf-adj-proceeds|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|conf-adj-ml25|checkbox|||隱藏／條件式|無直接產文讀取；保留控制項|
|val-conf-adj-ml25-amt|text|||隱藏／條件式|無直接產文讀取；保留控制項|
|stat-criminal-339-4|checkbox||✓|初始可見|法條同步 → appendixText|
|stat-criminal-216|checkbox||✓|初始可見|法條同步 → appendixText|
|stat-criminal-212|checkbox||✓|初始可見|法條同步 → appendixText|
|stat-criminal-210|checkbox||✓|初始可見|法條同步 → appendixText|
|stat-ml-new19|checkbox||✓|初始可見|法條同步 → appendixText|
|stat-ml-old14|checkbox|||初始可見|法條同步 → appendixText|
|stat-criminal-30|checkbox|||初始可見|法條同步 → appendixText|
|stat-criminal-339|checkbox|||初始可見|法條同步 → appendixText|
|stat-org-3|checkbox|||初始可見|法條同步 → appendixText|
|stat-org-4|checkbox|||初始可見|法條同步 → appendixText|
|stat-fpa-44|checkbox|||初始可見|法條同步 → appendixText|
|chk-include-schedule|checkbox|||初始可見|附錄 appendixText|
|val-schedule-text|textarea|編號1：偽造之「OO股份有限公司收據」1張（上有偽造之「OO股份有限公司」公司印文1枚、「OOO」印文1枚）（O號偵卷第O頁）||初始可見|附錄 appendixText|
|input-appeal-text|text|如不服本判決應於收受本判決後20日內向本院提出上訴書狀，上訴書狀應敘述具體理由。上訴書狀未敘述上訴理由者，應於上訴期間屆滿後20日內補提理由書狀於本院(均須按他造當事人之人數附繕本 )「切勿逕送上級法院」。||隱藏／條件式|結尾 closingBlock|

## 掃描限制

上述依固定字串引用及原始碼區塊建立追溯；radio的同名群組共用依賴。這是人工覆核輔助清冊，不把靜態文字命中當分支覆蓋率。完整runtime屬性另存JSON；未涵蓋項目不可宣稱已測。
