# Writing criteria for this guide

Every "for Mere Mortals" guide is written to the same nine-point
standard, so a reader who trusts one can trust the rest. Here it
is, with the verification notes for this particular guide below.

1. **Fix it first.** Reader outcomes lead, not action items: each
   chapter opens by naming the outcome it delivers, shows a check
   the reader can run to confirm they got it, and a reasonable
   reader finishes able to state what was done, what it means,
   and what to try next.
2. **Plain language.** Short sentences, everyday vocabulary,
   technical terms defined on first use. No slang, and no
   idioms that only make sense in one country — the reader may
   be translating as they go.
3. **No dead ends.** A guide never tells the reader to do
   something it cannot show them how to verify. Every claim a
   reader relies on — an install, a command, an output — is
   something this guide demonstrates or clearly labels
   documented-only below.
4. **Live-verified where it matters.** Procedures are run for
   real in the guide's lab wherever the build machine allows it,
   and the transcripts kept in the repository are the evidence.
   What could not be run is listed honestly below, never
   presented as if it had been.
5. **General audiences.** Nothing in this guide — examples,
   fixtures, names, addresses — is modelled on any particular
   reader or author's real life, network, or organisations.
   The lab's traffic is the lab talking to itself.
6. **Standalone.** A reader needs this guide, its lab, and
   nothing else. Where another guide would genuinely help, it
   is pointed to once, by name, and the chapter still completes
   without it.
7. **Honest about limits.** Chapter 13 names what the tool
   cannot do: types erased but not checked at run time, Node.js
   compatibility that is high but not total, the checker's own
   prerequisites, executable size, and cache-dependent install
   speed.
8. **Safety stated where it applies.** This tool executes code
   other people wrote; chapter 11 says plainly that `bunx`
   downloads and runs a package, so its name must be checked
   like any program download, and chapter 9's server is
   exercised on loopback only.
9. **Builds clean.** The site builds with MkDocs in strict mode
   with no warnings, and a fresh reader following the chapters
   in order reaches the stated outcome of each.

## Verification notes for this guide

The build machine is a 2-CPU, 7.7 GB Ubuntu 24.04 sandbox.
Bun **1.4.4** (revision 1.4.4+38afee6c8) was downloaded as the
official `bun-linux-x64.zip` from the project's GitHub release
and run in place — no installer script, nothing changed
outside the lab folder. Node.js **24.22.1**, already on the
machine, served as the comparison runtime. All transcripts
live in `bun-lab/transcripts/`; the only editing they received
was shortening the lab's absolute folder paths to `bun-lab/`
so they read identically on any machine. Commands, outputs,
timings and exit codes are otherwise exactly as captured.

Run for real, with transcripts as evidence:

- Version, revision and the full `bun --help` listing (t00).
- `bun run` on a JavaScript file and on a TypeScript file,
  both printing as promised (t01).
- The chapter 4 experiment: a TypeScript file with a
  deliberate type error run by `bun run` — it printed the
  wrong answer and exited 0 — and then caught by `bun check`
  with error TS2322, exit 1, plus the checker's missing
  `@types/bun` note (t01, t02).
- `bun init -y`: the files it writes, its automatic install
  of `@types/bun` and TypeScript from the npm registry, and
  the resulting `package.json` and text lockfile (t03).
- `bun run index.ts` on the generated starter program (t04).
- `bun add ms`: a real registry install — ms@2.1.3, resolved,
  downloaded and lockfiled in 2.40s — and a program importing
  it, run (t04).
- `bun test` on a three-test suite with one deliberately
  wrong expectation: the failure shown in full, exit code 1;
  then the expectation corrected and the suite green, exit
  code 0 (t05, t06).
- `bun build` bundling a TypeScript file plus the `ms`
  package into one 4.11 KB JavaScript file, and that bundle
  executed by plain Node.js with identical output (t07).
- `Bun.serve` on loopback answering three real curl
  requests: a text route, a JSON route, and a genuine 404
  with its status shown (t08).
- `bun build --compile`: a standalone executable built and
  run, with its real size recorded — 109,123,760 bytes for a
  two-line program (t11). The binary was deleted after the
  run; the transcript is the artefact.
- Package scripts: `bun run typecheck` failing on the `ms`
  package's missing types (TS7016), the suggested fix
  `bun add -d @types/ms` applied, and the same script then
  reporting "No type errors in 5 files" (t10).
- A cold `bun install` after deleting `node_modules`:
  8 packages rebuilt from the lockfile in 219 ms, warm cache
  stated in the text (t13).
- `bunx cowsay`: a package binary downloaded from the
  registry and executed in one step (t12).
- Speed, measured with hyperfine 2.0.0 (3 warm-ups, 20 runs):
  `bun run hello.js` at 18.8 ms mean against `node hello.js`
  at 289.0 ms, memory 15.0 MiB against 61.1 MiB, plus an
  interpreter-only `-e 0` pair (t09). Chapter 10 carries the
  caveats: this small shared sandbox inflates Node's side of
  the ratio, and startup is not throughput.

Documented only — described from the project's documentation,
not run, and the text does not claim otherwise:

- The official install script and the Windows PowerShell
  installer (the lab used the release zip on Linux), the
  npm and Homebrew install routes, and `bun upgrade`.
- The interactive tools: `bun repl` and watch/hot modes leave
  no transcript and are characterised, not demonstrated.
- `bun create` templates, `bun fmt`, and the bundler's
  options beyond the core (minify, splitting, `--target`)
  and plugin API.
- The test runner's extras: filtering, watch mode, coverage,
  snapshots and mocks.
- `Bun.serve` beyond the fetch skeleton: request bodies,
  file serving, TLS, websockets, and the frameworks built
  on it.
- The specific current contents of Bun's Node.js
  compatibility list (chapter 13 describes its shape and
  points at the project's maintained list, which changes
  per release).
- The neighbour tools in chapter 12 are characterised from
  their designs, not benchmarked, except where a chapter
  ran both (Node.js in chapters 8 and 10).

Fixtures are this guide's own and deliberately generic: a
greeting program, a four-line duration demo standing on the
real `ms` package, a two-function module with a three-test
suite (one expectation deliberately wrong, corrected in the
repository copy), and a three-route web server that answers
only the lab's own requests on loopback. No example is
modelled on any real person, network, service or
organisation.
