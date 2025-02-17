import React from 'react';
import { BarChart2, DollarSign, Users, ArrowUpRight, ArrowDownRight, Activity, Package, Eye, ShoppingBag } from 'lucide-react';

const DashboardContent = () => {
  // Sample stat cards data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      isIncrease: true,
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Active Users",
      value: "2,345",
      change: "+15.2%",
      isIncrease: true,
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Active Sessions",
      value: "1,245",
      change: "-5.1%",
      isIncrease: false,
      icon: <Activity className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Bounce Rate",
      value: "42.34%",
      change: "+12.3%",
      isIncrease: false,
      icon: <Eye className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  // Sample recent orders
  const recentOrders = [
    { id: "ORD001", customer: "John Doe", status: "Completed", amount: "$235.89", date: "2024-02-08" },
    { id: "ORD002", customer: "Jane Smith", status: "Pending", amount: "$125.99", date: "2024-02-08" },
    { id: "ORD003", customer: "Bob Johnson", status: "Processing", amount: "$549.00", date: "2024-02-07" },
    { id: "ORD004", customer: "Alice Brown", status: "Completed", amount: "$89.99", date: "2024-02-07" },
    { id: "ORD005", customer: "Charlie Wilson", status: "Cancelled", amount: "$199.99", date: "2024-02-06" }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Download Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <span className={`${stat.isIncrease ? 'text-green-600' : 'text-red-600'} flex items-center text-sm font-medium`}>
                {stat.change}
                {stat.isIncrease ? 
                  <ArrowUpRight className="w-4 h-4 ml-1" /> : 
                  <ArrowDownRight className="w-4 h-4 ml-1" />}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <select className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg">
            <BarChart2 className="w-12 h-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Chart Placeholder</span>
          </div>
        </div>

        {/* Sales Analytics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Sales Analytics</h2>
            <select className="text-sm border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72 flex items-center justify-center bg-gray-50 rounded-lg">
            <Package className="w-12 h-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Chart Placeholder</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;