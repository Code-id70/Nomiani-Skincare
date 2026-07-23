function Footer() {
  return (
    <footer className="bg-stone-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-bold">
          DELI EGGS
        </h2>

        <p className="mt-3 text-gray-300">
          Farm-fresh produce delivered with care.
        </p>

        <p className="mt-8 text-sm text-gray-400">
          © {new Date().getFullYear()} DELI EGGS. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;