import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

// props children
