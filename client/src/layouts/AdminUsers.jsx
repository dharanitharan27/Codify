import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useLoading } from "../components/loadingContext";
import { useTheme } from "../context/ThemeContext";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrashAlt, FaUserShield, FaUser } from "react-icons/fa";
import { MdSearch, MdEmail, MdPhone } from "react-icons/md";

function AdminUsers() {
  const { authorizationToken, API } = useAuth();
  const [users, setUsers] = useState([]);
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setIsLoading(true);
        const response = await fetch(`${API}/admin/users/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        });
        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          fetchUsers();
        } else {
          toast.error("User not deleted!");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while deleting the user");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
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

  // Get sorted and filtered users
  const getSortedUsers = () => {
    let filteredUsers = [...users];
    
    // Apply search filter
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user => 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filteredUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredUsers;
  };

  const sortedUsers = getSortedUsers();

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="text-primary" />;
    if (sortConfig.direction === 'descending') return <FaSortDown className="text-primary" />;
    return <FaSort className="text-gray-400" />;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-righteous flex items-center gap-2">
          <FaUser className="text-primary" />
          User Management
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search input */}
          <div className={`relative flex-grow max-w-md`}>
            <input
              type="text"
              placeholder="Search users..."
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
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Admins</p>
          <p className="text-2xl font-bold">
            {users.filter(user => user.isAdmin).length}
          </p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Regular Users</p>
          <p className="text-2xl font-bold">
            {users.filter(user => !user.isAdmin).length}
          </p>
        </div>
      </div>
      
      {/* Users table */}
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
                  Username {getSortIcon('username')}
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
              <th className="px-4 py-3 text-left">
                <button 
                  className="flex items-center gap-2 font-medium" 
                  onClick={() => requestSort('phone')}
                >
                  <MdPhone className="text-primary" />
                  Phone {getSortIcon('phone')}
                </button>
              </th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center">
                  <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    No users found. {searchTerm && "Try a different search term."}
                  </p>
                </td>
              </tr>
            ) : (
              sortedUsers.map((user, index) => (
                <tr 
                  key={user._id} 
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
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.isAdmin 
                        ? 'bg-primary/20 text-primary' :
                        user.isReadOnlyAdmin ? 'bg-primary/40 text-primary'
                        : isDark ? 'bg-dark-bg-tertiary text-dark-text-secondary' : 'bg-light-bg-tertiary text-light-text-secondary'
                    }`}>
                      {user.isAdmin ? 'Admin' :user.isReadOnlyAdmin ? 'Read Only Admin': 'User'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link 
                        to={`/admin/users/${user._id}/edit`}
                        className={`
                          p-2 rounded-lg transition-colors
                          ${isDark 
                            ? 'bg-dark-bg-tertiary hover:bg-primary/20 text-dark-text-primary' 
                            : 'bg-light-bg-tertiary hover:bg-primary/20 text-light-text-primary'
                          }
                        `}
                        title="Edit user"
                      >
                        <FaEdit className="text-lg" />
                      </Link>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className={`
                          p-2 rounded-lg transition-colors
                          ${isDark 
                            ? 'bg-dark-bg-tertiary hover:bg-red-500/20 text-dark-text-primary' 
                            : 'bg-light-bg-tertiary hover:bg-red-500/20 text-light-text-primary'
                          }
                        `}
                        title="Delete user"
                      >
                        <FaTrashAlt className="text-lg" />
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

export default AdminUsers;



