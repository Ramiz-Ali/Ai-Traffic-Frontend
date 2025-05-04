import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { routes } from '../../contant';
import { useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';
import { Pencil, Trash2 } from 'lucide-react';
import { auth, db } from '../../firebase';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const User = () => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [isToolTipOpen, setIsToolTipOpen] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate(routes.signin);
      } else {
        fetchUsers();
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        ...doc.data(),
        registerDate: doc.data().registerDate?.toDate() || new Date(),
      }));
      setUsersList(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users.', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    employeeCode: '',
  });

  useEffect(() => {
    let adminCount = 1;
    for (let x = 0; x < usersList.length; x++) {
      if (usersList[x]?.userType === 'Admin') adminCount += 1;
    }
    setFormData((prev) => ({ ...prev, employeeCode: `A00${adminCount}` }));
  }, [usersList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.employeeCode) {
      try {
        let adminCount = 1;
        for (let x = 0; x < usersList.length; x++) {
          if (usersList[x]?.userType === 'Admin') adminCount += 1;
        }

        const userDocRef = doc(db, 'users', formData.email); // Use email as temp ID, should be UID
        await setDoc(userDocRef, {
          name: formData.name,
          email: formData.email,
          userType: 'Admin',
          role: 'admin',
          registerDate: new Date(),
          employeeCode: formData.employeeCode,
        });
        toast.success('Admin created successfully!', { position: 'top-right' });
        setIsModalOpen(false);
        setFormData({
          name: '',
          email: '',
          password: '',
          employeeCode: `A00${adminCount + 1}`,
        });
        fetchUsers();
      } catch (error) {
        console.error('Error creating admin:', error);
        toast.error('Failed to create admin.', { position: 'top-right' });
      }
    } else {
      toast.error('Please fill in all required fields', { position: 'top-right' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (user) => setEditUser(user);

  const handleSaveEdit = async () => {
    if (editUser) {
      try {
        const userDocRef = doc(db, 'users', editUser._id);
        await updateDoc(userDocRef, {
          name: editUser.name,
          phone: editUser.phone,
          email: editUser.email,
          userType: editUser.userType,
          role: editUser.userType === 'Admin' ? 'admin' : 'user',
        });
        toast.success('User updated successfully!', { position: 'top-right' });
        fetchUsers();
        setEditUser(null);
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Failed to update user.', { position: 'top-right' });
      }
    }
  };

  const handleExport = () => {
    const exportData = usersList.map((data) => ({
      _id: data._id,
      email: data.email,
      phone: data.phone,
      address: data.address || '',
      verified: data.verified || false,
      userType: data.userType,
      registerDate: data.registerDate.toLocaleDateString(),
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, 'Users Data');
    XLSX.writeFile(wb, `users_list_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const openToolTip = (userId) => setIsToolTipOpen(userId);
  const closeToolTip = () => setIsToolTipOpen(null);
  const confirmDelete = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      toast.success('User deleted successfully!', { position: 'top-right' });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user.', { position: 'top-right' });
    }
    closeToolTip();
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate(routes.signin);
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout.', { position: 'top-right' });
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <ToastContainer />
      {!loading ? (
        <div className='space-y-6'>
          <div className='flex items-center justify-between bg-white p-4 rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold text-[#1a2a6c]'>Users</h1>
            <div className='flex space-x-4'>
              <button
                onClick={handleExport}
                className='px-4 py-2 bg-[#1a2a6c] text-white rounded-lg hover:bg-[#b21f1f] transition-colors duration-200'
              >
                Export to Excel
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className='px-4 py-2 bg-[#1a2a6c] text-white rounded-lg hover:bg-[#b21f1f] transition-colors duration-200'
              >
                Create Admin
              </button>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-[#1a2a6c] text-white'>
                  <tr>
                    <th className='py-3 px-6 text-left text-sm font-medium'>Name</th>
                    <th className='py-3 px-6 text-left text-sm font-medium'>Email</th>
                    <th className='py-3 px-6 text-left text-sm font-medium'>Type</th>
                    <th className='py-3 px-6 text-left text-sm font-medium'>Registration</th>
                    <th className='py-3 px-6 text-center text-sm font-medium'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {usersList.map((user, index) => (
                    <tr
                      key={index}
                      className={`transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } hover:bg-[#fdbb2d]/10`}
                    >
                      <td className='py-4 px-6 text-sm text-gray-900'>{user.name}</td>
                      <td className='py-4 px-6 text-sm text-gray-900'>{user.email}</td>
                      <td className='py-4 px-6 text-sm'>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            user.userType === 'Admin'
                              ? 'bg-[#1a2a6c] text-white'
                              : 'bg-[#b21f1f] text-white'
                          }`}
                        >
                          {user.userType}
                        </span>
                      </td>
                      <td className='py-4 px-6 text-sm text-gray-600'>
                        {user.registerDate.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td className='py-4 px-6 text-center'>
                        <div className='flex justify-center space-x-4 relative'>
                          <button
                            onClick={() => handleEdit(user)}
                            className='text-[#1a2a6c] hover:text-[#b21f1f] transition-colors'
                          >
                            <Pencil size={20} />
                          </button>
                          <button
                            onClick={() => openToolTip(user._id)}
                            className='text-[#b21f1f] hover:text-[#fdbb2d] transition-colors'
                          >
                            <Trash2 size={20} />
                          </button>
                          {isToolTipOpen === user._id && (
                            <div className='absolute top-10 right-0 z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200'>
                              <p className='text-sm text-gray-700 mb-3'>
                                Are you sure you want to delete this user?
                              </p>
                              <div className='flex justify-end space-x-2'>
                                <button
                                  onClick={closeToolTip}
                                  className='px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300'
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => confirmDelete(user._id)}
                                  className='px-3 py-1 text-white bg-[#b21f1f] rounded hover:bg-[#fdbb2d]'
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Edit User Modal */}
          {editUser && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-xl font-semibold text-[#1a2a6c] mb-4'>Edit User</h2>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Name</label>
                    <input
                      type='text'
                      className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
                      value={editUser.name}
                      onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Phone</label>
                    <input
                      type='text'
                      className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
                      value={editUser.phone || ''}
                      onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                      type='email'
                      className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
                      value={editUser.email}
                      onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>User Type</label>
                    <select
                      className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
                      value={editUser.userType}
                      onChange={(e) => setEditUser({ ...editUser, userType: e.target.value })}
                    >
                      <option value='Admin'>Admin</option>
                      <option value='Student'>Student</option>
                    </select>
                  </div>
                </div>
                <div className='flex justify-end mt-6 space-x-2'>
                  <button
                    onClick={() => setEditUser(null)}
                    className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className='px-4 py-2 bg-[#1a2a6c] text-white rounded-lg hover:bg-[#b21f1f] transition-colors'
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Create Admin Modal */}
          {isModalOpen && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
              <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-xl font-semibold text-[#1a2a6c] mb-4'>Add Admin</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <input
                      type='text'
                      name='name'
                      placeholder='Enter user name'
                      className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type='email'
                      name='email'
                      placeholder='Enter user email'
                      className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type='password'
                      name='password'
                      placeholder='Enter password'
                      className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a2a6c]'
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      name='employeeCode'
                      placeholder='Admin Code'
                      disabled
                      className='w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500'
                      value={formData.employeeCode}
                    />
                  </div>
                  <div className='flex justify-end space-x-2'>
                    <button
                      type='button'
                      onClick={() => setIsModalOpen(false)}
                      className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='px-4 py-2 bg-[#1a2a6c] text-white rounded-lg hover:bg-[#b21f1f] transition-colors'
                    >
                      Add User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className='mt-6 flex justify-end'>
            <button
              onClick={logout}
              className='px-4 py-2 bg-[#1a2a6c] text-white rounded-lg hover:bg-[#b21f1f] transition-colors duration-200'
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center h-64'>
          <Circles height='40' width='40' color='#1a2a6c' ariaLabel='loading' />
        </div>
      )}
    </div>
  );
};

export default User;