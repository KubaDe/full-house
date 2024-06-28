import { type ReactElement, type ReactNode } from "react";
import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { ApiProvider } from "@/components/Providers/ApiProvider";
import { DayjsProvider } from "@/components/Providers/DayjsProvider";

const Provider = ({ children }: { children: ReactNode }) => (
  <ApiProvider>
    <DayjsProvider>{children}</DayjsProvider>
  </ApiProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "queries">): RenderResult => {
  return render(ui, { wrapper: Provider, ...options });
};

// eslint-disable-next-line import/export
export * from "@testing-library/react";
// eslint-disable-next-line import/export
export { customRender as render };
