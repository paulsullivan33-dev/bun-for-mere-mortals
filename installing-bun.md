# Installing Bun

**Outcome of this chapter: Bun is on
your machine, `bun --version` answers,
and you know which install route you
took and how to undo it.**

Bun is distributed as one executable
file per operating system. That makes
every install route a variation on a
theme: fetch the file, put it where
your shell looks for programs, check
that it answers.

## The official installer (macOS and Linux)

The project's own route is a shell
script served from the Bun website —
the site's front page prints the exact
one-line command, which downloads the
script and hands it to your shell. The
script downloads the build for your
machine, places the binary in
`~/.bun/bin`, and adds that folder to
your shell's **PATH** — the list of
folders your shell searches when you
type a command name. Open a new
terminal afterwards, so the changed
PATH is in effect.

Reading a stranger's script before
running it is a fair instinct. The
script is short, publicly mirrored in
the project's GitHub repository, and
does exactly the three things above;
if you would rather do them by hand,
the release-zip route below is the
same steps performed manually. (On
Windows, the documented route is a
PowerShell one-liner from the same
website, described here from the
documentation — the lab ran on Linux
and did not exercise it.)

## The release zip: the route this lab took

Every Bun release is also published on
the project's GitHub releases page as
zip files, one per platform —
`bun-linux-x64.zip`,
`bun-darwin-arm64.zip` for Apple
silicon Macs, `bun-windows-x64.zip`,
and more. The lab downloaded
`bun-linux-x64.zip` from the **Bun
1.4.4** release, unzipped it, marked
the single `bun` file inside
executable, and used it in place. No
installer ran; nothing outside the
lab folder changed.

This route has two honest advantages
for a first look: you can see exactly
what arrived (one file), and removing
Bun is deleting a folder. Its cost is
that you handle PATH and upgrades
yourself.

## Other routes, briefly

Bun is also available through **npm**
(`npm install -g bun`, for people who
already have Node.js), and through
several operating-system package
managers — Homebrew on macOS among
them. All routes deliver the same
binary; pick the one whose update
habits you already trust, because the
binary itself will not remind you
about new versions unless it was
installed by the official script (see
Upgrading, below). These routes are
described from the project's
documentation; the lab exercised only
the release zip.

## The check

Whatever the route, the proof of an
install is the same two commands:

```bash
bun --version
bun --revision
```

The lab's answers:

```text
$ bun --version
1.4.4

$ bun --revision
1.4.4+38afee6c8
```

The version is the number you quote
when something misbehaves. The
revision adds the exact build — the
characters after the `+` identify the
precise source the binary was built
from, which is what a bug report
wants.

If instead your shell answers
`bun: command not found`, the binary
is almost certainly fine and the PATH
is not: the folder holding `bun` is
not on the list your shell searches.
Chapter 14 walks that fix in order.

## Upgrading and removing

Installed by the official script, Bun
upgrades itself with `bun upgrade`,
which downloads the newest release and
replaces the binary in place. The lab,
having installed by hand, did not run
it — re-downloading the release zip is
its manual equivalent.

Removing Bun is the reverse of its
install: delete the binary (and, if
the official script put it there, the
`~/.bun` folder, which also holds the
package cache from chapter 2), and
remove the PATH line the installer
added to your shell's startup file.
Projects you made keep working as
folders of ordinary files; their
`node_modules` shelves can be rebuilt
by npm or a future Bun alike.
