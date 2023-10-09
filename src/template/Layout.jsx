import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";

export default function Layout({ children }) {
  return (
    <div className='space-y-10'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

// props children
