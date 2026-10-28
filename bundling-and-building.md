# Bundling and Building

**Outcome of this chapter: your
project's code and its package are
packed into a single JavaScript file,
that file runs under plain Node.js
unchanged, and you have also made a
standalone executable — with its size
stated before anyone gets excited.**

A program under development is many
files: your files, importing each
other, importing packages from
`node_modules`. A **bundler** walks
that web of imports from an entry
point and writes out one file
containing everything needed, in the
right order. Shipping gets simpler —
one file to copy, host, or hand over —
and the receiving machine needs no
`node_modules` shelf at all.

## bun build

The lab bundled `wait.ts` from
chapter 6 — the program that imports
the `ms` package:

```text
$ bun build ./wait.ts --outdir ./dist
Bundled 2 modules in 82ms

  wait.js  4.11 KB  (entry point)
```

**2 modules** is the web, counted:
`wait.ts` itself, and the `ms` package
inlined into the same output. Four
kilobytes total, in a new folder named
`dist` (short for *distribution* — the
conventional name for the folder of
shippable output; `bun init`'s
`.gitignore` already excludes it).

The honest proof that the bundle is
ordinary JavaScript is to run it with
something that is not Bun. The lab's
machine has Node.js, so:

```text
$ node dist/wait.js
Two days is 172800000 milliseconds.
Half of that is 1 day.
```

Identical output, no Bun involved.
Bundling with Bun does not commit you
to Bun at the destination — a point
worth remembering in chapter 12's
comparison: the bundler is a tool you
can adopt alone, its output belonging
to no runtime in particular. Bun's
build also transpiles as it goes, so
a TypeScript entry point like this
one needs no separate step, for the
same reason chapter 4 gave — the
types are erased, not checked, on the
way through. Check first, then build.

## One step further: a standalone executable

`bun build` has a sterner option,
`--compile`, which embeds the runtime
itself into the output — producing a
program that runs on a machine with
*no* JavaScript runtime installed at
all. The lab compiled the first
chapter's `hello.js`:

```text
$ bun build ./hello.js --compile --outfile ./hello-bin
 [163ms]  bundle  1 modules
[1.853s] compile  ./hello-bin

$ ./hello-bin
Hello, reader!
The numbers 1 to 4 add up to 10.
```

And now the honesty, because there is
a price and it is printed in the same
transcript:

```text
$ ls -la hello-bin
-rwxr-xr-x 1 root root 109123760 Oct 28 17:32 hello-bin
```

**109 megabytes** — for a program
that prints two lines. The runtime
travels inside every compiled
executable, so each one carries the
full weight of it. Whether that trade
is good depends entirely on the
delivery problem: for handing a tool
to someone who has no runtime and
should not need one, a single
downloadable file of 109 MB may be
exactly right. For shipping ten small
tools, it is ten runtimes, and the
plain bundle — kilobytes, plus a
runtime installed once — is the
saner shape. The lab kept the
transcript (`bun-lab/transcripts/t11-compile.txt`)
and deleted the binary; it was an
experiment, not an artefact.

Options the lab did not exercise —
minifying the output (shrinking names
and whitespace for the smallest
download), splitting a bundle into
per-page pieces for a website,
targeting a specific runtime's quirks
with `--target` — are part of the
same command and described in its
documentation; the core above is the
shape every use shares.
