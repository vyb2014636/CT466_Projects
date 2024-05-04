import { apiGetOrders } from "apis";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {
  const [orders, setOrders] = useState(null);
  const [statisticsPrice, setStatisticsPrice] = useState(0);
  const fetchStatistic = async () => {
    const response = await apiGetOrders();
    if (response.success) {
      setOrders(response.order);
    }
  };

  useEffect(() => {
    fetchStatistic();
  }, []);

  return (
    <div className="flex gap-2">
      <div className="w-[24%] h-[150px] bg-orange-200"></div>
      <div className="w-[24%] h-[150px] bg-orange-200"></div>
      <div className="w-[24%] h-[150px] bg-orange-200"></div>
      <div className="w-[24%] h-[150px] bg-orange-200"></div>
    </div>
  );
};

export default Dashboard;
