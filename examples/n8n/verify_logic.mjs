import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const wf=JSON.parse(fs.readFileSync(new URL('./VYRA_Offline_Validation_Demo.workflow.json',import.meta.url),'utf8'));
assert.equal(wf.active,false);
assert.equal(wf.nodes.length,5);
assert.equal(wf.nodes[0].type,'n8n-nodes-base.manualTrigger');
assert.equal(Object.keys(wf.connections).length,4);
for(let i=0;i<wf.nodes.length-1;i++)
  assert.equal(wf.connections[wf.nodes[i].name].main[0][0].node,wf.nodes[i+1].name);
assert.ok(wf.nodes.every(n=>!('credentials' in n)));
assert.ok(wf.nodes.every(n=>n.type==='n8n-nodes-base.manualTrigger'||n.type==='n8n-nodes-base.code'));
let items=[{json:{}}];
for(const n of wf.nodes.slice(1)){
  const $input={all:()=>items,first:()=>items[0]};
  items=vm.runInNewContext('(function(){'+n.parameters.jsCode+'})()',{$input,Set,Array,RegExp,String,Error,Number,Object,JSON},{timeout:5000});
  assert.ok(Array.isArray(items)&&items.every(x=>x.json&&typeof x.json==='object'));
  console.log(n.name+': '+items.length+' output item(s)');
}
assert.equal(items[0].json.qa,'FIXTURE_ASSERTIONS_PASSED');
assert.equal(items[0].json.records,5);
assert.equal(items[0].json.accepted,3);
assert.equal(items[0].json.rejected,2);
console.log('VYRA synthetic workflow logic PASS; n8n runtime NOT tested.');
