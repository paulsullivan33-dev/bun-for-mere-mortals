import ms from "ms";

const wait = ms("2 days");

console.log(`Two days is ${wait} milliseconds.`);
console.log(`Half of that is ${ms(wait / 2, { long: true })}.`);
