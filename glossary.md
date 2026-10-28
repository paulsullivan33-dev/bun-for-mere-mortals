# Glossary

The terms this guide uses, collected
in one place. Each is defined where it
first appears, too; this page is for
the second meeting.

**Bundler.** A program that follows a
file's imports and packs everything
needed into one (or a few) shippable
files. Bun's is `bun build`
(chapter 8).

**Cache.** A store of things already
fetched, kept for reuse. Bun's package
cache in `~/.bun` is why repeat
installs are fast (chapters 2, 6).

**Declaration file.** A file (ending
`.d.ts`) that describes a plain
JavaScript package's shapes in
TypeScript's language, so the checker
can verify code that uses it
(chapter 5).

**Dev dependency.** A package a
project needs while being worked on —
checkers, type descriptions — as
opposed to while running. Listed
under `devDependencies` (chapters 5,
6).

**Engine.** The part of a runtime that
actually executes JavaScript. Bun's
is JavaScriptCore (Safari's); Node's
is V8 (Chrome's) (chapter 1).

**Exit code.** The number a command
leaves behind to say how it went: 0
for success, anything else for
failure. Scripts and build servers
read it so they don't have to read
the output (chapter 7).

**JavaScriptCore.** See *engine*.

**JSON.** A text format for structured
data — objects, lists, strings,
numbers — that nearly every program
can read. The web's usual data format
(chapter 9).

**Lockfile.** The file that records
the exact versions an install
actually used. Bun's is `bun.lock`
(chapters 2, 6).

**Module.** A file of code that other
files can import and use; the web of
those imports is what a bundler walks
(chapter 8).

**Node modules (`node_modules`).**
The folder inside a project where
installed packages live (chapter 2).

**Package.** A library (or tool)
published to a registry for others to
install and use (chapter 6).

**Package manager.** The tool that
downloads packages, tracks their
versions, and keeps `node_modules`
matching `package.json` (chapters 1,
2).

**PATH.** The list of folders your
shell searches when you type a
command name. Most "command not
found" errors are PATH errors
(chapters 3, 14).

**Port.** A numbered door on a
machine that one listening program
holds; web traffic to a machine is
addressed to a port as well as to the
machine (chapter 9).

**Registry.** The public catalogue
packages are published to and
installed from. For JavaScript, npm's
(chapter 6).

**REPL.** An interactive session —
read, evaluate, print, loop — where
you type code and see answers
immediately. Bun's is `bun repl`
(chapter 2).

**Request / response.** The two
halves of a web conversation: a
client sends a request (an address,
a method, perhaps data), a server
returns a response (a status and a
body) (chapter 9).

**Runtime.** A program that runs
JavaScript (or another language)
outside the environment it was born
in. Bun and Node.js are runtimes
(chapter 1).

**Script.** In `package.json`, a
named command stored with the
project, run with `bun run <name>`
(chapter 5).

**Status code.** The number a web
response carries to say how it went:
200 is success, 404 is "no such
page", 500 is "the server failed"
(chapter 9).

**Transpiling.** Translating code from
one form to a close cousin — here,
TypeScript to JavaScript by erasing
the type annotations. Erasing is not
checking (chapter 4).

**Type annotation.** A note in
TypeScript code declaring the shape
of a value: `name: string` promises
text (chapter 4).

**Type checking.** Verifying, before
or without running, that a program's
values match their declared shapes.
Bun's checker is `bun check`
(chapter 4).
