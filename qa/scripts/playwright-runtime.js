// Resolve Playwright from @playwright/test so hoisted, nested, and parent
// node_modules layouts all use the exact version selected by the host project.
const {createRequire}=require('module');const path=require('path');
const fromTest=createRequire(require.resolve('@playwright/test/package.json'));
const packagePath=fromTest.resolve('playwright/package.json');
module.exports={...fromTest('playwright'),packagePath,cliPath:path.join(path.dirname(packagePath),'cli.js'),version:fromTest('playwright/package.json').version};
