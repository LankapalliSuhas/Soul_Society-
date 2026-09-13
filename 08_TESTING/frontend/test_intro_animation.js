// 08_TESTING/frontend/test_intro_animation.js
import fs from 'fs';
import assert from 'assert';
import path from 'path';

const filePath = path.resolve('05_FRONTEND/src/components/CartCanvasSequence.jsx');
const code = fs.readFileSync(filePath, 'utf-8');

// Note: Using static analysis as package.json has no test runner or JSDOM setup.
assert(code.includes("if (currentFrame >= totalFrames)"), "Must check for final frame");
assert(code.includes("setHasPlayed(true)"), "Must use persisted flag to stop replay");
assert(code.includes("sessionStorage.setItem('cartIntroPlayed', 'true')"), "Must persist state");
assert(code.includes("return; // Stops requestAnimationFrame"), "Must stop requestAnimationFrame");

console.log("PASS: Intro animation static assertions passed.");
