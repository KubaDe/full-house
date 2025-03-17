import { Fragment, type ReactElement, type ReactNode, Suspense } from "react";
import {
  render,
  renderHook,
  type RenderOptions,
  type RenderResult,
} from "@testing-library/react";
import NiceModal from "@ebay/nice-modal-react";
import { vi } from "vitest";
import { omit } from "lodash-es";
import { ApiProvider } from "../components/apiProvider";
import { DayjsProvider } from "../components/dayjsProvider";
import { Toaster } from "../components/sonner";

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
});

window.scrollTo = vi.fn() as (options?: ScrollToOptions) => void;

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

const Provider = ({ children }: { children: ReactNode }) => (
  <ApiProvider>
    <Suspense fallback="loading">
      <NiceModal.Provider>
        <DayjsProvider>
          {children}
          <Toaster />
        </DayjsProvider>
      </NiceModal.Provider>
    </Suspense>
  </ApiProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
): RenderResult => {
  const Wrapper = options?.wrapper ?? Fragment;

  return render(ui, {
    wrapper: ({ children }) => (
      <Provider>
        <Wrapper>{children}</Wrapper>
      </Provider>
    ),
    ...omit(options, ["wrapper"]),
  });
};
const customRenderHook: typeof renderHook = (render, options) => {
  const Wrapper = options?.wrapper ?? Fragment;

  return renderHook(render, {
    wrapper: ({ children }) => (
      <Provider>
        <Wrapper>{children}</Wrapper>
      </Provider>
    ),
    ...omit(options, ["wrapper"]),
  });
};

export * from "@testing-library/react";
export { customRender as render, customRenderHook as renderHook };
