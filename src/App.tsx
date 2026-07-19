import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Designer from "@/pages/Designer";
import Gallery from "@/pages/Gallery";
import Guide from "@/pages/Guide";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="designer" element={<Designer />} />
          <Route path="interiors" element={<Gallery />} />
          <Route path="exteriors" element={<Gallery />} />
          <Route path="landscapes" element={<Gallery />} />
          <Route path="guide" element={<Guide />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
