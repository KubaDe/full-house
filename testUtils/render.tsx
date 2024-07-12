import { type ReactElement, type ReactNode, Suspense } from "react";
import { render, renderHook, type RenderOptions, type RenderResult } from "@testing-library/react";
import { ApiProvider } from "@/components/providers/apiProvider";
import { DayjsProvider } from "@/components/providers/dayjsProvider";

const Provider = ({ children }: { children: ReactNode }) => (
  <ApiProvider>
    <Suspense fallback="loading">
      <DayjsProvider>{children}</DayjsProvider>
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
