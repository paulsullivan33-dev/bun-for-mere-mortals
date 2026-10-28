# Limits

**Outcome of this chapter: you can
name Bun's real edges — the two this
guide demonstrated, and the rest,
stated without varnish — and judge
whether any of them touches your
work.**

## Types are not checked at run time (demonstrated)

The limit this guide put on a table
and photographed: `bun run` erases
TypeScript's annotations without
verifying them (chapter 4), so a
program can be type-wrong and
run-right-looking — `Hello, 42!` —
and only `bun check`, run separately,
tells you. Projects that treat "it
ran" as "it type-checks" will collect
exactly the bugs TypeScript exists to
prevent. The mitigation is a habit,
not a tool: check in the pipeline,
every time (chapter 11's recipe).

## Node.js compatibility is high, not total (documented, with one lab data point)

Bun implements the great bulk of
Node's standard library and module
habits, and the implementation is
genuinely broad — every program in
this guide, and the whole npm
ecosystem's ordinary packages the lab
touched (`ms`, `cowsay`, the type
packages), ran as expected. But
"the great bulk" is not "all": some
Node APIs are partially implemented
or missing, some native add-ons
(packages with compiled components)
do not load, and behaviour can differ
in corners — exact error texts, the
ordering of obscure events, flags the
runtime accepts. The project's own
documentation maintains the list, and
it shrinks release by release, which
is the other honest fact: any
specific gap named here could be
closed by the version after this
guide's 1.4.4. The working rule is
chapter 11's — try the project; a
failure will be specific, and
specific is actionable.

## The checker has prerequisites (demonstrated)

`bun check` needed the project's type
definitions installed before it could
fully judge a bare file (chapter 4's
`console` complaint), and a package
without types of its own stops the
checker until its `@types/` companion
is added (chapter 5). None of this is
Bun being broken — it is how the
TypeScript ecosystem is plumbed — but
a newcomer should know the checker's
first answers may be about *setup*,
not about their code.

## Small sharp edges (demonstrated or observed in the lab)

- **Compiled executables are huge.**
  109 MB for a two-line program
  (chapter 8), because each carries
  the whole runtime.
- **Install speed depends on the
  cache.** The 219 ms rebuild in
  chapter 6 was warm-cache; a cold
  machine pays download time, and the
  first `bun init` on the lab's
  connection took twenty seconds for
  six packages.
- **The lockfile format is Bun's.**
  `bun.lock` is readable text, but it
  is not npm's lockfile; a project
  using both tools keeps two
  receipts, and they can drift if a
  team mixes installers carelessly.

## Younger means younger (documented)

Bun's first stable release was in
2023; Node's was 2009. The difference
shows up as a thinner library of
answered questions, fewer battle
stories, and an API surface still
gaining pieces (the lab's 1.4.4 help
text includes commands, like `bun
fmt`, that did not exist a few
releases earlier). It also shows up
as pace: gaps close fast, and
behaviour between versions can shift
in ways a fifteen-year-old tool's no
longer does. Pin the version in
anything that matters, and read the
release notes when you upgrade —
advice that is free to give about
every tool and unusually worth
taking about this one.

## What Bun is not for

A program that must behave
*identically* to Node in an obscure
corner — a native add-on's exact
semantics, a deprecated API's precise
error — belongs on Node until proven
otherwise. A team whose constraint is
"only tools with a decade of
production history" has a reasonable
rule that excludes Bun today. And if
your program's cost is dominated by
one long computation, a faster start
buys you nothing; measure the work,
not the welcome (chapter 10).
