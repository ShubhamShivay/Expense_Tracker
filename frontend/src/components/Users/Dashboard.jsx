import React from "react";
import TransactionList from "../Transactions/TransactionList";
import TransactionChart from "../Transactions/TransactionChart";
import FilterSection from "../Transactions/TransactionsList";
import TransactionsList from "../Transactions/TransactionsList";

const Dashboard = () => {
  return (
    <>
      <TransactionChart />
      <TransactionsList />
    </>
  );
};

export default Dashboard;
