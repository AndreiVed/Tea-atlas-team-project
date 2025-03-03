import { FC } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <main></main>
      <Footer />
    </div>
  );
};
