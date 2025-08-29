import React from "react";

const HomePage = React.lazy(() => import("../pages/landing-page/Homepage.jsx"));
const Login = React.lazy(() => import("../pages/auth/login.jsx"));
const Signup = React.lazy(() => import("../pages/auth/signup.jsx"));
const UserHomepage = React.lazy(
  () => import("../pages/dashboard/user-dashboard/UserHome.jsx")
);
const ProofOfPayment = React.lazy(
  () => import("../pages/dashboard/user-dashboard/proof-of-payment.jsx")
);
const Transactions = React.lazy(
  () => import("../pages/dashboard/user-dashboard/transactions.jsx")
);
const AccountSetting = React.lazy(
  () => import("../pages/dashboard/user-dashboard/accountSetting.jsx")
);
const WorkerHome = React.lazy(
  () => import("../pages/dashboard/worker-dashboard/worker-home.jsx")
);
const WorkerTransaction = React.lazy(
  () => import("../pages/dashboard/worker-dashboard/worker-transaction.jsx")
);
const WorkerAccount = React.lazy(
  () => import("../pages/dashboard/worker-dashboard/worker-account.jsx")
);
const RequestPasswordReset = React.lazy(
  () => import("../pages/auth/requestPasswordReset.jsx")
);
const ResetPassword = React.lazy(
  () => import("../pages/auth/resetPassword.jsx")
);
const VerifyAccount = React.lazy(
  () => import("../pages/auth/activateAccount.jsx")
);
export const routes = [
  // Unprotected routes
  { path: "/", component: HomePage },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/dashboard", component: UserHomepage },
  { path: "/dashboard/proof-of-payment", component: ProofOfPayment },
  { path: "/dashboard/transactions", component: Transactions },
  { path: "/dashboard/account-setting", component: AccountSetting },
  { path: "/admin/dashboard", component: WorkerHome },
  { path: "/admin/dashboard/transactions", component: WorkerTransaction },
  { path: "/admin/dashboard/account", component: WorkerAccount },
  { path: "/request-reset", component: RequestPasswordReset },
  { path: "/reset-password", component: ResetPassword },
  { path: "/activate-account", component: VerifyAccount },

  // Protected routes (using PrivateRoute wrapper)
];
