import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import logoImage from "./images/logo.png";
import HomePage from "./pages/public/HomePage";
import HowItWorksPage from "./pages/public/HowItWorksPage";
import BuyersPage from "./pages/public/BuyersPage";
import SellersPage from "./pages/public/SellersPage";
import PricingPage from "./pages/public/PricingPage";
import SecurityPage from "./pages/public/SecurityPage";
import FaqPage from "./pages/public/FaqPage";
import ContactPage from "./pages/public/ContactPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import OtpPage from "./pages/auth/OtpPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import CreateTransactionPage from "./pages/dashboard/CreateTransactionPage";
import DisputesPage from "./pages/dashboard/DisputesPage";
import MessagesPage from "./pages/dashboard/MessagesPage";
import WalletPage from "./pages/dashboard/WalletPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import TransactionDetailsPage from "./pages/dashboard/TransactionDetailsPage";
import ShareableTransactionPage from "./pages/public/ShareableTransactionPage";
import PaymentPage from "./pages/payments/PaymentPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminDisputePage from "./pages/admin/AdminDisputePage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="app-loading-screen" aria-live="polite" aria-busy="true">
        <div className="app-loader-shell">
          <img src={logoImage} alt="SafeTra logo" className="app-loader-logo" />
          <div className="app-loader-text">SafeTra</div>
          <div className="app-loader-bar">
            <span className="app-loader-progress" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/for-buyers" element={<BuyersPage />} />
      <Route path="/for-sellers" element={<SellersPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/t/:transactionId" element={<ShareableTransactionPage />} />
      <Route path="/pay/:transactionId" element={<PaymentPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/transactions" element={<TransactionsPage />} />
      <Route
        path="/dashboard/create-transaction"
        element={<CreateTransactionPage />}
      />
      <Route path="/dashboard/disputes" element={<DisputesPage />} />
      <Route path="/dashboard/messages" element={<MessagesPage />} />
      <Route path="/dashboard/wallet" element={<WalletPage />} />
      <Route path="/dashboard/notifications" element={<NotificationsPage />} />
      <Route path="/dashboard/profile" element={<ProfilePage />} />
      <Route path="/dashboard/settings" element={<SettingsPage />} />
      <Route
        path="/dashboard/transactions/:id"
        element={<TransactionDetailsPage />}
      />

      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/disputes/:id" element={<AdminDisputePage />} />
    </Routes>
  );
}

export default App;
