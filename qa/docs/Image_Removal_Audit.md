# Image Removal Audit

- 原始檔：`index(1).html`，1,086,745 bytes。
- 原始SHA-256：`2d990428e4ce6a60576189745e5c5b2d3440151142ea0eebc90bcb35eb85729c`（與使用者預期一致）。
- 輕量檔：160,601 bytes；SHA-256：`3b65e5537975b1f49ec8fc16e400c630685a95bdad7d997cbf5a24b3f0ff7734`。
- 修改：第85、1250行的img.src；兩者同一資料雜湊 `d465b3514aba52ff1ebfe51a5f93d17a3cf72e66ae371bcd6022a65e9b1c47d5`，各463,150字元。
- 僅替換src值為有效1×1透明GIF；保留img、其他屬性、周邊HTML及所有JavaScript。原始data標籤為image/png但內容起首為JPEG特徵；本輪不修正這項標記。
- source-manifest之start/end是parse5提供的UTF-16字元offset，並非UTF-8 byte offset。
- 靜態驗證：完整重建預期差異後逐字串比對；全部inline script完全一致；DOM（只將image src正規化）一致；所有欄位、ID、預設屬性、事件字串一致；其他base64無差異。
- 原始JS不讀取兩個img.src；圖片不參與buildSectionsData或案件條件。實際去圖前後使用相同測試CSS。

## 原版／去圖實跑（非推測）

|代表case|結果|DOM Snapshot SHA-256|
|---|---|---|
|original-default|PASS|`3180123844bc6ee78dc892218a087923ada3fe056ae0efdeef2ccf782aab9485`|
|original-attempt|PASS|`cfb2056ebfc4dcd229c039648dd4bf0dd752202234226786faeefaad886b4bc7`|
|original-accessory|PASS|`eba97ee2ef7daf22059d435cdb3a2486ef2f3d3974ad9234261c25612b7af221`|

原版與副本每一case均比對實際DOM產文、14個回傳欄位及全部操作狀態，完全一致。瀏覽器：153.0.8010.0。三案不等同所有可能組合的等價形式證明；配合src限定差異及JS/DOM完整一致驗證，作為本輪可靠測試副本。原版留供L0-01–04再次驗證。

本機執行 `node scripts/audit-source.js` 或完整npm test。新版先prepare-source再verify-source。原始來源不在可移交ZIP內，請使用者自行指定。
