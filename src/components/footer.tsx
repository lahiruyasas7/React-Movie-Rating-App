const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-zinc-900 via-gray-900 to-black text-gray-300 px-6 py-12 mt-10 border-t border-zinc-700 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h5 className="text-lg font-semibold mb-4 text-white">The Basics</h5>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Our Services
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              System Status
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h5 className="text-lg font-semibold mb-4 text-white">
            Get Involved
          </h5>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">
              Add New Movie
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Add New TV Series
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h5 className="text-lg font-semibold mb-4 text-white">Community</h5>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-400 cursor-pointer">Guidelines</li>
            <li className="hover:text-yellow-400 cursor-pointer">Discussion</li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Leader Board
            </li>
          </ul>
        </div>

        {/* Column 4 - Socials */}
        <div>
          <h5 className="text-lg font-semibold mb-4 text-white">Follow Us</h5>
          <ul className="flex gap-4 text-xl">
            <li className="hover:text-yellow-400 cursor-pointer">🌐</li>
            <li className="hover:text-yellow-400 cursor-pointer">🐦</li>
            <li className="hover:text-yellow-400 cursor-pointer">📸</li>
            <li className="hover:text-yellow-400 cursor-pointer">💼</li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-12 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} CineBase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
