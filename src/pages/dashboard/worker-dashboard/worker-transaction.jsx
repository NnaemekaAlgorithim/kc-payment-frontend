import React from "react";
import WorkerDashboardLayout from "../../../components/layouts/worker-dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "react-data-table-component";
import {
  Ttransactions,
  Transactionscolumns,
} from "../../../constant/DashBoard";

function WorkerTransaction() {
  return (
    <WorkerDashboardLayout>
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
            <DataTable
              title="Transaction History"
              columns={Transactionscolumns}
              data={Ttransactions}
              pagination
              highlightOnHover
              striped
              responsive
              defaultSortFieldId={1}
            />
          </CardContent>
        </Card>
      </div>
    </WorkerDashboardLayout>
  );
}

export default WorkerTransaction;
