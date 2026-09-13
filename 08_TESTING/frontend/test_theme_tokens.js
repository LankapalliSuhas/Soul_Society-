// 08_TESTING/frontend/test_theme_tokens.js
import fs from 'fs';
import assert from 'assert';
import path from 'path';

const ccPath = path.resolve('05_FRONTEND/src/pages/CommandCenter.jsx');
const ccCode = fs.readFileSync(ccPath, 'utf-8');

assert(!ccCode.includes('bg-[#050505]'), "CommandCenter must not use dark background #050505");
assert(ccCode.includes('bg-[#FAFAFA]'), "CommandCenter must use light background #FAFAFA");
assert(ccCode.includes('text-[#E11D48]'), "CommandCenter must retain alert red accent color");

console.log("PASS: Theme tokens static assertions passed.");
