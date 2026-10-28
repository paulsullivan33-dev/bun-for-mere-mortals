# Testing

**Outcome of this chapter: your
project has tests, you have watched
one fail with the failure shown in
full, and you have turned the run
green — and you know the exit code
tells the truth both times.**

A **test** is a small program that
runs a piece of your code and asserts
what the answer should be. A **test
runner** finds all those small
programs, runs them, and reports. Bun
has one built in — the fourth job from
chapter 1 — and it looks for files
whose names end in `.test.ts` (or
`.test.js`, and a few cousins).

## The tests

The lab's project gained a small
module worth testing,
`bun-lab/demo-app/words.ts`: a
function that adds two numbers, and
one that shouts a word — uppercases
it and adds an exclamation mark. The
test file, `words.test.ts`, imports
both functions from the built-in
`bun:test` library and states three
expectations:

```ts
import { test, expect } from "bun:test";
import { add, shout } from "./words";

test("add puts two numbers together", () => {
  expect(add(2, 3)).toBe(5);
});

test("shout uppercases and adds a bang", () => {
  expect(shout("hello")).toBe("HELLO!");
});

test("add handles zero", () => {
  expect(add(0, 0)).toBe(1); // deliberately wrong: this one fails
});
```

The shape is worth reading once:
`test` gives the check a name a human
can recognise in the report, and
`expect(...).toBe(...)` says *this
call should produce exactly that*.
The third test is wrong on purpose:
adding zero to zero is not 1, and the
lab wanted a failure to show you.

## The failing run, in full

```text
$ bun test
bun test v1.4.4 (38afee6c8)

words.test.ts:
(pass) add puts two numbers together [0.08ms]
(pass) shout uppercases and adds a bang [0.13ms]
 8 | test("shout uppercases and adds a bang", () => {
 9 |   expect(shout("hello")).toBe("HELLO!");
10 | });
11 |
12 | test("add handles zero", () => {
13 |   expect(add(0, 0)).toBe(1); // deliberately wrong: this one fails
                         ^
error: expect(received).toBe(expected)

Expected: 1
Received: 0

      at <anonymous> (bun-lab/demo-app/words.test.ts:13:21)
(fail) add handles zero [4.15ms]

 2 pass
 1 fail
 3 expect() calls
Ran 3 tests across 1 file. [32.00ms]
```

Everything a failing test owes you is
in that output. The passing tests are
named and timed. The failing one is
shown *in its own source code*, with a
caret under the exact expectation that
did not hold, the pair **Expected: 1 /
Received: 0**, and the file and line
to go and look at. The summary counts
honestly — 2 pass, 1 fail — and the
command's **exit code was 1**, so a
script or a build server can tell the
run failed without reading a word of
it. (The lab captured the exit code
explicitly; the transcript is
`bun-lab/transcripts/t05-test-with-failure.txt`.)

Notice whose fault this failure is:
the *test* is wrong, not the code.
`add(0, 0)` returning 0 is correct
behaviour. Real test failures divide
exactly this way — sometimes the code
is wrong, sometimes the expectation
is — and a good report, like this one,
gives you what you need to tell which
within seconds.

## The fix, and the green run

The expectation was corrected to
`toBe(0)` and the suite run again:

```text
$ bun test
bun test v1.4.4 (38afee6c8)

words.test.ts:
(pass) add puts two numbers together [0.09ms]
(pass) shout uppercases and adds a bang [0.12ms]
(pass) add handles zero [0.01ms]

 3 pass
 0 fail
 3 expect() calls
Ran 3 tests across 1 file. [202.00ms]
```

Exit code 0. The test file in
`bun-lab/demo-app/` is this corrected
version; the failing run survives in
the transcripts, which is where
evidence of a failure belongs.

## What else the runner does

The lab exercised the core: discovery
by filename, per-test timing, honest
reporting. The runner also offers the
things a growing project reaches for
— filtering to one file or one test
name on the command line, watching
files and re-running on change,
measuring which lines of your code
the tests actually exercised
(**coverage**), and Jest-style
snapshots and mocks. Those are
described here from the documentation
rather than demonstrated; the core
above is the part every project uses
daily, and it needed no configuration
at all — no test config file exists
in the lab's project, because the
filename convention and the `bun:test`
import were the whole setup.
