import { describe, expect, test } from "vitest";
import { myMap } from "../src/index";
describe("myMap", () => {
  test("should apply the operation to each element in the array", () => {
    const input = [1, 2, 3, 4];
    const operation = (x: number) => x * 2;
    const result = myMap(input, operation);
    expect(result).toEqual([2, 4, 6, 8]);
  });

  test("should return an empty array when input is empty", () => {
    const input: number[] = [];
    const operation = (x: number) => x * 2;
    const result = myMap(input, operation);
    expect(result).toEqual([]);
  });

  test("should handle operations that return the same value", () => {
    const input = [5, 10, 15];
    const operation = (x: number) => x;
    const result = myMap(input, operation);
    expect(result).toEqual([5, 10, 15]);
  });

  test("should handle operations that return a constant value", () => {
    const input = [1, 2, 3];
    const operation = () => 42;
    const result = myMap(input, operation);
    expect(result).toEqual([42, 42, 42]);
  });

  test("should handle negative numbers in the input array", () => {
    const input = [-1, -2, -3];
    const operation = (x: number) => x * x;
    const result = myMap(input, operation);
    expect(result).toEqual([1, 4, 9]);
  });
});