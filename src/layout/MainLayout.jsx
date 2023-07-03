import React, { useEffect } from "react";
import { PageLoading } from "../components/PageLoading";
import { PageOverlay } from "../components/PageOverlay";
import { Header } from "../components/Header";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Modal } from "../components/Modal";
import { AuthenModal } from "../components/AuthenModal";
import { Outlet, useLocation } from "react-router-dom";
import { AuthenProvider } from "../components/AuthenContext";
import { libJsFunction } from "../assets/js/main";

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [pathname]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/dest/main.js";
    document.body.appendChild(script)
  }, []);

  return (
    <AuthenProvider>
      {/* Page effect */}
      <PageOverlay />

      {/* Header */}
      <Header />

      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <Outlet />

      {/* Footer */}
      <Footer />

      {/* Modal */}
      <Modal />
      <AuthenModal />
    </AuthenProvider>
  );
};

export default MainLayout;
