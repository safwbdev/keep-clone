import Link from "next/link";

const Navbar = () => (
  <nav className="navbar">
    <Link href="/">
      <a className="navbar-brand">Keep clone</a>
    </Link>
    <Link href="/">
      <a className="create">Create Note</a>
    </Link>
  </nav>
);
export default Navbar;
