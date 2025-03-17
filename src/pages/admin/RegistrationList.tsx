import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Search, Filter, Download } from 'lucide-react';

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  stateOfOrigin: string;
  position: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function RegistrationList() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    state: '',
    position: '',
    status: ''
  });

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'biarn_registration'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          status: 'pending'
        })) as Registration[];
        setRegistrations(data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !filter.state || reg.stateOfOrigin === filter.state;
    const matchesPosition = !filter.position || reg.position === filter.position;
    const matchesStatus = !filter.status || reg.status === filter.status;

    return matchesSearch && matchesState && matchesPosition && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['Full Name', 'Email', 'Phone', 'State', 'Position', 'Submitted At', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg => [
        reg.fullName,
        reg.email,
        reg.phone,
        reg.stateOfOrigin,
        reg.position,
        reg.submittedAt,
        reg.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'registrations.csv';
    link.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Registration List</h1>
        <button
          onClick={exportToCSV}
          className="flex items-center px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-800 transition-colors"
        >
          <Download className="h-5 w-5 mr-2" />
          Export CSV
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search registrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <select
            value={filter.state}
            onChange={(e) => setFilter({ ...filter, state: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All States</option>
            <option value="Sokoto">Sokoto</option>
            <option value="Kebbi">Kebbi</option>
            <option value="Zamfara">Zamfara</option>
            <option value="Katsina">Katsina</option>
            <option value="Kano">Kano</option>
            <option value="Jigawa">Jigawa</option>
            <option value="Kaduna">Kaduna</option>
          </select>

          <select
            value={filter.position}
            onChange={(e) => setFilter({ ...filter, position: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Positions</option>
            <option value="special_assistant">Special Assistant</option>
            <option value="senior_legislative_aide">Senior Legislative Aide</option>
            <option value="legislative_aide">Legislative Aide</option>
            <option value="technical_staff">Technical Staff</option>
            <option value="field_worker">Field Worker</option>
            <option value="extension_worker">Extension Worker</option>
            <option value="experienced_farmer">Experienced Farmer</option>
          </select>

          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRegistrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{registration.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{registration.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{registration.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{registration.stateOfOrigin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{registration.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      registration.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : registration.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {registration.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-red-900 hover:text-red-800 mr-4">View</button>
                    <button className="text-red-900 hover:text-red-800">Edit</button>
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