import React from 'react';
import { 
  Users, 
  Tractor, 
  MapPin, 
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const registrationData = [
  { state: 'Sokoto', applications: 85 },
  { state: 'Kebbi', applications: 92 },
  { state: 'Zamfara', applications: 78 },
  { state: 'Katsina', applications: 95 },
  { state: 'Kano', applications: 120 },
  { state: 'Jigawa', applications: 88 },
  { state: 'Kaduna', applications: 100 }
];

const statusData = [
  { name: 'Approved', value: 180, color: '#22c55e' },
  { name: 'Pending', value: 120, color: '#eab308' },
  { name: 'Rejected', value: 60, color: '#ef4444' }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total Applications', 
            value: '558', 
            icon: Users,
            color: 'bg-blue-500',
            increase: '+12% from last week'
          },
          { 
            title: 'States Covered', 
            value: '7', 
            icon: MapPin,
            color: 'bg-green-500',
            increase: 'All northwest states'
          },
          { 
            title: 'Active Programs', 
            value: '2', 
            icon: Tractor,
            color: 'bg-yellow-500',
            increase: 'Maize and Rice'
          },
          { 
            title: 'Success Rate', 
            value: '85%', 
            icon: TrendingUp,
            color: 'bg-purple-500',
            increase: '+5% from last month'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.increase}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications by State */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Applications by State</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Application Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Application Status</h2>
          <div className="space-y-4">
            {statusData.map((status) => (
              <div key={status.name} className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    {status.name === 'Approved' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {status.name === 'Pending' && <Clock className="h-5 w-5 text-yellow-500" />}
                    {status.name === 'Rejected' && <XCircle className="h-5 w-5 text-red-500" />}
                    <span className="font-medium">{status.name}</span>
                  </div>
                  <div className="mt-2 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ 
                          width: `${(status.value / 360) * 100}%`,
                          backgroundColor: status.color 
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="text-lg font-semibold" style={{ color: status.color }}>
                    {status.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  name: 'Ibrahim Mohammed',
                  state: 'Kano',
                  position: 'Field Worker',
                  status: 'Approved',
                  date: '2024-03-15'
                },
                {
                  name: 'Aisha Yusuf',
                  state: 'Kaduna',
                  position: 'Technical Staff',
                  status: 'Pending',
                  date: '2024-03-14'
                },
                {
                  name: 'Musa Ibrahim',
                  state: 'Sokoto',
                  position: 'Extension Worker',
                  status: 'Approved',
                  date: '2024-03-14'
                },
                {
                  name: 'Fatima Sani',
                  state: 'Zamfara',
                  position: 'Field Worker',
                  status: 'Rejected',
                  date: '2024-03-13'
                }
              ].map((application, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{application.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{application.state}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{application.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : application.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}