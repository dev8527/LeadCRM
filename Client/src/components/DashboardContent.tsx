import React from 'react';
import { BarChart2, DollarSign, Users, ArrowUpRight, ArrowDownRight, Activity, Eye, Clock, Award, Globe, Flag } from 'lucide-react';

const DashboardContent = () => {
  // Sample statistics data
  const stats = [
    {
      title: "Conversion Rate",
      value: "52.12%",
      subtext: "+4.2% from last month",
      icon: <BarChart2 className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Revenue",
      value: "$2,206.62",
      subtext: "+12.5% from last month",
      icon: <DollarSign className="w-6 h-6" />,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Page Views",
      value: "234k",
      subtext: "+0.1% from last month",
      icon: <Eye className="w-6 h-6" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Time On Site",
      value: "12m 3s",
      subtext: "+1.2% from last month",
      icon: <Clock className="w-6 h-6" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Impressions",
      value: "168",
      subtext: "+7.1% from last month",
      icon: <Activity className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Visitors",
      value: "345.6k",
      subtext: "+2.5% from last month",
      icon: <Users className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  // Sample countries data
  const countries = [
    { name: "USA", flag: "🇺🇸", views: 4835, percentage: "18.4 (7.5%)", bounceRate: "53.25%" },
    { name: "United Kingdom", flag: "🇬🇧", views: 3868, percentage: "286.3 (5.9%)", bounceRate: "8.22%" },
    { name: "India", flag: "🇮🇳", views: 3456, percentage: "250.0 (5.0%)", bounceRate: "10.75%" },
    { name: "Canada", flag: "🇨🇦", views: 2355, percentage: "218.0 (7.5%)", bounceRate: "15.87%" },
    { name: "France", flag: "🇫🇷", views: 1844, percentage: "215.0 (7.5%)", bounceRate: "15.82%" },
    { name: "China", flag: "🇨🇳", views: 1544, percentage: "218.0 (7.5%)", bounceRate: "15.93%" },
  ];

  // Sample most visited pages
  const visitedPages = [
    { name: "Homepage/Index.html", reviewers: 5, visitors: 3410, unique: 756, bounceRate: "19.4", updated: "July 13, 2023" },
    { name: "About/index.html", reviewers: 4, visitors: 2340, unique: 540, bounceRate: "17.8", updated: "June 17, 2022" },
    { name: "Store/shop", reviewers: 3, visitors: 1950, unique: 356, bounceRate: "15.5", updated: "July 9, 2020" },
    { name: "Contact/blog.html", reviewers: 4, visitors: 1650, unique: 310, bounceRate: "12.4", updated: "June 20, 2022" },
    { name: "Terms/blog/important.html", reviewers: 5, visitors: 1240, unique: 280, bounceRate: "18.7", updated: "July 3, 2021" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Dashboard Header */}
    
      {/* Achievement Banner */}
      <div className="bg-indigo-600 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <div className="text-white">
            <h2 className="text-2xl font-bold">Congratulations John!</h2>
            <p className="text-indigo-200">You reached your lead target</p>
            <div className="text-5xl font-bold mt-2">10M</div>
            <p className="text-indigo-200 mt-2">You have beaten 100% expected target today</p>
          </div>
          <div className="relative">
            <div className="flex-shrink-0 w-64 h-48 relative">
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="relative">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center mx-auto relative">
                      <span className="text-white font-bold text-5xl">1</span>
                    </div>
                    <div className="mt-4 bg-yellow-500 w-16 h-4 mx-auto rounded"></div>
                    <div className="mt-1 flex justify-center">
                      <div className="bg-yellow-600 w-6 h-6 rounded-full"></div>
                      <div className="bg-yellow-600 w-6 h-6 rounded-full ml-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <div className="flex flex-col items-end">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <span className="text-xs text-gray-500">{stat.subtext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mid Section - Follower Growth, Country Stats, Website Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Follower Growth */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Follower Growth</h2>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-8 border-indigo-100 rounded-full"></div>
              <div 
                className="absolute inset-0 border-8 border-indigo-500 rounded-full"
                style={{ 
                  clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 85%)',
                  transform: 'rotate(-90deg)'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">85%</span>
              </div>
            </div>
            <p className="text-3xl font-bold mt-6">65,268</p>
            <p className="text-sm text-gray-500">New followers in the past 30 days</p>
            <p className="text-xs text-gray-400 mt-2">It's a 65% increase from last 30 days</p>
          </div>
        </div>

        {/* Country Wise Page Views */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Country Wise Page Views</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">This Week Page Views</p>
          <div className="space-y-3">
            {countries.slice(0, 5).map((country, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl mr-2">{country.flag}</span>
                  <span className="text-sm">{country.name}</span>
                </div>
                <span className="text-sm font-medium">{country.views}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-500 text-sm">View All</button>
        </div>

        {/* Website Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Website Overview</h2>
          </div>
          <div className="h-64 flex flex-col">
            {/* Simplified bar chart representation */}
            <div className="flex items-end h-48 space-x-2 mt-4">
              {[75, 95, 80, 65, 85, 90, 75, 60, 70, 80, 85, 75].map((height, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-1 flex-1">
                  <div className="flex flex-col space-y-1 w-full">
                    <div 
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${height * 0.4}px` }}
                    ></div>
                    <div 
                      className="bg-red-400 rounded-t"
                      style={{ height: `${(height * 0.3) - 10}px` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            {/* Chart legend */}
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-xs">Page Views</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
                <span className="text-xs">New Visitors</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Country Traffic Sources</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Traffic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referrals</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bounce Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exit %</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {countries.map((country, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{country.flag}</span>
                        <span className="text-sm font-medium">{country.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{country.views}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{country.percentage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{country.bounceRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7.85%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Website Visitors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Website Visitors</h2>
          </div>
          <div className="p-6 flex justify-center items-center">
            <div className="w-48 h-48 relative">
              {/* Simple donut chart representation */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4ade80" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="0" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#60a5fa" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="188.4" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f87171" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="62.8" transform="rotate(18 50 50)" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#fbbf24" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="125.6" transform="rotate(150 50 50)" />
              </svg>
            </div>
          </div>
          <div className="px-6 pb-6 grid grid-cols-3 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-xs">Local</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-xs">Domestic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
              <span className="text-xs">International</span>
            </div>
          </div>
        </div>
      </div>

      {/* Most Visited Pages */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Most Visited Pages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviewers</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visitors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unique Page Visitors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bounce Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preview</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visitedPages.map((page, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex -space-x-2">
                      {Array(page.reviewers).fill(0).map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.visitors}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.unique}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.bounceRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.updated}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
    
    </div>
  );
};

export default DashboardContent;