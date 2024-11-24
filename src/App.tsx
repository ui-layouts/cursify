import { Route, Routes } from "react-router-dom";
import MarketingPage from "./pages/marketing/MarketingPage";
import DocumentPage from "./pages/document/DocumentPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketingPage />} />
      <Route path="/:category/:subcategory" element={<DocumentPage />} />
    </Routes>
  );
} 