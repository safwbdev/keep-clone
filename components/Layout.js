import Head from "next/head";
import Navbar from "./Navbar";
import { TITLE_NAME } from "../constants/lang";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>{TITLE_NAME}</title>
    </Head>
    <Navbar />
    {children}
  </>
);
export default Layout;
