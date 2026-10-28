# A Small Web Server

**Outcome of this chapter: a Bun
program is answering real web
requests on your machine — a text
page, a JSON answer, and an honest
404 — and you have proof from a
second program, curl, that it did.**

Everything so far has been programs
that run, print, and exit. Bun's
other headline act is serving:
`Bun.serve` turns a function of yours
into a **web server** — a program
that stays running, listens on a
**port** (a numbered door on the
machine), and answers each incoming
**request** with a **response**.

## The server

The lab's whole server is
`bun-lab/server.ts`, small enough to
read in one sitting:

```ts
const server = Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("Hello from Bun.serve!");
    }

    if (url.pathname === "/api/time") {
      return Response.json({ service: "demo", ok: true });
    }

    return new Response("No such page", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
```

Three ideas carry the whole thing:

- **`Bun.serve` takes a description**,
  not a pile of setup calls: which
  port, and a `fetch` function to run
  per request. (The name is a nod to
  the web's standard `fetch` API, the
  same shape a browser uses.)
- **The function inspects the
  request's path** — the part of the
  address after the host — and decides
  what to answer. `/` gets a greeting;
  `/api/time` gets data; anything
  else falls through to the last line.
- **A response is a value you
  return.** `new Response(text)` is a
  plain answer with a success status
  (200, implied). `Response.json`
  serialises an object into **JSON**
  — the web's usual data format — and
  labels it as such. The fall-through
  answer sets its status explicitly:
  **404**, the web's standard "no
  such page", because answering a
  missing page with a cheerful 200 is
  how debugging afternoons begin.

## Running it, and proving it

The server was started in the
background and then interrogated by
curl — a different program entirely,
which is what makes the check honest:

```text
$ bun run server.ts &
Listening on http://localhost:3000

$ curl -s http://127.0.0.1:3000/
Hello from Bun.serve!

$ curl -s http://127.0.0.1:3000/api/time
{"service":"demo","ok":true}

$ curl -s -w " (status %{http_code})" http://127.0.0.1:3000/missing
No such page (status 404)
```

(The addresses use `127.0.0.1`, the
machine's name for *itself* — the
traffic never left the lab machine,
and port 3000 was the lab's choice,
not a requirement.) All three
answers are the ones the code
promised: text at the root, JSON at
the API path — note it came back
compact, as machines prefer — and a
real 404, status shown, at a path
that does not exist. The server was
then stopped; a server left running
holds its port, which chapter 14
mentions again. Full transcript:
`bun-lab/transcripts/t08-serve.txt`.

## What a real server adds

This skeleton is genuinely the shape
of a working service — small internal
tools and home-lab dashboards run on
exactly this — but a public one adds
what the lab did not exercise and so
does not demonstrate: reading request
bodies and headers, routing by method
(POST as well as GET), serving files,
**TLS** (the encrypted form of HTTP),
error handling when your function
throws, and websockets for live
updates, all of which `Bun.serve`
supports and its documentation
describes. Frameworks such as Hono
and Elysia build friendlier routing
on this same foundation and are
chapter 12's neighbours, not this
chapter's subject. The line this
guide draws is its usual one: the
core above is proven; the rest is
labelled.
