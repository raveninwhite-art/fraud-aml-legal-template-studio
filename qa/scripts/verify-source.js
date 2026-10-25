const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {parse}=require('parse5');const {ROOT,hash,images,PLACEHOLDER}=require('./strip-images');
function canonical(html){
  function f(n){return {nodeName:n.nodeName,tagName:n.tagName,attrs:(n.attrs||[]).map(a=>({name:a.name,value:n.tagName==='img'&&a.name==='src'&&/^data:image\//.test(a.value)?'IMAGE_SRC':a.value})),value:n.value,data:n.data,children:(n.childNodes||[]).map(f),content:n.content?f(n.content):undefined};}return f(parse(html));
}
function verify(input,output=path.join(ROOT,'source/index.qa-lite.html')){
  const a=fs.readFileSync(input,'utf8'),b=fs.readFileSync(output,'utf8');let expected=a;
  const found=images(a);for(const x of [...found].reverse())expected=expected.slice(0,x.start)+PLACEHOLDER+expected.slice(x.end);
  assert.equal(b,expected,'Only approved img src byte ranges may differ');assert.deepEqual(canonical(a),canonical(b),'DOM changed');
  const scripts=s=>[...s.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(x=>x[1]);assert.deepEqual(scripts(a),scripts(b),'Inline JS changed');
  const m=JSON.parse(fs.readFileSync(path.join(path.dirname(output),'source-manifest.json')));assert.equal(hash(a),m.sourceSha256);assert.equal(hash(b),m.liteSha256);
  return {verified:true,imageCount:found.length,sourceSha256:hash(a),liteSha256:hash(b),checks:['exact byte-range replacement','all inline scripts identical','full DOM equal except image src','all input attributes/defaults/events unchanged','all other base64 unchanged']};
}
if(require.main===module){const m=JSON.parse(fs.readFileSync(path.join(ROOT,'source/source-manifest.json')));console.log(verify(process.argv[2]||process.env.QA_SOURCE||m.sourcePath));}
module.exports={verify,canonical};
