import Link from "next/link";

const Navbar = () => (
  <nav className="navbar">
    <Link href="/">
      <a className="navbar-brand">Keep clone</a>
    </Link>
    <Link href="/new">
      <a className="create">
        <i aria-hidden="true" class="add icon"></i>New Note
      </a>
    </Link>
  </nav>
);
export default Navbar;
