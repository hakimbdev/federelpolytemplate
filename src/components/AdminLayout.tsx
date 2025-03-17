import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header/Navigation */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://res.cloudinary.com/dc5qncppu/image/upload/v1740480225/FEDPOLYLOGO_dt7a5r.jpg"
              alt="Federal Polytechnic Kabo Logo"
              className="h-10 w-10 rounded-full mr-3"
            />
            <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-sm text-gray-700">
              {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
            </span>
            <button
              onClick={signOut}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Admin Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="mt-5 px-2">
            <Link
              to="/admin/dashboard"
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/admin/dashboard')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/students"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/admin/students')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Students
            </Link>
            <Link
              to="/admin/staff"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/admin/staff')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Staff
            </Link>
            <Link
              to="/admin/courses"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/admin/courses')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Courses
            </Link>
            <Link
              to="/admin/departments"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/admin/departments')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Departments
            </Link>
            <Link
              to="/admin/applications"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/admin/applications')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Applications
            </Link>
            <Link
              to="/admin/settings"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/admin/settings')
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}