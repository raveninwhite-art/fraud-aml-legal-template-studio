const fs=require('fs'), path=require('path'), crypto=require('crypto');
const {parse}=require('parse5');
const ROOT=path.resolve(__dirname,'..');
const PLACEHOLDER='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function images(html){
  const found=[]; const doc=parse(html,{sourceCodeLocationInfo:true});
  function walk(n){
    if(n.tagName==='img'){
      const a=n.attrs.find(a=>a.name==='src');
      if(a && /^data:image\/[\w.+-]+;base64,/i.test(a.value) && a.value.length>10000){
        const loc=n.sourceCodeLocation.attrs.src, raw=html.slice(loc.startOffset,loc.endOffset);
        const m=/^src\s*=\s*(["'])([\s\S]*)\1$/i.exec(raw);
        if(!m) throw Error('Unsupported src syntax; refusing unsafe edit');
        const prefix=raw.indexOf(m[1])+1;
        found.push({start:loc.startOffset+prefix,end:loc.endOffset-1,line:loc.startLine,original:a.value,srcHash:hash(a.value)});
      }
    }
    for(const c of n.childNodes||[])walk(c); if(n.content)walk(n.content);
  }walk(doc);return found;
}
function strip(input,output=path.join(ROOT,'source/index.qa-lite.html')){
  const bytes=fs.readFileSync(input), html=bytes.toString('utf8'), found=images(html);
  const inlineScripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
  for(const x of found) if(inlineScripts.some(s=>s.includes(x.original))) throw Error('Image src also used in script; manual resource audit required');
  let lite=html;for(const x of [...found].reverse())lite=lite.slice(0,x.start)+PLACEHOLDER+lite.slice(x.end);
  fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,lite);
  const manifest={schemaVersion:1,programVersionId:'html-'+hash(bytes).slice(0,12),sourceName:path.basename(input),sourcePath:path.resolve(input),sourceBytes:bytes.length,sourceSha256:hash(bytes),expectedInitialSha256:'2d990428e4ce6a60576189745e5c5b2d3440151142ea0eebc90bcb35eb85729c',liteName:path.basename(output),liteBytes:Buffer.byteLength(lite),liteSha256:hash(lite),testedAt:new Date().toISOString(),timezone:'Asia/Taipei',frameworkVersion:'1.0.0',nodeVersion:process.version,playwrightVersion:require('./playwright-runtime').version,images:found.map(({start,end,line,srcHash,original})=>({start,end,line,srcHash,originalCharacters:original.length})),placeholder:PLACEHOLDER};
  fs.writeFileSync(path.join(path.dirname(output),'source-manifest.json'),JSON.stringify(manifest,null,2));return manifest;
}
if(require.main===module){const p=process.argv[2]||process.env.QA_SOURCE;if(!p)throw Error('Usage: npm run prepare-source -- "C:\\path\\index.html"');console.log(strip(p));}
module.exports={ROOT,hash,images,strip,PLACEHOLDER};
