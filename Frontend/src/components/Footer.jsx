import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 p-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About FretBox</h3>
            <p>
              FretBox is a management app for hostels & service apartments.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Our Team</a></li>
          
              <li><a href="#" className="hover:text-blue-400">Policies</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms Of Use</a></li>
           
             
            </ul>
          </div>

          {/* Industries Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Industries</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Hostel Student Management APP</a></li>
         
              <li><a href="#" className="hover:text-blue-400">Hostel Online Rent Collection APP</a></li>
              <li><a href="#" className="hover:text-blue-400">Hostel Security App</a></li>
        
              <li><a href="#" className="hover:text-blue-400">PG Security Software</a></li>
              <li><a href="#" className="hover:text-blue-400">PG Food menu System Software</a></li>
            </ul>
          </div>

        </div>

        {/* Trademark Section */}
        <div className="mt-10 text-center text-sm text-gray-400 ">
          <p>&copy; {new Date().getFullYear()} ramnarayan All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
