import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { setupServer } from "msw/node";
import { BodyContentWrapper } from "../bodyContentWrapper";
import { render, screen, waitFor } from "@/testUtils/render";
import { getStatusHandler } from "@/server/api/status/__mocks__/getStatusHandler.mock";

export const server = setupServer();

describe("BodyContentWrapper", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render children when db is connected", async () => {
    server.use(getStatusHandler.apiOk());
    render(
      <BodyContentWrapper>
        <p>Body content</p>
      </BodyContentWrapper>,
    );
    expect(screen.queryByText("Body content")).toBeDefined();
  });

  it("should render db error when db is not connected", async () => {
    server.use(getStatusHandler.apiError());
    render(
      <BodyContentWrapper>
        <p>Body content</p>
      </BodyContentWrapper>,
    );
    await waitFor(() => expect(screen.queryByText("Body content")).toBeNull());
    expect(screen.getByText("Service Unavailable")).toBeVisible();
  });
});
