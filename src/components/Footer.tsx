import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400 text-sm">
              Federal Polytechnic Kabo is committed to providing quality technical education and fostering innovation in various fields.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/online-application" className="text-gray-400 hover:text-white text-sm">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programs" className="text-gray-400 hover:text-white text-sm">
                  National Diploma (ND)
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-400 hover:text-white text-sm">
                  Higher National Diploma (HND)
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-400 hover:text-white text-sm">
                  Professional Certificates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Federal Polytechnic Kabo</li>
              <li>Kabo, Kano State</li>
              <li>Nigeria</li>
              <li>Phone: +234 803 XXX XXXX</li>
              <li>Email: info@fepoka.edu.ng</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Federal Polytechnic Kabo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;