import { test, expect } from "bun:test";
import { add, shout } from "./words";

test("add puts two numbers together", () => {
  expect(add(2, 3)).toBe(5);
});

test("shout uppercases and adds a bang", () => {
  expect(shout("hello")).toBe("HELLO!");
});

test("add handles zero", () => {
  expect(add(0, 0)).toBe(0);
});
