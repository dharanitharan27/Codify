import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useLoading } from "../components/loadingContext";
import { useTheme } from "../context/ThemeContext";
import { MdFeedback, MdDeleteOutline, MdSearch, MdEmail } from "react-icons/md";
import { FaSort, FaSortUp, FaSortDown, FaUser } from "react-icons/fa";

function AdminContacts() {
  const { authorizationToken, API } = useAuth();
  const [contacts, setContacts] = useState([]);
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setContacts(data);
      } 
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch contacts");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteContact = async(id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        setIsLoading(true);
        const response = await fetch(`${API}/admin/contacts/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          }
        });
        if(response.ok) {
          const data = await response.json();
          toast.success(data.message);
          fetchContacts();
        } else {
          toast.error("Contact not deleted!");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while deleting the contact");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered contacts
  const getSortedContacts = () => {
    let filteredContacts = [...contacts];
    
    // Apply search filter
    if (searchTerm) {
      filteredContacts = filteredContacts.filter(contact => 
        contact.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filteredContacts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredContacts;
  };

  const sortedContacts = getSortedContacts();

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="text-primary" />;
    if (sortConfig.direction === 'descending') return <FaSortDown className="text-primary" />;
    return <FaSort className="text-gray-400" />;
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-righteous flex items-center gap-2">
          <MdFeedback className="text-primary" />
          User Feedback
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search input */}
          <div className={`relative flex-grow max-w-md`}>
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border' 
                  : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
              } border focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary text-xl" />
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Total Feedback</p>
          <p className="text-2xl font-bold">{contacts.length}</p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Unique Users</p>
          <p className="text-2xl font-bold">
            {new Set(contacts.map(contact => contact.email)).size}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Latest Feedback</p>
          <p className="text-2xl font-bold">
            {contacts.length > 0 ? formatDate(contacts[0].createdAt) : 'None'}
          </p>
        </div>
      </div>
      
      {/* Contacts table */}
      <div className="overflow-x-auto rounded-lg border ${isDark ? 'border-dark-border' : 'border-light-border'}">
        <table className="w-full">
          <thead className={`${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'}`}>
            <tr>
              <th className="px-4 py-3 text-left">
                <button 
                  className="flex items-center gap-2 font-medium" 
                  onClick={() => requestSort('username')}
                >
                  <FaUser className="text-primary" />
                  Name {getSortIcon('username')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button 
                  className="flex items-center gap-2 font-medium" 
                  onClick={() => requestSort('email')}
                >
                  <MdEmail className="text-primary" />
                  Email {getSortIcon('email')}
                </button>
              </th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-center">
                <button 
                  className="flex items-center gap-2 font-medium justify-center" 
                  onClick={() => requestSort('createdAt')}
                >
                  Date {getSortIcon('createdAt')}
                </button>
              </th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedContacts.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center">
                  <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    No feedback found. {searchTerm && "Try a different search term."}
                  </p>
                </td>
              </tr>
            ) : (
              sortedContacts.map((contact, index) => (
                <tr 
                  key={contact._id} 
                  className={`
                    border-t ${isDark ? 'border-dark-border' : 'border-light-border'}
                    ${index % 2 === 0 
                      ? isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary' 
                      : isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'
                    }
                    hover:${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} transition-colors
                  `}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        {contact.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{contact.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{contact.email}</td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs overflow-hidden text-ellipsis">
                      {contact.message.length > 50 
                        ? `${contact.message.substring(0, 50)}...` 
                        : contact.message
                      }
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {formatDate(contact.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => deleteContact(contact._id)}
                        className={`
                          p-2 rounded-lg transition-colors
                          ${isDark 
                            ? 'bg-dark-bg-tertiary hover:bg-red-500/20 text-dark-text-primary' 
                            : 'bg-light-bg-tertiary hover:bg-red-500/20 text-light-text-primary'
                          }
                        `}
                        title="Delete feedback"
                      >
                        <MdDeleteOutline className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminContacts;



