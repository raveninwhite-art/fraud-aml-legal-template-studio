const fs=require('fs'),path=require('path');const {ROOT}=require('./strip-images');
const {gate}=require('./report').generate();console.log(JSON.stringify(gate,null,2));process.exitCode=gate.status==='ELIGIBLE_FOR_RELEASE'?0:2;
