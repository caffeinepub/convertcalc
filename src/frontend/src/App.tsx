import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { CurrencyPage } from "./pages/CurrencyPage";
import { LengthPage } from "./pages/LengthPage";
import { TemperaturePage } from "./pages/TemperaturePage";
import { VolumePage } from "./pages/VolumePage";
import { WeightPage } from "./pages/WeightPage";

// ── Root layout route ─────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

// ── Page routes ───────────────────────────────────────────────────────────
const currencyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CurrencyPage,
});

const lengthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/length",
  component: LengthPage,
});

const temperatureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/temperature",
  component: TemperaturePage,
});

const weightRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/weight",
  component: WeightPage,
});

const volumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/volume",
  component: VolumePage,
});

// ── Router ────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  currencyRoute,
  lengthRoute,
  temperatureRoute,
  weightRoute,
  volumeRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
