import "@testing-library/jest-dom/vitest";
import "@testing-library/jest-dom";

import { type TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  type Assertion<T = unknown> = {} & TestingLibraryMatchers<T, void>;
}
