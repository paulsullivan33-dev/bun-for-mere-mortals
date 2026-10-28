# What Bun Is

**Outcome of this chapter: you can say
what the four jobs of a JavaScript
toolchain are, which single program Bun
replaces them with, and the two things
Bun is not.**

JavaScript was born in the web browser,
where the browser itself runs the code.
Once people started running JavaScript
on their own computers — for servers,
scripts and command-line tools — the
code needed help. A program that runs
JavaScript outside a browser is called a
**runtime**. Node.js, from 2009, is the
runtime almost everyone uses.

Around the runtime, a toolchain grew:

- The **runtime** runs your code
  (Node.js).
- The **package manager** downloads the
  libraries your code uses and keeps
  track of their versions (npm, or its
  rivals yarn and pnpm).
- The **bundler** takes your many files,
  plus the libraries, and packs them
  into the few files you actually ship
  (esbuild, webpack and friends).
- The **test runner** runs your test
  files and reports which passed
  (Jest, Vitest, Node's own).
- And if you write **TypeScript** —
  JavaScript with type annotations that
  catch mistakes early — something must
  first translate it into plain
  JavaScript, because runtimes
  historically could not run it as
  written.

**Bun is one program that does all of
those jobs.** It is a single executable
file, written mostly in a language
called Zig, and inside it sits a
JavaScript **engine** — the part that
actually executes code — called
**JavaScriptCore**. That engine is the
one Apple builds for the Safari browser.
Node.js uses a different engine,
Google's **V8** (the Chrome engine).
Same language, different machinery
underneath, which is part of why the two
behave slightly differently in corners
this guide will point at.

## A first taste

If Bun is installed (chapter 3), this is
the whole ceremony for running a
TypeScript file — no translation step,
no configuration:

```bash
bun run greet.ts
```

The lab's `greet.ts` declares a shape
for its data with TypeScript types,
then greets:

```text
Hello, Ada! That is greeting number 1.
```

That output is real, from the lab's
transcript `bun-lab/transcripts/t01-run-js-and-ts.txt`.
Chapter 4 takes it apart — including
the file next to it whose types are
*wrong*, and which runs anyway.

## Why anyone would switch

Three honest reasons account for most
of it:

- **Fewer moving parts.** One download
  instead of a runtime plus a package
  manager plus a bundler plus a test
  runner, each with its own versioning
  and its own opinions. For a small
  project or a learner, the crowd
  thins to one program whose help text
  lists every job (chapter 2).
- **Startup speed.** Bun begins running
  your code noticeably sooner than
  Node.js begins running the same code.
  For scripts and command-line tools —
  programs that start, work briefly and
  exit — that difference is the whole
  experience. Chapter 10 measures it
  rather than asserting it.
- **TypeScript without the step.** Bun
  reads `.ts` files directly. The
  translation still happens, inside
  Bun, at the moment the file loads —
  but you never run a separate tool,
  and chapter 4 shows exactly what that
  translation does and does not do.

## Who it is for

The learner who wants to write
JavaScript or TypeScript without first
assembling a toolchain. The working
programmer with a drawer full of small
scripts who is tired of each one
starting slowly. The Node.js user whose
project spends its life installing
packages and running tests — the two
jobs where Bun's speed is easiest to
feel — and who can adopt Bun for those
jobs alone, keeping everything else.
Bun reads the same `package.json` files
and installs from the same npm registry
as npm, so trying it on an existing
project is a small experiment, not a
migration (chapter 11).

## What it is not

Bun is **not a type checker**. Running
a TypeScript file removes the type
annotations; it does not verify them.
The lab proved this with a file whose
types were deliberately wrong: Bun ran
it and printed `Hello, 42!` where a
person's name belonged (chapter 4). A
separate command, `bun check`, does
verify types — the same chapter shows
it catching that exact error — but it
runs only when you ask it to.

Bun is **not a perfect copy of
Node.js**. It aims to run Node.js
programs, and implements the great bulk
of Node's standard library and the npm
ecosystem's habits, but the aim is not
the achievement: some corners are
missing or behave differently, and
chapter 13 names the shape of the gaps
honestly. A program that depends on an
obscure corner may need Node.js still,
and finding out is a five-minute test,
not an act of faith.

And Bun is **not magic about speed in
general**. A fast start and fast
installs are measured facts (chapter
10). Whether *your* long-running
server answers requests faster under
Bun than under Node.js depends on the
workload, and this guide declines to
guess: the neighbours chapter (12)
explains what each engine is good at,
and the honest advice is to measure
your own program.
