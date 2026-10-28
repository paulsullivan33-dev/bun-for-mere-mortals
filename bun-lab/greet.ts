interface Greeter {
  name: string;
  times: number;
}

function greet(greeter: Greeter): string {
  return `Hello, ${greeter.name}! That is greeting number ${greeter.times}.`;
}

const ada: Greeter = { name: "Ada", times: 1 };
console.log(greet(ada));
