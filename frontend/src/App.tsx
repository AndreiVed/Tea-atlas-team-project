import { FC } from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./index.scss";
import { CatalogPage } from "./modules/CatalogPage";
import { HomePage } from "./modules/HomePage";
import { Menu } from "./modules/Menu";
import { PageNotFound } from "./modules/PageNotFound";
import { ProductPage } from "./modules/ProductPage";

export const App: FC = () => (
  <Router>
    <Header />
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
    <Footer />
  </Router>
);
