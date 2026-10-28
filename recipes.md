# Recipes

**Outcome of this chapter: four jobs
people actually reach for Bun to do,
each short, each one already proven
by the chapter that taught its
parts.**

## Run a tool once, without adopting it

Some packages are programs, not
libraries — you want to *run* one
once, not add it to a project.
`bunx` downloads the package and runs
its command in one step. The lab's
demonstration is deliberately silly
and completely real:

```text
$ bunx cowsay "Bun says hello"
Resolving dependencies
Resolved, downloaded and extracted [124]
Saved lockfile
 ________________
< Bun says hello >
 ----------------
        \   ^__^
         \  (oo)\_______
            (__)\\       )\/\
                ||----w |
                ||     ||
```

The serious version of the same move
is running a formatter, a scaffolding
tool or a one-off converter this way
(chapter 2). Because `bunx` fetches
code from the registry and executes
it, treat the package name like a
program download: check the spelling,
because lookalike names are a known
trap in every registry.

## Try Bun on an existing Node.js project

No migration meeting required. In a
*copy* of the project:

```bash
bun install
bun run <the script you always run>
bun test
```

`bun install` reads the existing
`package.json`, installs from the
same registry into the same
`node_modules` layout, and writes a
`bun.lock` beside any lockfile already
there (the old one is untouched; you
can go back). Then run the project's
own scripts and tests — chapters 5
and 7's mechanics, unchanged. If
something fails, it has told you
something specific about a Node.js
corner your project leans on
(chapter 13), and the experiment cost
minutes. The lab's chapters ran this
pattern in miniature: every program
after chapter 4 is ordinary
JavaScript or TypeScript of the kind
a Node.js project already contains.

## Make the typecheck a habit, not an event

Chapter 5's project wired its checker
in as a script. The recipe worth
stealing is the placement: run it at
the moment code changes hands —
before committing, and in any
automated build — rather than when
something looks odd:

```bash
bun run typecheck && bun test
```

(chained with `&&`, the tests only
run if the check passed). The two
commands together take well under a
second on the lab's project and
answer the two questions chapter 4
separated: *are the types true*, and
*does it behave*.

## Hand someone a program with nothing to install

For a small tool whose reader has no
JavaScript runtime, chapter 8's
compiled executable is the whole
recipe:

```bash
bun build ./tool.ts --compile --outfile ./tool
```

followed by chapter 8's honesty: the
file will be around a hundred
megabytes because the runtime is
inside it. Fine for one tool, wrong
for a toolbox — and if the reader has
Bun or Node already, `bun build`'s
plain bundle (kilobytes, chapter 8)
is the better parcel.
