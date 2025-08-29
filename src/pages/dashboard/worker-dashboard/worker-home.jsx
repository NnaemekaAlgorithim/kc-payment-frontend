import React from "react";
import WorkerDashboardLayout from "../../../components/layouts/worker-dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import Button from "../../../components/ui/Button";
import { Wallet, RefreshCw } from "lucide-react";
import { transactions, columns } from "../../../constant/DashBoard";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

function WorkerHome() {
  return (
    <WorkerDashboardLayout>
      <div className="md:ml-40 md:mr-20 mt-12 md:mt-20 space-y-6 overflow-x-hidden">
        {/* Welcome Message */}
        <div>
          <h1 className="text-3xl font-bold">👋 Welcome back!</h1>
          <p className="text-gray-600 mt-1">
            Manage your exchanges, track your transactions, and send money with
            ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exchange Rate Card */}
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold">Current Exchange Rate</h2>
              </div>
              <p className="text-2xl font-bold text-gray-800">₦1 = ¥0.012</p>
              <p className="text-sm text-gray-500">Updated 2 mins ago</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <Wallet className="w-6 h-6 text-green-600" />
                <h2 className="text-lg font-semibold">Account Details</h2>
              </div>
              <p className="font-medium text-gray-700">Bank: Access Bank</p>
              <p className="font-medium text-gray-700">Acct No: 0123456789</p>
              <p className="font-medium text-gray-700">
                Acct Name: Exchange App Ltd
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-[40%] w-full">
          <Link
            to="/dashboard/proof-of-payment"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 text-center font-medium hover:bg-blue-700 transition-colors hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 block"
          >
            Enter Proof of Payment
          </Link>

          <Link
            to="/dashboard/transactions"
            className="w-full rounded-xl border border-blue-600 text-blue-600 px-6 py-3 text-center font-medium bg-gray-100 transition-colors hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 block"
          >
            View Transactions
          </Link>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Recent Transactions</h2>
          <Card className="rounded-2xl shadow-md">
            <CardContent className="p-4">
              <DataTable
                columns={columns}
                data={transactions}
                pagination
                highlightOnHover
                striped
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </WorkerDashboardLayout>
  );
}

export default WorkerHome;
