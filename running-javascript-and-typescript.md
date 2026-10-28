# Running JavaScript and TypeScript

**Outcome of this chapter: you can run
a `.js` file and a `.ts` file with one
command each — and you can state
exactly what Bun does with the types
in the `.ts` file, because the lab
proved it with a file whose types are
wrong.**

## JavaScript first

Here is the whole of the lab's
`hello.js` (`bun-lab/hello.js`): it
builds a sentence and adds four
numbers.

```js
const name = "reader";
const sum = [1, 2, 3, 4].reduce((total, n) => total + n, 0);

console.log(`Hello, ${name}!`);
console.log(`The numbers 1 to 4 add up to ${sum}.`);
```

Running it names the file after
`bun run`:

```text
$ bun run hello.js
Hello, reader!
The numbers 1 to 4 add up to 10.
```

No project, no configuration, no
ceremony. If you have used Node.js,
the same file runs there with
`node hello.js` and prints the same
two lines — plain JavaScript is plain
JavaScript, and chapter 10 will use
exactly this file to compare the two
runtimes fairly.

## TypeScript, with no build step

**TypeScript** is JavaScript plus
**type annotations** — notes in the
code that declare what shape the data
has: this value is text, that one is a
number, this object has a `name` that
is text and a `times` that is a
number. The annotations exist to be
*checked*: a checker can read them and
warn you before the program runs that
you have handed a number to code
expecting text.

Traditionally, running TypeScript
meant a separate translation step
first: a compiler read the `.ts` file,
checked it, erased the annotations,
and wrote out a `.js` file for the
runtime. Bun folds the erasing into
the runtime. The lab's `greet.ts`
(`bun-lab/greet.ts`) declares the
shape, then uses it:

```ts
interface Greeter {
  name: string;
  times: number;
}

function greet(greeter: Greeter): string {
  return `Hello, ${greeter.name}! That is greeting number ${greeter.times}.`;
}

const ada: Greeter = { name: "Ada", times: 1 };
console.log(greet(ada));
```

```text
$ bun run greet.ts
Hello, Ada! That is greeting number 1.
```

No compiler was run, no `.js` file
appeared next to it. Inside Bun, the
file was translated as it loaded — a
process called **transpiling** — and
the translation cared about one thing:
producing JavaScript with the
annotations removed.

## The experiment that matters: a type error runs

What the translation does *not* do is
check. The lab wrote a second file,
`type-error.ts`, identical in shape
except for one value: where the
`Greeter` shape promises `name` is
text, the file hands over the number
42. Any type checker calls that an
error. Here is what Bun's runtime
said:

```text
$ bun run type-error.ts
Hello, 42! That is greeting number 1.
```

Exit code 0 — success. The program
ran, and produced a politely wrong
answer: it greeted a number. Nothing
complained, because nothing checked.
**Running TypeScript under Bun proves
your program executes. It says
nothing about whether your types are
true.**

This is not a Bun defect to be
ashamed of; it is the design, shared
with several other fast TypeScript
runners, and it is a reasonable trade
*if you know you are making it*. The
dangerous version is the assumption —
"it ran, so the types passed" — and
this chapter exists to retire it.

## The checker: bun check

Checking is a separate command, run
when you ask for it:

```text
$ bun check type-error.ts
type-error.ts(12,27): error TS2322: Type 'number' is not assignable to type 'string'.
type-error.ts(13,1): error TS2584: Cannot find name 'console'. Do you need to change your target library? Try changing the 'lib' compiler option to include 'dom'.
note: Bun's type definitions (console, fetch, Bun, bun:test) are not installed. Run: bun add -d @types/bun
Found 2 errors in 1 file, checked 1 file [101.51ms]
```

(Exit code 1 — a failed check fails,
as it should.) Two findings, of two
different kinds:

- **The real error**, line 12:
  `Type 'number' is not assignable to
  type 'string'` — the deliberate
  mistake, caught precisely.
- **A missing-names complaint**, line
  13: the checker does not yet know
  the word `console`, because the file
  was checked in a bare folder with no
  project setup. The output names its
  own fix: install Bun's type
  definitions, `@types/bun`, as a
  **dev dependency** (a package the
  project needs while developing, not
  while running). `bun init` does this
  for you in a real project — chapter
  5's project checks cleanly — but a
  loose file gets this note instead.
  Chapter 14 returns to it.

Under the hood, `bun check` is the
TypeScript compiler doing the
checking — Bun 1.4 ships it as part of
the one binary, which is why the
error codes (`TS2322`) are
TypeScript's own. You can also ask
for checking on the way to running:
the `--check` flag on other commands
checks first and refuses to run if
the types fail. The lab used the
standalone command, and chapter 5
meets it again as a project script.

The habit this chapter recommends is
simple: **run freely while exploring,
check before you share.** `bun run`
for the tight loop, `bun check` (or
your editor, which checks as you
type, using the same rules) before
the code goes anywhere its
wrong answers would matter.
