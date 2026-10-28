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
