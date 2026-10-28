# Starting a Project

**Outcome of this chapter: you have a
project Bun created for you, you know
what each file it wrote is for, and
you have run its typecheck script —
watched it fail on a package with no
types, and fixed it the way the error
message itself suggested.**

A loose file is fine for experiments.
A **project** — a folder with a name,
a list of dependencies, and scripts —
is what you want the moment code will
live longer than an afternoon. Bun's
word for starting one is `init`.

## bun init

Run in an empty folder, `bun init`
asks a few questions (name, entry
point) and writes a skeleton.
`bun init -y` accepts the defaults
without asking, which is what the lab
did in `bun-lab/demo-app`:

```text
$ bun init -y
 + .gitignore
 + index.ts
 + tsconfig.json (for bun check and editor autocomplete)
 + README.md

To get started, run:

    bun run index.ts

To type check, run:

    bun check
```

Note what happened next in the same
transcript: `init` finished by
running an install on its own, fetching
the project's starting dependencies
from the npm registry — `@types/bun`
(the type definitions chapter 4 was
missing) and the TypeScript compiler
— and saving the lockfile. Six
packages, about twenty seconds on the
lab's connection. A fresh project is
born with its checker already fed.

The files, one by one:

- **`index.ts`** — the entry point, a
  starter program containing one line,
  `console.log("Hello via Bun!");`.
  The lab ran it as the smoke test:

  ```text
  $ bun run index.ts
  Hello via Bun!
  ```

- **`package.json`** — the manifest
  from chapter 2. The lab's reads:

  ```json
  {
    "name": "demo-app",
    "module": "index.ts",
    "type": "module",
    "private": true,
    "scripts": {
      "typecheck": "bun check"
    },
    "devDependencies": {
      "@types/bun": "latest"
    },
    "peerDependencies": {
      "typescript": "^7"
    }
  }
  ```

  Two lines earn a comment.
  `"type": "module"` says the
  project's files use the modern
  `import` style of sharing code
  between files (as opposed to the
  older `require` style; Bun reads
  both, and older projects will say
  so here). And `scripts` names a
  command the project can be asked to
  run — next section's subject.
- **`tsconfig.json`** — the checker's
  instructions from chapter 2,
  including `"types": ["bun"]`, the
  line that teaches the checker Bun's
  own names.
- **`bun.lock`** — the lockfile, the
  receipt described in chapter 2.
- **`.gitignore`** — a ready-made list
  of things version control should not
  keep: `node_modules` first among
  them, plus build output and log
  files.
- **`README.md`** — a stub with the
  project's name, for you to replace.

## Scripts: commands the project remembers

A **script** in `package.json` is a
named command stored with the
project, so nobody has to remember or
retype it. `bun init` writes one:

```text
$ bun run typecheck
$ bun check
```

`bun run typecheck` finds the script,
and Bun echoes the command it stands
for (`$ bun check`) before running
it. Any script name works the same
way — `bun run dev`, `bun run build`
in bigger projects — and the scripts
are ordinary shell commands, so a
project's scripts work under npm too.

## The typecheck fails — honestly, and instructively

When the lab ran that typecheck —
after chapter 6 added the `ms`
package and a small program using
it — it failed:

```text
$ bun run typecheck
$ bun check
wait.ts(1,16): error TS7016: Could not find a declaration file for module 'ms'. 'bun-lab/demo-app/node_modules/ms/index.js' implicitly has an 'any' type.
  Try `bun add -d @types/ms` if it exists or add a new declaration (.d.ts) file containing `declare module 'ms';
Found 1 error in 1 file, checked 5 files [480.75ms]
error: script "typecheck" exited with code 1
```

Read it slowly, because this error is
the TypeScript world in miniature.
The `ms` package is plain JavaScript
with no type annotations of its own.
The checker, asked to verify a file
that imports it, cannot check what it
cannot see described — so it refuses,
and its refusal is precise: the
missing thing is a **declaration
file**, a separate file that describes
a JavaScript package's shapes in
TypeScript's language. For popular
packages, the community publishes
those descriptions under `@types/`
names on the same registry.

And the error message names the fix.
The lab obeyed it:

```text
$ bun add -d @types/ms
installed @types/ms@2.1.0

$ bun run typecheck
$ bun check
✓ No type errors in 5 files [231.81ms]
```

(The `-d` marks it a dev dependency:
needed to *check* the code, not to
run it.) The full exchange is
transcript
`bun-lab/transcripts/t10-package-script.txt`.

Two lessons to keep. First, **running
and checking are different promises**,
again: `wait.ts` ran perfectly in
chapter 6 while its types were
unverifiable. Second, in this
ecosystem the fix for a missing
description is usually a package
named `@types/<the package>` — and
the checker will usually tell you so
itself, if you read past the error
code to the sentence after it.
