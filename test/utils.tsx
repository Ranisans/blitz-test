import React, { ReactElement } from "react";
import { RouterContext, BlitzRouter } from "blitz";
import { render as defaultRender, RenderResult } from "@testing-library/react";
import { renderHook as defaultRenderHook, RenderHookResult } from "@testing-library/react-hooks";

export * from "@testing-library/react";

// --------------------------------------------------------------------------------
// This file customizes the render() and renderHook() test functions provided
// by React testing library. It adds a router context wrapper with a mocked router.
//
// You should always import `render` and `renderHook` from this file
//
// This is the place to add any other context providers you need while testing.
// --------------------------------------------------------------------------------

// --------------------------------------------------
// render()
// --------------------------------------------------
// Override the default test render with our own
//
// You can override the router mock like this:
//
// const { baseElement } = render(<MyComponent />, {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------

interface IWrapper {
  children: ReactElement;
}

type TRender = (ui: RenderUI, renderOptions?: RenderOptions | undefined) => RenderResult;
type TRenderHook = (
  hook: RenderHook,
  renderOptions?: RenderHookOptions | undefined
) => RenderHookResult<any, any>;

export const render: TRender = (
  ui: RenderUI,
  { wrapper, router, ...options }: RenderOptions = {}
) => {
  if (!wrapper) {
    // Add a default context wrapper if one isn't supplied from the test
    wrapper = ({ children }: IWrapper) => (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        {children}
      </RouterContext.Provider>
    );
  }
  return defaultRender(ui, { wrapper, ...options });
};

// --------------------------------------------------
// renderHook()
// --------------------------------------------------
// Override the default test renderHook with our own
//
// You can override the router mock like this:
//
// const result = renderHook(() => myHook(), {
//   router: { pathname: '/my-custom-pathname' },
// });
// --------------------------------------------------
export const renderHook: TRenderHook = (
  hook: RenderHook,
  { wrapper, router, ...options }: RenderHookOptions = {}
) => {
  if (!wrapper) {
    // Add a default context wrapper if one isn't supplied from the test
    wrapper = ({ children }: IWrapper) => (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        {children}
      </RouterContext.Provider>
    );
  }
  return defaultRenderHook(hook, { wrapper, ...options });
};

export const mockRouter: BlitzRouter = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  params: {},
  query: {},
  isReady: true,
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & { router?: Partial<BlitzRouter> };

type DefaultHookParams = Parameters<typeof defaultRenderHook>;
type RenderHook = DefaultHookParams[0];
type RenderHookOptions = DefaultHookParams[1] & { router?: Partial<BlitzRouter> };
