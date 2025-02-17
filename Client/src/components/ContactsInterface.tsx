import React, { useState } from 'react';
import { Mail, Phone, Table, Filter, ArrowUpDown, ArrowRight, X, Linkedin } from 'lucide-react';

const ContactsInterface = () => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Marc Benioff',
      company: 'Salesforce',
      jobTitle: 'Chief Executive Officer',
      location: 'California, United States',
      email: 'mbenioff@salesforce.com',
      grade: 'A',
      additionalInfo: '+2',
      phone: '+1 415-123-4567',
      linkedin: 'linkedin.com/in/mbenioff'
    },
    {
        id: 1,
        name: 'Marc Benioff',
        company: 'Salesforce',
        jobTitle: 'Chief Executive Officer',
        location: 'California, United States',
        email: 'mbenioff@salesforce.com',
        grade: 'A',
        additionalInfo: '+2',
        phone: '+1 415-123-4567',
        linkedin: 'linkedin.com/in/mbenioff'
      },
      {
        id: 1,
        name: 'Marc Benioff',
        company: 'Salesforce',
        jobTitle: 'Chief Executive Officer',
        location: 'California, United States',
        email: 'mbenioff@salesforce.com',
        grade: 'A',
        additionalInfo: '+2',
        phone: '+1 415-123-4567',
        linkedin: 'linkedin.com/in/mbenioff'
      },
      {
        id: 1,
        name: 'Marc Benioff',
        company: 'Salesforce',
        jobTitle: 'Chief Executive Officer',
        location: 'California, United States',
        email: 'mbenioff@salesforce.com',
        grade: 'A',
        additionalInfo: '+2',
        phone: '+1 415-123-4567',
        linkedin: 'linkedin.com/in/mbenioff'
      },
      {
        id: 1,
        name: 'Marc Benioff',
        company: 'Salesforce',
        jobTitle: 'Chief Executive Officer',
        location: 'California, United States',
        email: 'mbenioff@salesforce.com',
        grade: 'A',
        additionalInfo: '+2',
        phone: '+1 415-123-4567',
        linkedin: 'linkedin.com/in/mbenioff'
      },
      {
        id: 1,
        name: 'Marc Benioff',
        company: 'Salesforce',
        jobTitle: 'Chief Executive Officer',
        location: 'California, United States',
        email: 'mbenioff@salesforce.com',
        grade: 'A',
        additionalInfo: '+2',
        phone: '+1 415-123-4567',
        linkedin: 'linkedin.com/in/mbenioff'
      },
      {
        id: 1,
        name: 'Marc Benioff',
        company: 'Salesforce',
        jobTitle: 'Chief Executive Officer',
        location: 'California, United States',
        email: 'mbenioff@salesforce.com',
        grade: 'A',
        additionalInfo: '+2',
        phone: '+1 415-123-4567',
        linkedin: 'linkedin.com/in/mbenioff'
      },
      {
        id: 1,
        name: 'Marc Benioff',
        company: 'Salesforce',
        jobTitle: 'Chief Executive Officer',
        location: 'California, United States',
        email: 'mbenioff@salesforce.com',
        grade: 'A',
        additionalInfo: '+2',
        phone: '+1 415-123-4567',
        linkedin: 'linkedin.com/in/mbenioff'
      },
      {
        id: 1,
        name: 'Marc Benioff',
        company: 'Salesforce',
        jobTitle: 'Chief Executive Officer',
        location: 'California, United States',
        email: 'mbenioff@salesforce.com',
        grade: 'A',
        additionalInfo: '+2',
        phone: '+1 415-123-4567',
        linkedin: 'linkedin.com/in/mbenioff'
      },
      {
        id: 1,
        name: 'Marc Benioff',
        company: 'Salesforce',
        jobTitle: 'Chief Executive Officer',
        location: 'California, United States',
        email: 'mbenioff@salesforce.com',
        grade: 'A',
        additionalInfo: '+2',
        phone: '+1 415-123-4567',
        linkedin: 'linkedin.com/in/mbenioff'
      }
  ]);

  const handleSidebarOpen = (contact) => {
    setSelectedContact(contact);
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
    setSelectedContact(null);
  };

  return (
    <div className="p-6 mx-auto relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Prospects</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Add Contact
        </button>
      </div>

      {/* Contacts List */}
      <div className="rounded-lg bg-white shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b">
          <div className="font-medium text-gray-700">Name</div>
          <div className="font-medium text-gray-700">Company</div>
          <div className="font-medium text-gray-700">Job Title</div>
          <div className="font-medium text-gray-700">Location</div>
          <div className="font-medium text-gray-700">Actions</div>
        </div>

        {/* Table Body */}
        {contacts.map(contact => (
          <div key={contact.id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 border-b last:border-b-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="font-medium text-gray-900">{contact.name}</span>
            </div>
            <span className="text-gray-600">{contact.company}</span>
            <span className="text-gray-600">{contact.jobTitle}</span>
            <span className="text-gray-600">{contact.location}</span>
            <div className="flex items-center space-x-4">
              <button
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => handleSidebarOpen(contact)}
              >
                {contact.additionalInfo}
              </button>
              <Mail className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              <ArrowRight className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      {sidebarOpen && selectedContact && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl border-l transform transition-transform duration-200 ease-in-out overflow-y-auto">
          <div className="p-6">
            {/* Sidebar Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Contact Details</h2>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={handleSidebarClose}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-medium">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedContact.name}</h3>
                  <p className="text-gray-600">{selectedContact.jobTitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Company</h4>
                  <p className="text-gray-900">{selectedContact.company}</p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Location</h4>
                  <p className="text-gray-900">{selectedContact.location}</p>
                </div>

                <div className="border-b pb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{selectedContact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{selectedContact.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Social</h4>
                  <a 
                    href={`https://${selectedContact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsInterface;