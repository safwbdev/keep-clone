import Link from "next/link";
import { HEADER_BRAND_NAME, HEADER_NEW_NOTE } from "../constants/lang";

const Navbar = () => (
  <nav className="navbar">
    <Link href="/">
      <a className="navbar-brand">{HEADER_BRAND_NAME}</a>
    </Link>
    <Link href="/new">
      <a className="create">
        <i aria-hidden="true" className="add icon"></i>
        {HEADER_NEW_NOTE}
      </a>
    </Link>
  </nav>
);
export default Navbar;
