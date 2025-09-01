import React from "react";
import UserDashboardLayout from "../../../components/layouts/user-dashboard";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "react-data-table-component";
import { Transactionscolumns } from "../../../constant/DashBoard";
import { useTransactions } from "../../../hooks/react-query/useTransaction";

function Transactions() {
  const { data, isLoading, isError, error } = useTransactions();

  return (
    <UserDashboardLayout>
      <div className="md:ml-40 md:mr-20 md:mt-20 mt-12 space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold">📊 Transactions</h1>
          <p className="text-gray-600 mt-1">
            View and track all your recent transactions here.
          </p>
        </div>

        {/* Transactions Table */}
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-4">
            {isLoading ? (
              <p>Loading transactions...</p>
            ) : isError ? (
              <p className="text-red-600">
                Failed to load transactions: {error.message}
              </p>
            ) : (
              <DataTable
                title="Transaction History"
                columns={Transactionscolumns}
                data={data?.response_data?.results || []}
                pagination
                highlightOnHover
                striped
                responsive
                defaultSortFieldId={1}
                customStyles={{
                  headCells: {
                    style: {
                      fontWeight: "bold",
                      fontSize: "14px",
                      backgroundColor: "#f9fafb",
                    },
                  },
                  rows: {
                    style: {
                      minHeight: "60px",
                    },
                  },
                }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </UserDashboardLayout>
  );
}

export default Transactions;
