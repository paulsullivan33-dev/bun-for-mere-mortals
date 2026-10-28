# The Moving Parts

**Outcome of this chapter: given any
Bun behaviour that puzzles you later,
you can name the part responsible — a
subcommand, `package.json`, the
lockfile, or the cache.**

Bun is one file, but it is not one
undifferentiated lump. It has parts,
they hold different things, and most
confusion about Bun is really confusion
about which part you are talking to.

## The subcommands: one binary, many verbs

Everything Bun does is a **subcommand** —
a verb after the word `bun`. The lab
captured `bun --help`, and its first
line is the whole design in one
sentence:

```text
Bun is a fast JavaScript runtime, package manager, bundler, and test runner. (1.4.4+38afee6c8)
```

The verbs group by job:

- **Running code:** `bun run file.ts`
  executes a file; `bun run dev` runs a
  script named in `package.json`;
  `bun repl` opens an interactive
  session where you type JavaScript and
  see answers (like a calculator for
  code); `bunx some-tool` downloads a
  package and runs the command it
  provides, without installing it into
  your project.
- **Managing packages:** `bun install`
  installs everything a project lists;
  `bun add` and `bun remove` change that
  list; `bun update` refreshes it.
- **Building:** `bun build` bundles
  files into fewer, shippable files.
- **Testing:** `bun test` finds and
  runs test files.
- **Checking and polishing:** `bun
  check` verifies TypeScript types;
  `bun fmt` formats code.
- **Starting things:** `bun init`
  creates a new project skeleton;
  `bun create` starts from a public
  template; `bun upgrade` replaces Bun
  itself with the newest version.

That list is the lab's Bun 1.4.4
speaking; the full help text is kept in
`bun-lab/transcripts/t00-version-and-help.txt`.
When a later chapter uses a verb you
don't recognise, it belongs to one of
these groups.

## package.json: the project's manifest

Every JavaScript project, Bun or Node,
keeps a file named **`package.json`**
at its top. It is the project's
manifest: its name, the **scripts** it
can be asked to run, and the list of
packages it depends on. That list is
the important part for the package
manager: when `bun install` runs, it
reads this file and makes the machine
match it. Chapter 5 shows the one
`bun init` writes, line by line.

## node_modules: the shelf the packages sit on

Installed packages are placed in a
folder named **`node_modules`** inside
the project. Your code asks for a
package by name — `import ms from
"ms"` — and the runtime looks it up on
that shelf. Bun keeps this arrangement
from the npm world deliberately: a
project laid out for Node.js works
under Bun without rearrangement, shelf
and all. The folder is disposable: it
can always be rebuilt from
`package.json` plus the lockfile,
which is why projects do not save it
into version control (the `.gitignore`
`bun init` writes excludes it, as
chapter 5 notes).

## bun.lock: the receipt

`package.json` says what a project
wants, in ranges ("version 2.1.3 or a
compatible later one"). The
**lockfile** — Bun's is named
**`bun.lock`** — records what was
*actually* installed: exact versions of
every package, including the packages
that packages themselves needed. It is
a plain-text file you can read and
diff, and it is the receipt that makes
an install reproducible: chapter 6
deletes the whole shelf and rebuilds
it from the receipt in a fifth of a
second. Save the lockfile in version
control; it is the difference between
"install the same thing" and "install
something like it".

## The global cache: why the second install is fast

Bun keeps one **cache** per user (in
`~/.bun/install/cache`) holding every
package it has ever downloaded. The
first install of a package pays the
download; later installs — even in
other projects — link from the cache
instead of downloading again. That is
most of the story behind Bun's install
speeds, and chapter 6 states it
plainly with the lab's timings: the
first `ms` install took 2.4 seconds;
a cold rebuild of the whole project,
cache warm, took 219 milliseconds.

## tsconfig.json: the checker's instructions

TypeScript's own configuration file,
**`tsconfig.json`**, tells the type
checker (and your editor) how strict to
be and which libraries of names exist.
Bun's runtime ignores most of it — it
does not check types — but `bun check`
obeys it, and `bun init` writes a
sensible one. One line matters for
chapter 4: `"types": ["bun"]` is how
the checker learns the names Bun adds
to the language, like `Bun` itself.

## Which part holds what

| Question | The part that answers |
| --- | --- |
| What does this project depend on? | `package.json` |
| What exactly got installed last time? | `bun.lock` |
| Where is the code of a package? | `node_modules` |
| Why was the second install so fast? | the cache in `~/.bun` |
| Who runs this file? | `bun run`, the runtime |
| Who says the types are wrong? | `bun check`, never `bun run` |
