// Import Dependencies
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../config/firebaseConfig'; // Import the auth object
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { routes } from '../../contant';

const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
const GET_REDY_QUIZ = 'GET_REDY_QUIZ';
const GET_REDY_QUIZ_RESULT = 'GET_REDY_QUIZ_RESULT';


// const API_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = 'https://backend-bay-six-18.vercel.app';
const GET_EMPLOYEE_DATA = 'GET_EMPLOYEE_DATA';
const GET_USER_LIST = 'GET_USER_LIST';
const GET_ADMIN_NOTIFICATION = 'GET_ADMIN_NOTIFICATION';
const GET_USER_NOTIFICATION = 'GET_USER_NOTIFICATION';
const GET_ADMIN_UNREAD_NOTIFICATION='GET_ADMIN_UNREAD_NOTIFICATION';
const GET_COURSE_DATA='GET_COURSE_DATA';
// const REACT_APP_API_BASE_URL = 'http://localhost:3000';
const REACT_APP_API_BASE_URL =  'https://backend-bay-six-18.vercel.app'
// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.baseURL = 'https://backend-bay-six-18.vercel.app';

export const completeProfile = (data) => async (dispatch) => {
  const email = localStorage.getItem('registerMail');
  try {
    const response = await axios.post(`${API_BASE_URL}/users/profile-detail`, {
      email,
      ...data,
    });
    if (response) {
      toast.success(
        response?.data?.message || 'Congratulation your profile is setup now!'
      );
    }
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

export const firebaseResetPasswordEmail = (email) => async (dispatch) => {
  try {
    const userCredential = await sendPasswordResetEmail(auth, email);
    return userCredential;
  } catch (error) {
    return error;
  }
};

export const resetPassword = (password, navigate) => async (dispatch) => {
  try {
    const email = localStorage.getItem('userEmail');
    const response = await axios.patch(`${API_BASE_URL}/users/reset-password`, {
      email,
      password,
    });

    if (response) {
      toast.success(response?.data?.message || 'Password change successfully');
      setTimeout(() => {
        navigate(routes.signin);
      }, 2000);
    }
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

export const getProfile = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const response = await axios.get(
      `${API_BASE_URL}/users/get-by-id/?id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token here
        },
      }
    );

    dispatch({ type: GET_PROFILE_SUCCESS, payload: response?.data?.data });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const editProfile = (data) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    delete data.password;
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${API_BASE_URL}/users/edit-profile/?id=${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token here
        },
      }
    );

    dispatch({ type: GET_PROFILE_SUCCESS, payload: response?.data?.data });
    toast.success(response?.data?.message || 'Profile updated successfully');
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.message);
  }
};

const firebaseVarifyEmail = async (email, password = '12345678') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let res = await sendEmailVerification(userCredential.user);
    return res;
  } catch (error) {
    return error;
  }
};

export const addAccount = (formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/users/account-setup`,
      formData
    );
    if (response) {
      firebaseVarifyEmail(formData?.email);
      toast.success(response?.data?.message || 'Account created successfully!');
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

export const getReadyQuiz = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quiz/get-list?type=Entry Test`);
    dispatch({ type: GET_REDY_QUIZ, payload: response?.data?.data });
    return response;
  } catch (error) {
    return error;
  }
};

export const getReadyMarks = (userAnswers) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/quiz/get-marks-ready?type=Entry Test`, // URL with query parameters
      { userAnswers } // Send the userAnswers array in the body
    );    
    dispatch({ type: GET_REDY_QUIZ_RESULT, payload: response?.data?.data });
    return response;
  } catch (error) {
    return error;
  }
};




export const login = (formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_API_BASE_URL}/users/login`, formData);
    if (response?.data?.status) {
      localStorage.setItem('token', response?.data?.data?.token);
      localStorage.setItem('userId', response?.data?.data?.user?._id);
      localStorage.setItem('userType', response?.data?.data?.user?.userType);


      console.log(response?.data?.data?.user?.userType, response?.data)
      if (response?.data?.data?.user?.userType == 'Student') {
        setTimeout(() => {
          navigate(routes.main);
        }, 2000);
        toast.success(response?.data?.data?.message || 'Login Successfull');

      }
      if (response?.data?.data?.user?.userType == 'Admin') {
        setTimeout(() => {
          navigate(routes.adminDashboard);
        }, 2000);
        toast.success(response?.data?.data?.message || 'Login Successfull');

      }

    } else {
      toast.error(response?.data?.message);
    }
    return response;
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};







export const sendSignupLink =
  (email, userType = 'ProLeadPartner') =>
  async (dispatch) => {
    localStorage.setItem('userEmail', email);
    try {
      const response = await axios.post(`/users/varify-email`, {
        email,
        userType,
      });
      if (response) {
        firebaseVarifyEmail(email);
        toast.success(response?.data?.message || 'Verification email sent');
      }
      return response;
    } catch (error) {
      toast.error(error.message);
      return error;
    }
  };




export const getAdminUnReadNotification = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${REACT_APP_API_BASE_URL}/notify/get-admin-unread-messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_ADMIN_UNREAD_NOTIFICATION, payload: response?.data?.data });

    dispatch({ type: GET_ADMIN_NOTIFICATION, payload: response?.data?.data });
  } catch (error) {
    return error;
  }
};

export const getUserUnReadNotification = () => async (dispatch) => {
  try {
    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${REACT_APP_API_BASE_URL}/notify/get-my-unread-messages?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_USER_NOTIFICATION, payload: response?.data?.data });
  } catch (error) {
    return error;
  }
};

export const deActiveAdminNotification = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${REACT_APP_API_BASE_URL}/notify/admin-read-messages`,
      {}, // Empty body (if no data needs to be sent)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_ADMIN_NOTIFICATION, payload: response?.data?.data });
    toast.success('All your notification are mark as read');
  } catch (error) {
    return error;
    toast.error(error || 'Password change successfully');
  }
};

export const deActiveAdminSpecificNotification = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${REACT_APP_API_BASE_URL}/notify/admin-read-specific-message?Id=${id}`,
      {}, // Empty body (if no data needs to be sent)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success('All your notification are mark as read');
  } catch (error) {
    return error;
    toast.error(error || 'Password change successfully');
  }
};

export const deActiveUserNotification = () => async (dispatch) => {
  try {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${REACT_APP_API_BASE_URL}/notify/read-messages?userId=${userId}`,
      {}, // Empty body (if no data needs to be sent)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_USER_NOTIFICATION, payload: response?.data?.data });
    toast.success('All your notification are mark as read');
  } catch (error) {
    toast.error(error || 'All your notification are mark as read');
    return error;
  }
};

export const getAdminReadNotification = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${REACT_APP_API_BASE_URL}/notify/get-admin-read-messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_ADMIN_NOTIFICATION, payload: response?.data?.data });
  } catch (error) {
    return error;
  }
};
export const getUserReadNotification = () => async (dispatch) => {
  try {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${REACT_APP_API_BASE_URL}/notify/get-my-read-messages?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: GET_USER_NOTIFICATION, payload: response?.data?.data });
  } catch (error) {
    return error;
  }
};

export const getUserList = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${REACT_APP_API_BASE_URL}/users/list`, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token here
      },
    });

    const employee = [];

    for (let x = 0; x < response?.data?.data.length; x++) {
      if (response?.data?.data[x]?.userType == 'Employee') {
        employee.push(response?.data?.data[x]);
      }
    }
    dispatch({ type: GET_EMPLOYEE_DATA, payload: employee });
    dispatch({ type: GET_USER_LIST, payload: response?.data?.data });
  } catch (error) {
    return error;
  }
};


export const getCourseList= () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${REACT_APP_API_BASE_URL}/course/list`, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the token here
      },
    });
     dispatch({ type: GET_COURSE_DATA, payload: response?.data?.data });
  } catch (error) {
    return error;
  }
};

export const getRequestVerified = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.patch(
      `${REACT_APP_API_BASE_URL}/add-to-card/verify-request?id=${id}`,
      {}, // Empty object for PATCH request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Correctly passing token in headers
        },
      }
    );

    toast.success(response?.data?.message || 'User enrollment verified successfully');

  } catch (error) {
    console.error("Error verifying request:", error);
    return error;
  }
};



export const updateUser = (data, userId) => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    delete data.password;
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${REACT_APP_API_BASE_URL}/users/edit-profile/?id=${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token here
        },
      }
    );

    dispatch({ type: GET_PROFILE_SUCCESS, payload: response?.data?.data });
    toast.success(response?.data?.message || 'Profile updated successfully');
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    toast.error(error.message);
  }
};

export const updateCourse = (data, id) => async (dispatch) => {
  try {
    delete data.password;
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${REACT_APP_API_BASE_URL}/course/update-course/?id=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Set the token here
        },
      }
    );
    toast.success(response?.data?.message || 'Course updated successfully');
  } catch (error) {
    toast.error(error.message);
  }
};




export const submitAccount = (formData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${REACT_APP_API_BASE_URL}/users/account-setup`,
      formData
    );
    if (response) {
      toast.success(response?.data?.message || 'Account created successfully!');
      setTimeout(() => {
        navigate(routes.signin);
      }, 2000);
    }
  } catch (error) {
    toast.error(error.message);
    return error;
  }
};

export const getEmployee = () => async (dispatch) => {
  try {
    const response = await axios.get(`${REACT_APP_API_BASE_URL}/users/get-employees`);
    dispatch({ type: GET_EMPLOYEE_DATA, payload: response?.data?.data });
    return response;
  } catch (error) {
    return error;
  }
};



export const fetchVehicleRequests =
  (year = '2025') =>
  async (dispatch) => {
    try {
      // Dispatch a loading action if needed
      dispatch({ type: 'FETCH_VEHICLE_REQUESTS_REQUEST' });

      // Config for the Axios request
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}/request/get-request-by-vehicleType?year=${year}`,
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzU0NThjZDJmYzEwY2I3MWY1NzhiNDUiLCJpYXQiOjE3MzQ2MjI0NzEsImV4cCI6MTczNDYyNjA3MX0.eoFW9cqYFiWGVkefMwJc6mrkDvSGxp2kKQ_8CI1Ud0A',
        },
      };

      // Make the API request
      const response = await axios.request(config);

      // Dispatch a success action with the API response data
      dispatch({
        type: 'FETCH_VEHICLE_REQUESTS_SUCCESS',
        payload: response.data,
      });

      // Optional: Show a success toast
      toast.success('Vehicle requests fetched successfully');
    } catch (error) {
      // Dispatch a failure action with the error
      dispatch({
        type: 'FETCH_VEHICLE_REQUESTS_FAILURE',
        payload: error.message,
      });

      // Show an error toast
      toast.error(error.message);
    }
  };
export const fetchStatusByYears =
  (years = [2024, 2025, 2026, 2027]) =>
  async (dispatch) => {
    try {
      // Dispatch a loading action
      dispatch({ type: 'FETCH_STATUS_BY_YEARS_REQUEST' });

      // Config for the Axios request
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_BASE_URL}/request/get-status-by-yaer?years=${JSON.stringify(
          years
        )}`,
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzY0M2JlMWQyMjU3NWZlNjBmMjJiOWEiLCJpYXQiOjE3MzQ2MjYxNTQsImV4cCI6MTczNDYyOTc1NH0.W6AxCqZ4MKSQoPjBQxcl88R2t7xPYOISBVZIRyXwSOo',
        },
      };

      // Make the API request
      const response = await axios.request(config);

      // Dispatch a success action with the response data
      dispatch({
        type: 'FETCH_STATUS_BY_YEARS_SUCCESS',
        payload: response.data,
      });

      // Optional: Show a success toast
      toast.success('Statuses fetched successfully');
    } catch (error) {
      // Dispatch a failure action with the error
      dispatch({
        type: 'FETCH_STATUS_BY_YEARS_FAILURE',
        payload: error.message,
      });

      // Show an error toast
      toast.error(error.message);
    }
  };
export const fetchStagewiseTotalRequest = () => async (dispatch) => {
  try {
    // Dispatch a loading action
    dispatch({ type: 'FETCH_STAGEWISE_TOTAL_REQUEST_REQUEST' });

    // Axios request configuration
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_API_BASE_URL}/request/get-stagewise-total-request`,
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzU0NThjZDJmYzEwY2I3MWY1NzhiNDUiLCJpYXQiOjE3MzQyNDQ4NzYsImV4cCI6MTczNDI0ODQ3Nn0.eyqTyZTv8zDHHwvuMq8CTkcsKGqo_v5oAy9y9kt3Mrg',
      },
    };

    // Make the API call
    const response = await axios.request(config);

    // Dispatch success action with the response data
    dispatch({
      type: 'FETCH_STAGEWISE_TOTAL_REQUEST_SUCCESS',
      payload: response.data,
    });

    // Optional: Show a success toast
    toast.success('Stage-wise total requests fetched successfully');
  } catch (error) {
    // Dispatch failure action with the error message
    dispatch({
      type: 'FETCH_STAGEWISE_TOTAL_REQUEST_FAILURE',
      payload: error.message,
    });

    // Show an error toast
    toast.error(error.message);
  }
};


export const addCourse = (data) => async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_BASE_URL}/course/add`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    const response = await axios.request(config);
    getCourseList();
    if (response?.data?.data) {
      toast.success(
        response?.data?.data?.message || 'Course added successfully!'
      );
    }
  } catch (error) {
    return error;
  }
};
export const createEmployee = (data) => async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_BASE_URL}/users/create-employee`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    const response = await axios.request(config);
    getUserList();
    if (response?.data?.data) {
      toast.success(
        response?.data?.data?.message || 'Employee added successfully!'
      );
    }
  } catch (error) {
    return error;
  }
};

export const deleteUser = (id) => async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_BASE_URL}/users/delete-profile?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(config);
    getUserList();
    if (response?.data?.data) {
      toast.success(
        response?.data?.data?.message || 'User deleted successfully!'
      );
    }
  } catch (error) {
    toast.error(error || 'User deleted successfully!');
    return error;
  }
};
export const deleteLead = (leadId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `${REACT_APP_API_BASE_URL}/leads/delete-lead?id=${leadId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Dispatch success action after deleting the lead
    dispatch({ type: 'DELETE_LEAD_SUCCESS', payload: leadId });
    toast.success(response?.data?.message || 'Lead deleted successfully!');
  } catch (error) {
    toast.error(error?.message || 'Failed to delete lead');
    return error;
  }
};


export const deleteCourse = (id) => async () => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${REACT_APP_API_BASE_URL}/course/delete-course?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(config);
    getCourseList();
    if (response?.data?.data) {
      toast.success(
        response?.data?.data?.message || 'Course deleted successfully!'
      );
    }
  } catch (error) {
    toast.error(error || 'Course deleted successfully!');
    return error;
  }
};

