import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileCallButton from "./MobileCallButton";

const Layout = ({ children, noFooter }: { children: React.ReactNode; noFooter?: boolean }) => (
  <div className="min-h-screen">
    <Navbar />
    <main>{children}</main>
    {!noFooter && <Footer />}
    <MobileCallButton />
  </div>
);

export default Layout;
