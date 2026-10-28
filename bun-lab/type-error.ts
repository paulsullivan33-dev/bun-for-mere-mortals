// This file has a deliberate type error: a number is handed
// over where the Greeter shape promises a string.
interface Greeter {
  name: string;
  times: number;
}

function greet(greeter: Greeter): string {
  return `Hello, ${greeter.name}! That is greeting number ${greeter.times}.`;
}

const broken: Greeter = { name: 42, times: 1 };
console.log(greet(broken));
