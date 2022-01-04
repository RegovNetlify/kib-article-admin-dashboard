import * as React from "react";
import { Helmet } from "react-helmet";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/Navbar";
import "./all.sass";
import "../css/index.css";
import useSiteMetadata from "./SiteMetadata";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta
          name="description"
          content={
            "Asia Asset Management’s 2021 Best of the Best Awards for Malaysia Best Equity Manager. Invest with an award-winning asset & wealth manager for sustainable performance."
          }
        />

        <link
          rel="icon"
          href={`${withPrefix("/")}img/apple-touch-icon-72x72.png`}
        />

        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
      </Helmet>
      <NavBar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default TemplateWrapper;
