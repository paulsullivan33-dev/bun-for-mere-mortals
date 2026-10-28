# Troubleshooting

**Outcome of this chapter: the traps
the lab actually fell into, in the
order you are most likely to meet
them, each with its check and its
fix.**

## "bun: command not found"

The binary exists; your shell cannot
find it. **Check:** do you know which
folder holds `bun`? The official
installer uses `~/.bun/bin`; a
release-zip install uses wherever you
put it. **Fix:** add that folder to
the PATH in your shell's startup file
(`~/.bashrc`, `~/.zshrc`), then open a
*new* terminal — a running shell does
not re-read its startup file. If the
command works in the new terminal,
the PATH was the whole problem.

## The checker says it cannot find "console"

`bun check` on a loose file reports
`error TS2584: Cannot find name
'console'`, alongside any real
errors. The lab met this in chapter
4. The checker does not have Bun's
type definitions yet, so names Bun
provides — `console`, `fetch`, `Bun`
itself — look invented. **Fix:** in a
project, `bun add -d @types/bun` (a
`bun init` project already has it,
wired in by the `"types": ["bun"]`
line of its `tsconfig.json`). Loose
one-off files can simply be checked
from inside any initialised project
folder, or the error can be ignored
*knowingly* if it is the only one —
but learn to recognise it, so it
never hides a real error standing
next to it.

## "Could not find a declaration file for module ..."

The checker refuses a file that
imports a plain-JavaScript package —
chapter 5's `TS7016` over `ms`. The
package runs fine; it simply ships no
types. **Fix:** exactly what the
error suggests — `bun add -d
@types/<package>` installs the
community-maintained description.
For an obscure package with no
`@types/` companion, the error's
second suggestion is the fallback: a
small declaration file of your own
that declares the module. Either way,
do not fix this by turning the
checker off; the missing description
is a fact worth recording, which is
what both fixes do.

## The program ran, so I assumed the types passed

Not an error message — a conclusion,
and chapter 4's whole subject.
`bun run` never checks types. If a
program's answers look wrong in a way
that smells like the wrong *kind* of
data (a number where a name belongs),
run `bun check` before debugging
anything else; the lab's `Hello, 42!`
would have been caught in a tenth of
a second.

## A script name is "not found"

`bun run dev` says no such script
when `package.json` has no `dev`
entry — or when you are standing in
the wrong folder. **Check:** `bun run`
on its own (with no name) lists the
scripts the project in the *current*
folder defines. Nine times out of
ten the answer is that your terminal
is one folder up or down from the
project root. Scripts live and die by
the folder you are standing in.

## The port is already in use

Starting chapter 9's server twice —
or leaving yesterday's running —
fails, because a port can be held by
only one program at a time. **Check:**
is an earlier `bun run server.ts`
still alive in another terminal?
Stop it (Ctrl-C in its terminal) and
the port is free. Choosing a different
port in the `Bun.serve` options also
works, and is the right answer when
the holder is a program you actually
want.

## An install is misbehaving

Two checks, in order. First,
`rm -rf node_modules && bun install`:
rebuilds the shelf from the lockfile,
which cures most "it worked an hour
ago" states (chapter 6 timed it at
219 ms on a warm cache, so the check
is cheap). Second, if the lockfile
itself is suspect, deleting `bun.lock`
and running `bun install` re-resolves
every version from the registry —
slower, and it may move versions,
which is exactly why it is the
*second* check and not the first.
