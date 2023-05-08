import Footer from "@/common/footer/Footer";
import Header from "@/common/header/Header";
import Head from "next/head";
import React, { ReactNode } from "react";

interface BaseLayoutProps {
  children?: ReactNode;
  title: string;
}

const BaseLayout = ({ children, title }: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | Stay Young` : "Stay Young"}</title>
        <meta
          name="description"
          content="Stay Young is a korean skin care website."
        />
      </Head>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default BaseLayout;
