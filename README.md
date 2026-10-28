# Bun for Mere Mortals

A JavaScript program normally needs a
small crowd of tools before it can do
anything. One program **runs** the code
(the runtime). Another **installs** the
libraries it uses (the package manager).
A third **bundles** the files into one
for shipping. A fourth **runs the
tests**. Each is installed separately,
configured separately, and versioned
separately.

**Bun** is all four jobs done by one
program: a single binary file you
download once. It runs JavaScript and
TypeScript files directly — no build
step first — installs packages from the
same **npm registry** the rest of the
JavaScript world uses, bundles code for
shipping, runs tests, and starts fast
enough that the startup itself is one of
its selling points.

This guide explains what those four jobs
are and how Bun does each of them, with
everything run for real in a small lab:
a TypeScript file executed with no
preparation, a real package installed
from the registry, a test suite with one
test deliberately broken and then fixed,
a bundle that plain Node.js then runs
unchanged, a tiny web server answering
real requests, and a speed comparison
against Node.js measured with a proper
benchmarking tool — including the
caveats that make the numbers honest.

Two findings from the lab are worth
knowing before you start, because they
surprise most people. First, Bun runs
TypeScript by **removing the type
annotations without checking them**: a
file with a genuine type error runs
happily and prints a wrong-looking
answer. Checking types is a separate
command (`bun check`), and chapter 4
shows both halves of that story. Second,
the speed gap is real but easy to
oversell: chapter 10 measures it on the
lab machine, says exactly how, and
explains why the absolute numbers from a
small shared sandbox are not the numbers
you will see on your own desk.

The lab behind this guide ran the real
thing: **Bun 1.4.4**, downloaded as the
official release zip from the project's
GitHub releases, on a small Linux
machine (Ubuntu 24.04, two processors,
7.7 GB of memory). Node.js 24.22.1 was
present for the comparisons. Every
command output quoted in the chapters is
copied from the lab's transcripts, which
live in `bun-lab/transcripts/`; the only
editing they received was shortening the
lab's absolute folder paths to
`bun-lab/` so they read the same on any
machine. What the lab could not do — the
Windows and macOS installers, the
interactive terminal tools — is taught
from the documentation and labelled as
such wherever it appears. `criteria.md`
keeps the full ledger of what was run
and what was only read.

## What this guide covers

- [**What Bun is**](what-bun-is.md) —
  the four jobs, the one binary, the
  engine inside, and what Bun is not
- [**The moving parts**](the-moving-parts.md) —
  the subcommands, `package.json`,
  `node_modules`, the lockfile and the
  cache, and which part holds what
- [**Installing Bun**](installing-bun.md) —
  the official installer, the release
  zip the lab used, and the version
  check that proves the install
- [**Running JavaScript and
  TypeScript**](running-javascript-and-typescript.md) —
  `bun run` on both languages, no build
  step, and the type error that runs
  anyway — plus the checker that
  catches it
- [**Starting a project**](starting-a-project.md) —
  `bun init` and the files it writes,
  scripts in `package.json`, and a
  typecheck that fails and is fixed
- [**Packages**](packages.md) —
  adding a real package from the npm
  registry, what the lockfile records,
  and a cold reinstall timed
- [**Testing**](testing.md) — the
  built-in test runner, a failing test
  shown in full, and the fix that turns
  the run green
- [**Bundling and
  building**](bundling-and-building.md) —
  `bun build` down to one file, the
  bundle running under plain Node.js,
  and a standalone executable — with
  its size stated honestly
- [**A small web server**](a-small-web-server.md) —
  `Bun.serve` answering real requests:
  a text page, a JSON answer, and a 404
- [**Speed, measured
  honestly**](speed-measured-honestly.md) —
  Bun against Node.js under a real
  benchmarking tool, the method stated,
  and the caveats that matter
- [**Recipes**](recipes.md) — run a
  one-off tool without installing it,
  move an existing npm project over,
  share a script as one executable
- [**The neighbours**](the-neighbours.md) —
  Node.js, Deno, npm and its cousins,
  esbuild, Jest and Vitest: what each
  still does that Bun doesn't, and vice
  versa
- [**Limits**](limits.md) — types are
  not checked at run time, Node.js
  compatibility is high but not total,
  and the other edges, stated plainly
- [**Troubleshooting**](troubleshooting.md) —
  the traps this guide's lab fell into
  so you don't have to: missing types,
  the checker complaining about
  `console`, and a script that is not
  found
- [**Glossary**](glossary.md) — the
  terms, collected in one place

## What it doesn't cover

Bun as a production platform at
organisational scale — deployment
pipelines, container images, monitoring
a Bun service for a company — is pointed
at, not taught; this guide stays with
one person and their own machine.
Frameworks built on Bun (full web
frameworks, ORM libraries, hosted
platforms that run on it) get a mention
in chapter 12, not chapters of their
own. Writing a native add-on, embedding
Bun inside another program, and the
plugin API for the bundler are likewise
out; the guide teaches the tool a
working programmer meets first.

## How to use this guide

Read chapter 1 for the idea and chapter
2 before installing anything — knowing
which part holds what turns later
confusion into a named problem. Chapter
3 installs Bun and chapter 4 runs real
code in the same sitting, including the
type error; do not skip that one,
because "runs TypeScript" means
something narrower than most people
assume, and chapter 4 is where the
narrowness is demonstrated. Chapters 5
to 9 each build one skill on the
project the chapter before started, so
following them in order means your
hands finish each one with a check that
passed. Chapter 10 is the honesty
chapter: read it before quoting any
speed number, Bun's marketing or this
guide's. The lab's files live in
`bun-lab/`; its transcripts are
`bun-lab/transcripts/` and its small
project is `bun-lab/demo-app/`.

---

## Part of the series

This guide is one of the [For Mere Mortals](https://paulsullivan33-dev.github.io/mere-mortals/) guides: plain-language guides to the tools programmers and makers use.

Related guides:

- [Node.js for Mere Mortals](https://paulsullivan33-dev.github.io/nodejs-for-mere-mortals/)
- [APIs for Mere Mortals](https://paulsullivan33-dev.github.io/api-for-mere-mortals/)
- [k6 for Mere Mortals](https://paulsullivan33-dev.github.io/k6-for-mere-mortals/)

## License

The writing in this guide is licensed under [CC BY 4.0](https://github.com/paulsullivan33-dev/bun-for-mere-mortals/blob/main/LICENSE). Code examples and lab scripts are licensed under the [MIT License](https://github.com/paulsullivan33-dev/bun-for-mere-mortals/blob/main/LICENSE-CODE).
