import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "@/styles/Table.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { userContext } from "./api/auth/userContext";

export default function App({ Component, pageProps }) {
  return (
    <userContext.Provider value={{}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </userContext.Provider>
  );
}
