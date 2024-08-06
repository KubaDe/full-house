import "@testing-library/jest-dom/vitest";
import { type TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  type Assertion<T = unknown> = {} & TestingLibraryMatchers<T, void>;
}
