# Packages

**Outcome of this chapter: your
project depends on a real package from
the npm registry, your code uses it,
and you can explain why reinstalling
everything took a fifth of a second
the second time.**

Almost no program is written from
scratch. It stands on **packages** —
libraries other people published to a
**registry**, a public catalogue any
tool can download from. For JavaScript
that registry is **npm's**, and Bun
installs from it directly: a package
that exists for Node.js is a package
Bun can fetch. Nothing about Bun
requires a separate Bun-only catalogue,
and there isn't one.

## Adding a package: bun add

The lab's project needed a tiny,
well-known utility: **`ms`**, which
turns human durations into numbers and
back — `"2 days"` into the count of
milliseconds in two days. One of the
smallest honest packages on the
registry, with no dependencies of its
own. Adding it:

```text
$ bun add ms
bun add v1.4.4 (38afee6c8)
Resolving dependencies
Resolved, downloaded and extracted [4]
Saved lockfile

installed ms@2.1.3

1 package installed [2.40s]
```

Read the receipt. Bun **resolved**
the request — `ms` with no version
asked, so the newest the registry
offers — **downloaded** it from the
registry for real (this transcript is
not a simulation; the lab's network
did the fetching), recorded the exact
result in the lockfile ("Saved
lockfile"), and placed version
**2.1.3** on the `node_modules` shelf.
`package.json` gained:

```json
"dependencies": {
  "ms": "^2.1.3"
}
```

The small hat, `^`, is a promise about
the future: it permits later installs
to take compatible updates (2.1.4,
2.2.0) but not a breaking 3.0.0. The
lockfile, not this line, holds the
exact version actually installed —
chapter 2's distinction, now with a
real example.

Removing a package is the mirror:
`bun remove ms` edits the manifest,
the lockfile and the shelf together.

## Using it

The lab's `wait.ts`
(`bun-lab/demo-app/wait.ts`) is four
lines of consequence:

```ts
import ms from "ms";

const wait = ms("2 days");

console.log(`Two days is ${wait} milliseconds.`);
console.log(`Half of that is ${ms(wait / 2, { long: true })}.`);
```

```text
$ bun run wait.ts
Two days is 172800000 milliseconds.
Half of that is 1 day.
```

Nothing about that program is
Bun-specific: the same file, the same
package, runs under Node.js. That is
the quiet point of Bun's package
story — it competes on the speed and
convenience of the *tooling*, not by
locking your code into its own
ecosystem.

## Installing from nothing: bun install

`bun add` is for changing the list.
`bun install` is for making a machine
match the list it already has — the
command you run after copying a
project to a new folder or a new
computer. To prove what it does, the
lab deleted the project's entire
`node_modules` shelf and ran it:

```text
$ rm -rf node_modules
$ bun install
bun install v1.4.4 (38afee6c8)

+ @types/bun@1.4.4
+ @types/ms@2.1.0
+ ms@2.1.3
+ typescript@7.0.2

8 packages installed [219.00ms]
```

Eight packages (the four named, plus
four that those packages themselves
depend on) rebuilt from the lockfile
in **219 milliseconds**. Chapter 2
explained why: the downloads had
already happened once, so this run
copied from Bun's per-user cache
instead of the network. The first
install in chapter 5 paid full price
— twenty seconds for its set — and
every later one rides on it.

Two honest qualifications belong next
to that number. A project whose
packages are *not* yet in your cache
pays download time like any tool; Bun
is still quick at the fetching, but
networks are networks. And the cache
is per-user on one machine — a fresh
computer, or a build server, starts
cold. The speed is real; its size
depends on which install you are
timing.

## Dev dependencies, once more

Chapter 5's `@types/ms` arrived with
a `-d` flag and landed in
`devDependencies` instead of
`dependencies`. The distinction is
worth keeping straight, because the
two lists answer different questions:
`dependencies` is what the program
needs *while it runs*; `devDependencies`
is what you need *while you work on
it* — checkers, type descriptions,
formatters. When a project is bundled
for shipping (chapter 8), only the
first list travels.
