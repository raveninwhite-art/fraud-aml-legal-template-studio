# Golden Case Spec — PROPOSED_NOT_APPROVED

五份附件已完整擷取及閱讀，共43頁，並檢視全部頁面縮圖。原始PDF及擷取全文未納入交付；案件姓名、住址、帳號、公司名及卷頁改為虛構或留待填寫。法律條件、修法時間、所得／詐得金額差異及刑度保留。沒有查核附件以外的現行法，不能以候選符合率當法律核准。

Structural檢查存在、順序與編號；Strict僅限列明的罪名、法條、金額、刑度及結論；Editorial一律人工。候選摘要不是完整法律比較範本，也不是對原判決逐字正確性的背書。

## G01｜車手無所得／雙文書／洗錢跨修法

來源 `115,原訴,56,20260831,2.pdf`；SHA-256 `5419453615d8adf358af4fd889847cfe874b0627e36ba8a053838e2b61407e27`。

定位：holding: p1 13–15；lawCompare: p3–7；crime: p7–8；mitigation: p8–9；confiscation: p9–11。

【虛構測試】被告於113年7月4日擔任收款車手，與集團成員共同詐得20萬元，出示偽造工作證及收據後將款項交上游，未取得報酬。參與犯罪組織部分業經另案處理。

### 網頁欄位與操作順序

|順序|動作|值|
|---|---|---|
|1|click|preset-typical-btn|
|2|input-defendant-name|測試被告甲|
|3|input-case-cause|加重詐欺等|
|4|input-judge-name|測試法官|
|5|input-clerk-name|測試書記官|
|6|val-prosecutor-indict|測試檢察官甲|
|7|val-prosecutor-trial|測試檢察官乙|
|8|input-defendant-name|測試被告甲|
|9|input-case-no|115年度測試字第1號|
|10|val-h1-sentence|處有期徒刑壹年伍月。|
|11|crime-forgery-210|True|
|12|crime-forgery-212|True|
|13|chk-forgery-absorb|True|
|14|chk-h-conf-table|True|
|15|conf-fpa48|True|
|16|conf-adj-fpa-lowcost|True|
|17|@coprincipal-style|detailed|
|18|chk-include-reason-one|True|
|19|chk-sent-no-fine|True|
|20|chk-mit-imag-merge-theory|True|
|21|val-sent-prosecutor-ask|有期徒刑5年以上刑度|
|22|rad-fact-standard|True|
|23|rad-evid-standard|True|
|24|val-fact-amend|【虛構測試】被告於113年7月4日擔任收款車手，與集團成員共同詐得20萬元，出示偽造工作證及收據後將款項交上游，未取得報酬。參與犯罪組織部分業經另案處理。|
|25|val-evid-amend|【虛構測試】被告於偵查及審理均自白，與被害人證述及交易、通訊、扣押等客觀資料核對相符；實際證據及卷頁由使用者另填。|
|26|val-sentencing-factors|測試教育、職業、家庭及經濟情狀|
|27|@fraud-ml-mit-mode|confess_no_proceeds|
|28|input-custom-law-compare|【Golden候選自填摘要】刑法第2條第1項為新舊法比較依據。詐欺金額未達100萬元，本案無詐欺犯罪危害防制條例第43條、第44條適用。洗錢犯行在113年8月2日修法施行前，依新舊洗錢防制法整體比較，本案適用較有利之修正後第19條第1項後段。第47條減刑另於減輕事由說明。|
|29|chk-include-schedule|True|
|30|val-schedule-text|編號1：虛構投資公司收據1張，附有偽造公司印文及署押；所在卷頁由使用者另填。|

### Structural / Strict候選規則

|規則|類型|輸出段|條件|
|---|---|---|---|
|G01-A01|order|text|主　文 → 事　實 → 理　由 → 認定犯罪事實所憑證據及理由 → 論罪科刑 → 沒收： → 據上論斷 → 附錄本案論罪科刑法條|
|G01-A02|numbering|crimeText|㈠起連續不跳號|
|G01-A03|numbering|confText|㈠起連續不跳號|
|G01-A04|contains|holdingText|處有期徒刑壹年伍月。|
|G01-A05|contains|crimeText|刑法第339條之4第1項第2款之三人以上共同詐欺取財罪|
|G01-A06|contains|crimeText|洗錢防制法第19條第1項後段之洗錢罪|
|G01-A07|contains|crimeText|刑法第28條|
|G01-A08|contains|crimeText|刑法第55條|
|G01-A09|notContains|holdingText|未遂|
|G01-A10|notContains|holdingText|幫助|
|G01-A11|notContains|crimeText|後段之參與犯罪組織罪|
|G01-A12|contains|appendixText|洗錢防制法第19條|
|G01-A13|contains|confText|刑法第38條之2第2項|
|G01-A14|contains|crimeText|刑法第216條、第210條之行使偽造私文書罪|
|G01-A15|contains|crimeText|高度行為所吸收|
|G01-A16|contains|confText|詐欺犯罪危害防制條例第48條第1項|
|G01-A17|contains|crimeText|刑法第216條、第212條之行使偽造特種文書罪|
|G01-A18|contains|mitText|自無繳交犯罪所得之問題|
|G01-A19|notContains|holdingText|犯罪所得新臺幣|
|G01-A20|order|crimeText|新舊法比較： → 核被告所為 → 論以共同正犯 → 高度行為所吸收 → 為想像競合犯 → 刑之減輕事由 → 爰審酌|
|G01-A21|contains|reasonFullText|二、認定犯罪事實|
|G01-A22|contains|reasonFullText|三、論罪科刑|
|G01-A23|contains|reasonFullText|四、沒收|
|G01-A24|contains|crimeText|未達100萬元|
|G01-A25|contains|crimeText|113年8月2日|
|G01-A26|contains|crimeText|修正後第19條第1項後段|

### Editorial Review

- 完整法條適用與法律結論須使用者核准；測試沒有查核現行法。
- 自填事實、證據、量刑個人情狀、附表及新舊法比較僅為去識別化候選摘要。
- 檢查編號、量刑用語及重複比較文字；段落不必逐字複製PDF。

### Coverage Gap

- 無日期／金額自動判斷新舊法功能；比較段落須人工填寫。
- 主文、所得減刑及沒收理由金額分別填寫，無自動一致性約束。
- PDF卷證表格僅能以純文字附表表示。
- 原判決沒收之裁判時法說明無獨立輸入欄位；尚未完整重現。

### 需要自行輸入

- 法院、當事人、辯護人、檢察官、法官、書記官及日期
- 個案犯罪事實、證據與卷頁、量刑情狀、附表
- 宣告刑及分別填寫的所得金額
- 新舊法比較全文

### 待裁定

- PDF存在「同年月00日」或「0月0日」占位日期，不採為Strict Expected。
- 部分PDF有「第第1項」重複字，不採為正確標準。

所有Strict文字與法律結論仍為PROPOSED_NOT_APPROVED；不因候選檢查成功自動轉為Golden PASS。

## G02｜車手未繳所得4,000元／雙文書

來源 `115,訴,1789,20260923,1.pdf`；SHA-256 `eff7dfa41da78b397225e5014440bbfe93c8cb4e23ab9cb43ec16c780b40d59e`。

定位：holding: p1 11–14；crime: p2–3；mitigation: p3 9–29；confiscation: p4–5。

【虛構測試】被告於113年11月26日出示偽造工作證與收據，向被害人收取50萬元後交上游，獲得報酬，以有利被告原則認定4,000元，未繳交。組織罪另案處理。

### 網頁欄位與操作順序

|順序|動作|值|
|---|---|---|
|1|click|preset-typical-btn|
|2|input-defendant-name|測試被告甲|
|3|input-case-cause|加重詐欺等|
|4|input-judge-name|測試法官|
|5|input-clerk-name|測試書記官|
|6|val-prosecutor-indict|測試檢察官甲|
|7|val-prosecutor-trial|測試檢察官乙|
|8|input-defendant-name|測試被告乙|
|9|input-case-no|115年度測試字第2號|
|10|val-h1-sentence|處有期徒刑壹年捌月。|
|11|crime-forgery-210|True|
|12|crime-forgery-212|True|
|13|chk-forgery-absorb|True|
|14|chk-h-conf-table|True|
|15|conf-fpa48|True|
|16|conf-adj-fpa-lowcost|True|
|17|@coprincipal-style|concise|
|18|chk-include-reason-one|True|
|19|chk-sent-no-fine|True|
|20|chk-mit-imag-merge-theory|False|
|21|val-sent-prosecutor-ask|有期徒刑2年以上刑度|
|22|rad-fact-standard|True|
|23|rad-evid-standard|True|
|24|val-fact-amend|【虛構測試】被告於113年11月26日出示偽造工作證與收據，向被害人收取50萬元後交上游，獲得報酬，以有利被告原則認定4,000元，未繳交。組織罪另案處理。|
|25|val-evid-amend|【虛構測試】被告於偵查及審理均自白，與被害人證述及交易、通訊、扣押等客觀資料核對相符；實際證據及卷頁由使用者另填。|
|26|val-sentencing-factors|測試教育、職業、家庭及經濟情狀|
|27|@fraud-ml-mit-mode|confess_unpaid_proceeds|
|28|val-mit-unpaid-amt|4,000元|
|29|@conf-proc-mode|unseized_proceeds|
|30|val-conf-proc-unseized|4,000元|
|31|chk-h-conf-unseized|True|
|32|val-h-unseized-amt|肆仟元|
|33|chk-include-schedule|True|
|34|val-schedule-text|編號1：虛構投資公司收據1張，附有偽造公司印文及署押；所在卷頁由使用者另填。|

### Structural / Strict候選規則

|規則|類型|輸出段|條件|
|---|---|---|---|
|G02-A01|order|text|主　文 → 事　實 → 理　由 → 認定犯罪事實所憑證據及理由 → 論罪科刑 → 沒收： → 據上論斷 → 附錄本案論罪科刑法條|
|G02-A02|numbering|crimeText|㈠起連續不跳號|
|G02-A03|numbering|confText|㈠起連續不跳號|
|G02-A04|contains|holdingText|處有期徒刑壹年捌月。|
|G02-A05|contains|crimeText|刑法第339條之4第1項第2款之三人以上共同詐欺取財罪|
|G02-A06|contains|crimeText|洗錢防制法第19條第1項後段之洗錢罪|
|G02-A07|contains|crimeText|刑法第28條|
|G02-A08|contains|crimeText|刑法第55條|
|G02-A09|notContains|holdingText|未遂|
|G02-A10|notContains|holdingText|幫助|
|G02-A11|notContains|crimeText|後段之參與犯罪組織罪|
|G02-A12|contains|appendixText|洗錢防制法第19條|
|G02-A13|contains|confText|刑法第38條之2第2項|
|G02-A14|contains|crimeText|刑法第216條、第210條之行使偽造私文書罪|
|G02-A15|contains|crimeText|高度行為所吸收|
|G02-A16|contains|confText|詐欺犯罪危害防制條例第48條第1項|
|G02-A17|contains|crimeText|刑法第216條、第212條之行使偽造特種文書罪|
|G02-A18|contains|confText|4,000元|
|G02-A19|contains|mitText|4,000元|
|G02-A20|contains|holdingText|未扣案之犯罪所得新臺幣肆仟元|
|G02-A21|contains|holdingText|追徵其價額|
|G02-A22|contains|mitText|而其並未繳交犯罪所得|
|G02-A23|notContains|mitText|爰依修正前詐欺犯罪危害防制條例第47條前段減輕其刑|
|G02-A24|order|crimeText|核被告所為 → 論以共同正犯 → 高度行為所吸收 → 為想像競合犯 → 刑之減輕事由 → 爰審酌|
|G02-A25|contains|reasonFullText|二、認定犯罪事實|
|G02-A26|contains|reasonFullText|三、論罪科刑|
|G02-A27|contains|reasonFullText|四、沒收|

### Editorial Review

- 完整法條適用與法律結論須使用者核准；測試沒有查核現行法。
- 自填事實、證據、量刑個人情狀、附表及新舊法比較僅為去識別化候選摘要。
- 檢查編號、量刑用語及重複比較文字；段落不必逐字複製PDF。

### Coverage Gap

- 無日期／金額自動判斷新舊法功能；比較段落須人工填寫。
- 主文、所得減刑及沒收理由金額分別填寫，無自動一致性約束。
- PDF卷證表格僅能以純文字附表表示。
- 所得供述有差異與罪疑惟輕之個案推論無專用沒收欄位，僅在測試事實摘要記錄。

### 需要自行輸入

- 法院、當事人、辯護人、檢察官、法官、書記官及日期
- 個案犯罪事實、證據與卷頁、量刑情狀、附表
- 宣告刑及分別填寫的所得金額

### 待裁定

- PDF存在「同年月00日」或「0月0日」占位日期，不採為Strict Expected。
- 部分PDF有「第第1項」重複字，不採為正確標準。

所有Strict文字與法律結論仍為PROPOSED_NOT_APPROVED；不因候選檢查成功自動轉為Golden PASS。

## G03｜提款車手／偵查未自白／無所得

來源 `115,訴,1924,20261014,1.pdf`；SHA-256 `30bde4476be42bb958ba8b64b6e6eb15002d8b15347b86aab99d95a11c149ccc`。

定位：holding: p1 10–11；crime: p2 12–20；mitigation: p2–3；confiscation: p3–4；sentencing: p3 10–23。

【虛構測試】被告於114年8月擔任提款車手，提領被害人因詐術匯入之款項後交上游；未取得報酬。偵查時未自白，本院審理時坦承。

### 網頁欄位與操作順序

|順序|動作|值|
|---|---|---|
|1|click|preset-typical-btn|
|2|input-defendant-name|測試被告甲|
|3|input-case-cause|加重詐欺等|
|4|input-judge-name|測試法官|
|5|input-clerk-name|測試書記官|
|6|val-prosecutor-indict|測試檢察官甲|
|7|val-prosecutor-trial|測試檢察官乙|
|8|input-defendant-name|測試被告丙|
|9|input-case-no|115年度測試字第3號|
|10|val-h1-sentence|處有期徒刑壹年貳月。|
|11|crime-forgery-210|False|
|12|crime-forgery-212|False|
|13|chk-forgery-absorb|False|
|14|chk-h-conf-table|False|
|15|conf-fpa48|False|
|16|conf-adj-fpa-lowcost|False|
|17|@coprincipal-style|concise|
|18|chk-include-reason-one|False|
|19|chk-sent-no-fine|True|
|20|chk-mit-imag-merge-theory|False|
|21|val-sent-prosecutor-ask|有期徒刑2年以上刑度|
|22|rad-fact-standard|True|
|23|rad-evid-standard|True|
|24|val-fact-amend|【虛構測試】被告於114年8月擔任提款車手，提領被害人因詐術匯入之款項後交上游；未取得報酬。偵查時未自白，本院審理時坦承。|
|25|val-evid-amend|【虛構測試】被告僅於本院準備及審理程序自白，與被害人證述及交易、通訊、扣押等客觀資料核對相符；實際證據及卷頁由使用者另填。|
|26|val-sentencing-factors|測試教育、職業、家庭及經濟情狀|
|27|@fraud-ml-mit-mode|no_confess_in_investigation|
|28|chk-include-schedule|False|

### Structural / Strict候選規則

|規則|類型|輸出段|條件|
|---|---|---|---|
|G03-A01|order|text|主　文 → 事　實 → 理　由 → 認定犯罪事實所憑證據及理由 → 論罪科刑 → 沒收： → 據上論斷 → 附錄本案論罪科刑法條|
|G03-A02|numbering|crimeText|㈠起連續不跳號|
|G03-A03|numbering|confText|㈠起連續不跳號|
|G03-A04|contains|holdingText|處有期徒刑壹年貳月。|
|G03-A05|contains|crimeText|刑法第339條之4第1項第2款之三人以上共同詐欺取財罪|
|G03-A06|contains|crimeText|洗錢防制法第19條第1項後段之洗錢罪|
|G03-A07|contains|crimeText|刑法第28條|
|G03-A08|contains|crimeText|刑法第55條|
|G03-A09|notContains|holdingText|未遂|
|G03-A10|notContains|holdingText|幫助|
|G03-A11|notContains|crimeText|後段之參與犯罪組織罪|
|G03-A12|contains|appendixText|洗錢防制法第19條|
|G03-A13|contains|confText|刑法第38條之2第2項|
|G03-A14|notContains|crimeText|行使偽造|
|G03-A15|notContains|holdingText|沒收之|
|G03-A16|contains|mitText|於偵查中未自白|
|G03-A17|notContains|sentencingText|自始均坦承犯行|
|G03-A18|notContains|reasonFullText|一、本件被告|
|G03-A19|order|crimeText|核被告所為 → 論以共同正犯 → 為想像競合犯 → 刑之減輕事由 → 爰審酌|
|G03-A20|contains|reasonFullText|一、認定犯罪事實|
|G03-A21|contains|reasonFullText|二、論罪科刑|
|G03-A22|contains|reasonFullText|三、沒收|

### Editorial Review

- 完整法條適用與法律結論須使用者核准；測試沒有查核現行法。
- 自填事實、證據、量刑個人情狀、附表及新舊法比較僅為去識別化候選摘要。
- 檢查編號、量刑用語及重複比較文字；段落不必逐字複製PDF。

### Coverage Gap

- 無日期／金額自動判斷新舊法功能；比較段落須人工填寫。
- 主文、所得減刑及沒收理由金額分別填寫，無自動一致性約束。
- PDF卷證表格僅能以純文字附表表示。

### 需要自行輸入

- 法院、當事人、辯護人、檢察官、法官、書記官及日期
- 個案犯罪事實、證據與卷頁、量刑情狀、附表
- 宣告刑及分別填寫的所得金額

### 待裁定

- PDF存在「同年月00日」或「0月0日」占位日期，不採為Strict Expected。
- 部分PDF有「第第1項」重複字，不採為正確標準。
- 未自白與「自始均坦承」量刑句是否矛盾，列候選禁止規則。

所有Strict文字與法律結論仍為PROPOSED_NOT_APPROVED；不因候選檢查成功自動轉為Golden PASS。

## G04｜車手已繳所得1,000元／百萬門檻比較

來源 `115,訴,685,20260826,2.pdf`；SHA-256 `2693817a24170c128a65f3b360ec49d0fad59497d8510910b801406a61b9ba26`。

定位：holding: p1 10–12；lawCompare: p2–4；crime: p4–5；mitigation: p5–6；confiscation: p6–8。

【虛構測試】被告於113年10月9日交付偽造收據，收取100萬元後轉交上游，取得1,000元報酬並於審理時繳交。組織罪非本案範圍。

### 網頁欄位與操作順序

|順序|動作|值|
|---|---|---|
|1|click|preset-typical-btn|
|2|input-defendant-name|測試被告甲|
|3|input-case-cause|加重詐欺等|
|4|input-judge-name|測試法官|
|5|input-clerk-name|測試書記官|
|6|val-prosecutor-indict|測試檢察官甲|
|7|val-prosecutor-trial|測試檢察官乙|
|8|input-defendant-name|測試被告丁|
|9|input-case-no|115年度測試字第4號|
|10|val-h1-sentence|處有期徒刑壹年拾月。|
|11|crime-forgery-210|True|
|12|crime-forgery-212|False|
|13|chk-forgery-absorb|True|
|14|chk-h-conf-table|True|
|15|conf-fpa48|True|
|16|conf-adj-fpa-lowcost|False|
|17|@coprincipal-style|detailed|
|18|chk-include-reason-one|True|
|19|chk-sent-no-fine|False|
|20|chk-mit-imag-merge-theory|True|
|21|val-sent-prosecutor-ask|有期徒刑3年以上刑度|
|22|rad-fact-standard|True|
|23|rad-evid-standard|True|
|24|val-fact-amend|【虛構測試】被告於113年10月9日交付偽造收據，收取100萬元後轉交上游，取得1,000元報酬並於審理時繳交。組織罪非本案範圍。|
|25|val-evid-amend|【虛構測試】被告於偵查及審理均自白，與被害人證述及交易、通訊、扣押等客觀資料核對相符；實際證據及卷頁由使用者另填。|
|26|val-sentencing-factors|測試教育、職業、家庭及經濟情狀|
|27|@fraud-ml-mit-mode|confess_paid_proceeds|
|28|val-mit-paid-amt|1,000元|
|29|@conf-proc-mode|paid_proceeds|
|30|val-conf-proc-seized|1,000元|
|31|chk-h-conf-paid|True|
|32|val-h-paid-amt|壹仟元|
|33|input-custom-law-compare|【Golden候選自填摘要】刑法第2條第1項：本案行為時詐欺金額100萬元，修正後詐欺犯罪危害防制條例第43條增訂100萬元門檻，第47條亦增加減刑要件；被告偵審自白並繳交所得，整體比較後適用行為時即修正前詐欺犯罪危害防制條例。|
|34|chk-include-schedule|True|
|35|val-schedule-text|編號1：虛構投資公司收據1張，附有偽造公司印文及署押；所在卷頁由使用者另填。|

### Structural / Strict候選規則

|規則|類型|輸出段|條件|
|---|---|---|---|
|G04-A01|order|text|主　文 → 事　實 → 理　由 → 認定犯罪事實所憑證據及理由 → 論罪科刑 → 沒收： → 據上論斷 → 附錄本案論罪科刑法條|
|G04-A02|numbering|crimeText|㈠起連續不跳號|
|G04-A03|numbering|confText|㈠起連續不跳號|
|G04-A04|contains|holdingText|處有期徒刑壹年拾月。|
|G04-A05|contains|crimeText|刑法第339條之4第1項第2款之三人以上共同詐欺取財罪|
|G04-A06|contains|crimeText|洗錢防制法第19條第1項後段之洗錢罪|
|G04-A07|contains|crimeText|刑法第28條|
|G04-A08|contains|crimeText|刑法第55條|
|G04-A09|notContains|holdingText|未遂|
|G04-A10|notContains|holdingText|幫助|
|G04-A11|notContains|crimeText|後段之參與犯罪組織罪|
|G04-A12|contains|appendixText|洗錢防制法第19條|
|G04-A13|contains|confText|刑法第38條之2第2項|
|G04-A14|contains|crimeText|刑法第216條、第210條之行使偽造私文書罪|
|G04-A15|contains|crimeText|高度行為所吸收|
|G04-A16|contains|confText|詐欺犯罪危害防制條例第48條第1項|
|G04-A17|contains|confText|1,000元|
|G04-A18|contains|mitText|1,000元|
|G04-A19|contains|holdingText|已繳交之犯罪所得新臺幣壹仟元|
|G04-A20|contains|confText|自動繳交上開犯罪所得|
|G04-A21|contains|mitText|符合修正前之詐欺犯罪危害防制條例第47條前段|
|G04-A22|order|crimeText|新舊法比較： → 核被告所為 → 論以共同正犯 → 高度行為所吸收 → 為想像競合犯 → 刑之減輕事由 → 爰審酌|
|G04-A23|contains|reasonFullText|二、認定犯罪事實|
|G04-A24|contains|reasonFullText|三、論罪科刑|
|G04-A25|contains|reasonFullText|四、沒收|
|G04-A26|contains|crimeText|100萬元門檻|
|G04-A27|contains|crimeText|適用行為時即修正前詐欺犯罪危害防制條例|

### Editorial Review

- 完整法條適用與法律結論須使用者核准；測試沒有查核現行法。
- 自填事實、證據、量刑個人情狀、附表及新舊法比較僅為去識別化候選摘要。
- 檢查編號、量刑用語及重複比較文字；段落不必逐字複製PDF。

### Coverage Gap

- 無日期／金額自動判斷新舊法功能；比較段落須人工填寫。
- 主文、所得減刑及沒收理由金額分別填寫，無自動一致性約束。
- PDF卷證表格僅能以純文字附表表示。

### 需要自行輸入

- 法院、當事人、辯護人、檢察官、法官、書記官及日期
- 個案犯罪事實、證據與卷頁、量刑情狀、附表
- 宣告刑及分別填寫的所得金額
- 新舊法比較全文

### 待裁定

- PDF存在「同年月00日」或「0月0日」占位日期，不採為Strict Expected。
- 部分PDF有「第第1項」重複字，不採為正確標準。

所有Strict文字與法律結論仍為PROPOSED_NOT_APPROVED；不因候選檢查成功自動轉為Golden PASS。

## G05｜累犯車手／未繳所得3,000元／新舊法比較

來源 `115,訴,696,20260930,1.pdf`；SHA-256 `1c78908c34e9321c735af5533fb2d94a71eb0698a8f291e0909b24a6107f36b9`。

定位：holding: p1 10–13；lawCompare: p2–4；crime: p4–5；recidivism: p5–6；mitigation: p6；confiscation: p7–8。

【虛構測試】被告於113年9月24日交付偽造收據，收取111萬元後轉交上游，報酬3,000元未扣案。前案有期徒刑於112年5月31日執行完畢，構成累犯。組織罪非本案範圍。

### 網頁欄位與操作順序

|順序|動作|值|
|---|---|---|
|1|click|preset-typical-btn|
|2|input-defendant-name|測試被告甲|
|3|input-case-cause|加重詐欺等|
|4|input-judge-name|測試法官|
|5|input-clerk-name|測試書記官|
|6|val-prosecutor-indict|測試檢察官甲|
|7|val-prosecutor-trial|測試檢察官乙|
|8|input-defendant-name|測試被告戊|
|9|input-case-no|115年度測試字第5號|
|10|val-h1-sentence|處有期徒刑貳年。|
|11|crime-forgery-210|True|
|12|crime-forgery-212|False|
|13|chk-forgery-absorb|True|
|14|chk-h-conf-table|True|
|15|conf-fpa48|True|
|16|conf-adj-fpa-lowcost|False|
|17|@coprincipal-style|detailed|
|18|chk-include-reason-one|True|
|19|chk-sent-no-fine|False|
|20|chk-mit-imag-merge-theory|False|
|21|val-sent-prosecutor-ask|有期徒刑3年以上刑度|
|22|rad-fact-standard|True|
|23|rad-evid-standard|True|
|24|val-fact-amend|【虛構測試】被告於113年9月24日交付偽造收據，收取111萬元後轉交上游，報酬3,000元未扣案。前案有期徒刑於112年5月31日執行完畢，構成累犯。組織罪非本案範圍。|
|25|val-evid-amend|【虛構測試】被告於偵查及審理均自白，與被害人證述及交易、通訊、扣押等客觀資料核對相符；實際證據及卷頁由使用者另填。|
|26|val-sentencing-factors|測試教育、職業、家庭及經濟情狀|
|27|@fraud-ml-mit-mode|confess_unpaid_proceeds|
|28|val-mit-unpaid-amt|3,000元|
|29|@conf-proc-mode|unseized_proceeds|
|30|val-conf-proc-unseized|3,000元|
|31|chk-h-conf-unseized|True|
|32|val-h-unseized-amt|參仟元|
|33|input-custom-law-compare|【Golden候選自填摘要】刑法第2條第1項：本案行為時詐欺金額111萬元，修正後詐欺犯罪危害防制條例第43條增訂100萬元門檻、第44條增訂第3款、第47條增加減刑要件；被告未繳交所得，無第47條減刑適用。整體比較後適用行為時即修正前詐欺犯罪危害防制條例。|
|34|chk-holding-recidivist|True|
|35|enh-recidivist|True|
|36|val-recid-detail|【虛構測試】被告前案有期徒刑於112年5月31日執行完畢，五年內再犯本案|
|37|@recid-enhance-opt|yes|
|38|chk-include-schedule|True|
|39|val-schedule-text|編號1：虛構投資公司收據1張，附有偽造公司印文及署押；所在卷頁由使用者另填。|

### Structural / Strict候選規則

|規則|類型|輸出段|條件|
|---|---|---|---|
|G05-A01|order|text|主　文 → 事　實 → 理　由 → 認定犯罪事實所憑證據及理由 → 論罪科刑 → 沒收： → 據上論斷 → 附錄本案論罪科刑法條|
|G05-A02|numbering|crimeText|㈠起連續不跳號|
|G05-A03|numbering|confText|㈠起連續不跳號|
|G05-A04|contains|holdingText|處有期徒刑貳年。|
|G05-A05|contains|crimeText|刑法第339條之4第1項第2款之三人以上共同詐欺取財罪|
|G05-A06|contains|crimeText|洗錢防制法第19條第1項後段之洗錢罪|
|G05-A07|contains|crimeText|刑法第28條|
|G05-A08|contains|crimeText|刑法第55條|
|G05-A09|notContains|holdingText|未遂|
|G05-A10|notContains|holdingText|幫助|
|G05-A11|notContains|crimeText|後段之參與犯罪組織罪|
|G05-A12|contains|appendixText|洗錢防制法第19條|
|G05-A13|contains|confText|刑法第38條之2第2項|
|G05-A14|contains|crimeText|刑法第216條、第210條之行使偽造私文書罪|
|G05-A15|contains|crimeText|高度行為所吸收|
|G05-A16|contains|confText|詐欺犯罪危害防制條例第48條第1項|
|G05-A17|contains|confText|3,000元|
|G05-A18|contains|mitText|3,000元|
|G05-A19|contains|holdingText|未扣案之犯罪所得新臺幣參仟元|
|G05-A20|contains|holdingText|追徵其價額|
|G05-A21|contains|mitText|而其並未繳交犯罪所得|
|G05-A22|notContains|mitText|爰依修正前詐欺犯罪危害防制條例第47條前段減輕其刑|
|G05-A23|contains|holdingText|，累犯，|
|G05-A24|contains|enhText|刑法第47條第1項|
|G05-A25|contains|enhText|加重其刑|
|G05-A26|order|crimeText|新舊法比較： → 核被告所為 → 論以共同正犯 → 高度行為所吸收 → 為想像競合犯 → 當屬刑法第47條第1項之累犯 → 刑之減輕事由 → 爰審酌|
|G05-A27|contains|reasonFullText|二、認定犯罪事實|
|G05-A28|contains|reasonFullText|三、論罪科刑|
|G05-A29|contains|reasonFullText|四、沒收|
|G05-A30|contains|crimeText|第44條增訂第3款|
|G05-A31|contains|crimeText|無第47條減刑適用|
|G05-A32|contains|crimeText|適用行為時即修正前詐欺犯罪危害防制條例|

### Editorial Review

- 完整法條適用與法律結論須使用者核准；測試沒有查核現行法。
- 自填事實、證據、量刑個人情狀、附表及新舊法比較僅為去識別化候選摘要。
- 檢查編號、量刑用語及重複比較文字；段落不必逐字複製PDF。

### Coverage Gap

- 無日期／金額自動判斷新舊法功能；比較段落須人工填寫。
- 主文、所得減刑及沒收理由金額分別填寫，無自動一致性約束。
- PDF卷證表格僅能以純文字附表表示。

### 需要自行輸入

- 法院、當事人、辯護人、檢察官、法官、書記官及日期
- 個案犯罪事實、證據與卷頁、量刑情狀、附表
- 宣告刑及分別填寫的所得金額
- 新舊法比較全文

### 待裁定

- PDF存在「同年月00日」或「0月0日」占位日期，不採為Strict Expected。
- 部分PDF有「第第1項」重複字，不採為正確標準。

所有Strict文字與法律結論仍為PROPOSED_NOT_APPROVED；不因候選檢查成功自動轉為Golden PASS。
