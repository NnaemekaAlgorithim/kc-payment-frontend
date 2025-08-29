import Header from "./landingPage-navbar";
import Footer from "./landingPage-footer";
function LandingPageLayout({ children }) {
  return (
    <div className="w-[100vw] h-full overflow-x-hidden ">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default LandingPageLayout;
