
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import NotFound from "./pages/NotFound";
import CreateRoomPage from './pages/CreateRoomPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import ContactPage from './pages/ContactPage';
import { NotificationsProvider } from "./context/NotificationsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-room" element={<CreateRoomPage />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
