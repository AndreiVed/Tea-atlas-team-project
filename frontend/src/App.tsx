import { FC, useEffect } from "react";
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from "react-router-dom";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollToTop } from "./components/ScrollToTop";
import { updateAccessToken } from "./features/profile/profileSlice";
import "./index.scss";
import { BlogPage } from "./modules/BlogPage";
import { CatalogPage } from "./modules/CatalogPage";
import { ContactPage } from "./modules/ContactPage";
import { HomePage } from "./modules/HomePage";
import { LikedItPage } from "./modules/LikedItPage";
import { LoginPage } from "./modules/LoginPage";
import { Menu } from "./modules/Menu";
import { PageNotFound } from "./modules/PageNotFound";
import { ProductPage } from "./modules/ProductPage";
import { ProfilePage } from "./modules/ProfilePage";
import { EmailSentMessage } from "./modules/SignUpPage/components/EmailSentMessage";
import { SignUpForm } from "./modules/SignUpPage/components/SignUpForm";
import { SignUpPage } from "./modules/SignUpPage/SignUpPage";
import { SpecificBlogPage } from "./modules/SpecificBlogPage";
import { useAppDispatch } from "./store/hooks";

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const access = localStorage.getItem("access_token");

    if (access) {
      dispatch(updateAccessToken(access));
    }
  }, [dispatch]);

  return (
    <Router>
      <CustomCursor />
      <Header />
      <main className="main">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<ProductPage />} />
          <Route path="/liked-it" element={<LikedItPage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />}>
            <Route index element={<SignUpForm />} />
            <Route path="confirmation-sent" element={<EmailSentMessage />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route
            path="/blog/tea-brewing-essentials"
            element={<SpecificBlogPage />}
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};
