import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children, heroImage }) {
  return (
    <div className="relative min-h-screen">

      {heroImage && (
        <div
          className="fixed inset-0 bg-cover bg-center blur-sm opacity-60 -z-10"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
      )}

      <Navbar heroImage={heroImage} />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />

    </div>
  );
}

export default MainLayout;