# Speed, Measured Honestly

**Outcome of this chapter: you have
seen Bun and Node.js timed with a real
benchmarking tool on the same file,
you know exactly how the measurement
was made, and you know the three
reasons not to quote its headline
number.**

Bun's reputation is speed, and speed
claims deserve a stopwatch, not a
nod. The lab timed the fairest
comparison it could build: the same
trivial program, `hello.js` from
chapter 4 — two lines printed, nothing
else — run under each runtime, on the
same machine, in the same minute,
using **hyperfine**, a benchmarking
tool that runs a command many times
and reports the spread of the results
rather than one lucky run. Three
warm-up runs first (so one-time
reading of files from disk doesn't
pollute the timings), then twenty
timed runs each.

## The result

```text
$ hyperfine --warmup 3 --runs 20 "bun run hello.js" "node hello.js"
Benchmark 1: bun run hello.js (20 runs)
  Wall Time     18.8 ms  ±    10.0 ms      10.9 ms  …    43.0 ms
  Memory        15.0 MiB ±     0.1 MiB     14.8 MiB …    15.1 MiB

Benchmark 2: node hello.js (20 runs)
  Wall Time    289.0 ms  ±    93.0 ms     160.5 ms  …   469.0 ms         (15.4x slower)
  Memory        61.1 MiB ±     0.2 MiB     60.5 MiB …    61.4 MiB         (4.1x more)
```

And the purest form of the same
question — start the interpreter, do
nothing, exit (`bun -e 0` against
`node -e 0`) — came out at 25.3 ms
against 300.4 ms on this occasion.
Startup, on this machine, is not
close: Bun is ready in the time Node
is still clearing its throat, and it
uses a quarter of the memory doing
it. Transcript:
`bun-lab/transcripts/t09-speed.txt`.

## The caveats, which are part of the result

**This machine flatters Bun's ratio.**
The lab box is a small shared sandbox
— two processors, other work coming
and going — and its numbers wobble:
look at the spreads (±93 ms on Node's
average; a best run of 160 ms and a
worst of 469 ms). Node.js on a healthy
desktop starts this same file in a
few tens of milliseconds, not 289.
The *direction* of the result — Bun
starts much faster — matches what the
project and independent testers
report generally; the *size* of the
gap here, fifteenfold, is this
sandbox talking. Quote the direction
freely. Quote "15x" only with the
machine attached to the sentence.

**Startup is not throughput.** This
chapter measured how quickly a
program *begins*. A server that runs
for a month begins once; what matters
there is how fast it works per
request, hour after hour, which is a
different measurement this lab did
not make and this guide does not
guess at. Bun's startup advantage is
decisive for the programs that feel
it — scripts, command-line tools,
test suites starting over and over,
installs — and nearly irrelevant to
a long-lived service's monthly
bill of health.

**Fast starts have many parents.**
Some of Bun's lead is the engine and
the implementation; some is simply
doing less work before your first
line runs — fewer layers between the
command and the code. Node's slower
start buys compatibility machinery
that long, complicated programs may
genuinely use. Neither fact cancels
the other.

## Measuring your own program

The method above is the takeaway, and
it fits in a paragraph: pick the exact
command you care about, run it under
each tool with a benchmarking tool
that repeats and reports spread, on
the machine the program will live on,
while it is doing its usual other
work — and believe your stopwatch
over any guide's, including this one.
For installs, time `bun install`
against `npm install` in a copy of
your own project (chapter 6's 219 ms
was a warm-cache rebuild; your
project's first, cold install is the
number that predicts your Mondays).
