# The Neighbours

**Outcome of this chapter: for each
tool Bun stands next to, you can say
what it still does that Bun doesn't —
and why adopting Bun is usually
adopting one job at a time, not
defecting.**

Bun did not arrive in an empty field.
Each of its four jobs has an incumbent,
and the incumbents are good. This
chapter characterises them honestly;
these are judgements from the tools'
documented designs, not benchmarks,
except where a chapter of this guide
ran both.

## Node.js, the runtime

Node.js is the default: fifteen-plus
years of production use, the largest
library of answers to every error
message you will ever meet, and a
standard library whose every corner
is implemented because someone needed
it in 2013. Its engine, V8, is
ferociously optimised for long-running
code. Bun's counter-offer is the one
this guide demonstrated: one binary
for four jobs, TypeScript with no
step, starts in a fraction of the
time (chapter 10, with its caveats).
The practical relationship is not war:
most Bun users arrived from Node,
most Bun projects can be run by Node
with at most small changes, and
chapter 8's bundle ran under Node
without Bun in the room. Bun's own
ambition is compatibility *with* Node
— it implements Node's APIs and reads
Node's project files — which tells
you who the incumbent is.

## Deno, the other rethink

Deno is the other modern runtime —
created, like Bun, by someone who
thought the toolchain could be
reimagined, but with different
priorities: permissions first (a Deno
program must be granted access to
files and network explicitly), web
standards throughout, and TypeScript
as a first-class citizen *with* its
checking close at hand. If your worry
is "what might this script do to my
machine", Deno's model answers it in
a way Bun's does not attempt. If your
worry is "how fast can I get this
ordinary npm project running", Bun's
compatibility-first design is the
easier fit. Both are honest tools;
they are answers to different
questions.

## npm, yarn and pnpm, the package managers

npm ships with Node and is the
registry's own client — the one every
package is tested against first. yarn
and pnpm exist because people wanted
installs faster, stricter, or more
frugal with disk than npm's, and in
pnpm's case a shelf layout that stops
packages from quietly using things
they never declared. Bun's installer
competes on raw speed and on being
already installed (it is the same
binary). All four install from the
same registry into materially the
same layout; chapter 11's recipe
works because the manifest,
`package.json`, is shared. Choosing
among them is choosing install
behaviour, not ecosystems.

## esbuild and the bundlers

esbuild (and its peers Vite, Rollup,
webpack) bundle only — but bundling
is a deep job when a project grows:
plugins that teach the bundler new
file kinds, splitting output across
a website's pages, development
servers with live reloading. Bun's
bundler covers the common ground this
guide demonstrated (chapter 8) and
has its own plugin API, but a project
already invested in a bundler's
plugin collection has something real
to lose by moving that one job. The
bundlers also run happily under Bun
as ordinary packages, which is often
the end of the argument: keep the
bundler, take Bun for the runtime
and the installs.

## Jest and Vitest, the test runners

Jest defined the shape of JavaScript
testing — the `test`/`expect` style
chapter 7 uses is its dialect, and
Bun's runner speaks it deliberately,
so test files usually move unchanged.
Vitest is the modern rival, built to
share configuration with the Vite
bundler. What the incumbents still
hold: enormous plugin and reporter
ecosystems, and years of edge cases
already met. What `bun test` holds:
it is already there, starts instantly,
and — the lab's experience — reports
a failure about as clearly as a
failure can be reported (chapter 7).

## The shape of the choice

Notice the pattern across all five:
Bun replaces *tools*, one verb at a
time, inside a project that otherwise
stays put. That is its real
proposition — not a new ecosystem to
move to, but a smaller, faster crowd
to invite in, one job at a time,
keeping the right to send any one of
them home.
