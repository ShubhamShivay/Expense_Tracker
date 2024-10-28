import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getTransactionsAPI } from "../../services/transactions/transactionServices";
import { useQuery } from "@tanstack/react-query";
import { FaBox } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsAPI,
  });

  console.log(transactions);

  const totals = transactions?.data?.reduce(
    (total, transaction) => {
      if (transaction.type === "income") {
        total.income += transaction.amount;
      } else if (transaction.type === "expense") {
        total.expense += transaction.amount;
      }
      return total;
    },
    { income: 0, expense: 0 }
  );

  console.log(totals);

  //! Data Structure
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals?.income, totals?.expense],
        backgroundColor: ["#3b82f6", "#ef4444"],
        borderColor: ["#3b82f6", "#ef4444"],
        borderWidth: 1,
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          boxWidth: 10,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Transaction Overview",
        padding: {
          top: 20,
          bottom: 30,
        },
        font: {
          size: 20,
          weight: "bold",
        },
      },
    },
    cutout: "60%",
  };

  return (
    <div className="my-10 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
