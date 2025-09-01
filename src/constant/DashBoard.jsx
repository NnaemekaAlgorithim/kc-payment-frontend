// Transactions sample data
export const transactions = [
  {
    id: 1,
    amount: "₦50,000",
    converted: "¥600",
    status: "Completed",
    date: "2025-08-25",
  },
  {
    id: 2,
    amount: "₦120,000",
    converted: "¥1,450",
    status: "Pending",
    date: "2025-08-24",
  },
  {
    id: 3,
    amount: "₦30,000",
    converted: "¥360",
    status: "Failed",
    date: "2025-08-23",
  },
];
// Define table columns
export const columns = [
  {
    name: "Amount (₦)",
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: "Converted (¥)",
    selector: (row) => row.converted,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          row.status === "Completed"
            ? "bg-green-100 text-green-700"
            : row.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
];

// Dummy transactions (replace with API data later)
export const Ttransactions = [
  {
    id: 1,
    amount: "₦50,000",
    converted: "¥600",
    status: "Completed",
    date: "2025-08-25",
  },
  {
    id: 2,
    amount: "₦120,000",
    converted: "¥1,450",
    status: "Pending",
    date: "2025-08-24",
  },
  {
    id: 3,
    amount: "₦30,000",
    converted: "¥360",
    status: "Failed",
    date: "2025-08-23",
  },
  {
    id: 4,
    amount: "₦75,000",
    converted: "¥910",
    status: "Completed",
    date: "2025-08-20",
  },
  {
    id: 5,
    amount: "₦120,000",
    converted: "¥1,450",
    status: "Pending",
    date: "2025-08-24",
  },
  {
    id: 6,
    amount: "₦30,000",
    converted: "¥360",
    status: "Failed",
    date: "2025-08-23",
  },
  {
    id: 7,
    amount: "₦75,000",
    converted: "¥910",
    status: "Completed",
    date: "2025-08-20",
  },
];

export const Transactionscolumns = [
  {
    name: "Transaction ID",
    selector: (row) => row.id,
    sortable: true,
    width: "200px",
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
    cell: (row) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.currency || "USD", // dynamic currency
        minimumFractionDigits: 2,
      }).format(row.amount),
  },
  {
    name: "Status",
    selector: (row) => row.status_display,
    sortable: true,
    cell: (row) => {
      let colorClass = "bg-gray-100 text-gray-700"; // fallback
      switch (row.status?.toLowerCase()) {
        case "completed":
          colorClass = "bg-green-100 text-green-700";
          break;
        case "pending":
        case "processing":
          colorClass = "bg-yellow-100 text-yellow-700";
          break;
        case "failed":
        case "cancelled":
          colorClass = "bg-red-100 text-red-700";
          break;
      }
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${colorClass}`}
        >
          {row.status_display}
        </span>
      );
    },
  },
  {
    name: "Receiver",
    selector: (row) => row.receiver_account_name,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.created_at,
    sortable: true,
    cell: (row) =>
      new Date(row.created_at).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
];
