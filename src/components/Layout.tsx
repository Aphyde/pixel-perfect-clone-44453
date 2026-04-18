import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, noFooter }: { children: React.ReactNode; noFooter?: boolean }) => (
  <div className="min-h-screen">
    <Navbar />
    <main>{children}</main>
    {!noFooter && <Footer />}
  </div>
);

export default Layout;
