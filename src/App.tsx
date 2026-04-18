import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Service from "./pages/Service";
import Kontakt from "./pages/Kontakt";
import Konfigurator from "./pages/Konfigurator";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import Anfrage from "./pages/Anfrage";
import Wartungspakete from "./pages/Wartungspakete";
import CategoryRoute from "./pages/CategoryRoute";
import ProductRoute from "./pages/ProductRoute";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/service" element={<Service />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/konfigurator" element={<Konfigurator />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/anfrage" element={<Anfrage />} />
          <Route path="/wartungspakete" element={<Wartungspakete />} />

          {/* Legacy redirect: Wintergärten ist nicht mehr im aktiven Sortiment */}
          <Route path="/wintergaerten" element={<Navigate to="/terrassenueberdachungen" replace />} />

          {/* Produktkategorien & Unterprodukte (data-driven) */}
          <Route path="/:categorySlug" element={<CategoryRoute />} />
          <Route path="/:categorySlug/:productSlug" element={<ProductRoute />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
