import { type ReactElement, type ReactNode, Suspense } from "react";
import { render, renderHook, type RenderOptions, type RenderResult } from "@testing-library/react";
import NiceModal from "@ebay/nice-modal-react";
import { vi } from "vitest";
import { ApiProvider } from "@/components/providers/apiProvider";
import { DayjsProvider } from "@/components/providers/dayjsProvider";

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
        <DayjsProvider>{children}</DayjsProvider>
      </NiceModal.Provider>
    </Suspense>
  </ApiProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "queries">): RenderResult => {
  return render(ui, { wrapper: Provider, ...options });
};
const customRenderHook: typeof renderHook = (render, options) => {
  return renderHook(render, { wrapper: Provider, ...options });
};

// eslint-disable-next-line import/export
export * from "@testing-library/react";
// eslint-disable-next-line import/export
export { customRender as render, customRenderHook as renderHook };
