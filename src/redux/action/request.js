// Import Dependencies
import axios from 'axios';
import { toast } from 'react-toastify';
const GET_STATES_REQUEST = 'GET_STATES_REQUEST';
const GET_STATES_SUCCESS = 'GET_STATES_SUCCESS';

const GET_ACTIVITY_POINTS_SUCCESS = 'GET_POINST_SUCCESS';

const GET_POINTS_HISTORY_SUCCESS = 'GET_POINST_HISTORY_SUCCESS';

const GET_ALL_COURSE = 'GET_ALL_COURSE';
const GET_COURSE_DETAIL = 'GET_COURSE_DETAIL';
const GET_MY_ADD_TO_CART = 'GET_MY_ADD_TO_CART';

// const API_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = 'https://backend-bay-six-18.vercel.app';

const GET_LEAD_SUCCESS = 'GET_MY_LEAD_SUCCESS';
const GET_REQUEST_VEHICLE_STATE = 'GET_REQUEST_VEHICLE_STATE';

const GET_POLICY_BY_STATUS = 'GET_POLICY_BY_STATUS';

const GET_POLICY_BY_STAGE_AND_STATUS = 'GET_POLICY_BY_STAGE_AND_STATUS';

const GET_ALL_REQUEST_LIST = 'GET_ALL_REQUEST_LIST';
const GET_ALL_REQUEST_BYID = 'GET_ALL_REQUEST_BYID';
const GET_COURSE_VIDEO_LIST = 'GET_COURSE_VIDEO_LIST';
const GET_COMPANY_LIST = 'GET_COMPANY_LIST';
// const REACT_APP_API_BASE_URL = 'http://localhost:3000';
const REACT_APP_API_BASE_URL = 'https://backend-bay-six-18.vercel.app';

export const addRequest = (data) => async (dispatch) => {
  console.log(data, 'data');
  try {
    const token = localStorage.getItem('token'); // Replace with how you store/retrieve the token

    const response = await axios.post(`${API_BASE_URL}/request/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Add your token here
      },
    });

    if (response) {
      toast.success(response?.data?.message || 'Your Request has been created');
    }
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const fetchStates = (userId) => async (dispatch) => {
  dispatch({ type: GET_STATES_REQUEST }); // Dispatching request action
  try {
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic
    const response = await axios.get(
      `${API_BASE_URL}/request/states/?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data) {
      dispatch({ type: GET_STATES_SUCCESS, payload: response.data?.data });
    }
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getMyActivityPoints = (userId) => async (dispatch) => {
  dispatch({ type: GET_STATES_REQUEST }); // Dispatching request action
  try {
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic
    const response = await axios.get(
      `${API_BASE_URL}/request/get-activity-point/?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data) {
      dispatch({
        type: GET_ACTIVITY_POINTS_SUCCESS,
        payload: response.data?.data,
      });
    }
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getMyActivityHistory = (userId, obj) => async (dispatch) => {
  console.log('response', 'hhh9999999999999999999999999');

  try {
    const token = localStorage.getItem('token'); // Replace with your token retrieval logic

    // Convert the `obj` to query parameters
    const params = new URLSearchParams({
      userId,
      startDate: obj.startDate,
      endDate: obj.endDate,
    }).toString();

    let config = {
      method: 'get',
      url: `https://backend-bay-six-18.vercel.app/request/activity-point-history?${params}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);

    console.log(JSON.stringify(response.data), 'hhh9999999999999999999999999');

    // Dispatch action if data is present
    if (response.data) {
      dispatch({
        type: GET_POINTS_HISTORY_SUCCESS,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    return error;
  }
};

export const getCourse = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    let config = {
      method: 'get',
      url: `${API_BASE_URL}/course/list`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);
    // Dispatch action if data is present
    if (response.data) {
      dispatch({
        type: GET_ALL_COURSE,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getCourseById = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    let config = {
      method: 'get',
      url: `${API_BASE_URL}/course/get-by-id?id=${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);
    // Dispatch action if data is present
    if (response.data) {
      dispatch({
        type: GET_COURSE_DETAIL,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getMyAddToCartCourse = (status) => async (dispatch) => {
  try {
    // status may be "Pending" or "Paid"
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    let config = {
      method: 'get',
      url: `${API_BASE_URL}/add-to-card/get-all?userId=${userId}&status=${status}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);
    // Dispatch action if data is present
    console.log(response.data, 'response.data');
    if (response.data) {
      dispatch({
        type: GET_MY_ADD_TO_CART,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getMyPaidCourse = (status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    let config = {
      method: 'get',
      url: `${API_BASE_URL}/add-to-card/get-paid?userId=${userId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    console.log(response.data, 'response.data');
    if (response.data) {
      dispatch({
        type: "GET_MY_PAID_COURSE",
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};



export const uploadChallan = (id, data) => async (dispatch) => {
  try {
    console.log(data, 'data')
    const token = localStorage.getItem('token');
    let config = {
      method: 'patch',
      url: `${REACT_APP_API_BASE_URL}/add-to-card/upload-challan/?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      data: data,
      maxBodyLength: Infinity, // Match the cURL option
    };

    const response = await axios.request(config);

    if (response.data) {
      toast.success(
        response.data?.data?.message || 'Challan Uploaded Successfully'
      );
    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const removeMyAllCourse = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    let config = {
      method: 'delete',
      url: `${API_BASE_URL}/add-to-card/delete`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);
    // getMyAddToCartCourse('Pending')
    if (response.data) {
      toast.success(
        response?.data?.message || 'Course are removed from your cart'
      );
      // getMyAddToCartCourse('Pending')
    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const enrollCourseNow = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    let config = {
      method: 'post',
      url: `${API_BASE_URL}/add-to-card/add`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response, 'response');
    if (response.data) {
      toast.success(response?.data?.message);
    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getAllUserPaidCourse = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    let config = {
      method: 'get',
      url: `${API_BASE_URL}/add-to-card/get-paid-all?id=${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    if (response.data) {
      dispatch({
        type: "GET_MY_PAID_COURSE",
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

// redux/action/request.js

// Action to delete a lead
export const deleteLead = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `${REACT_APP_API_BASE_URL}/request/delete/?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      toast.success(
        response?.data?.message || 'Request deleted updated successfully'
      );
    }
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const updateLead = (data, id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${REACT_APP_API_BASE_URL}/request/update/?id=${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      toast.success(
        response?.data?.message || 'Your Request has been updated successfully'
      );
      localStorage.removeItem('vehicle3Data');
      localStorage.removeItem('formData');
      localStorage.removeItem('vehicle2Data');
      localStorage.removeItem('vehicleFormData');
      localStorage.removeItem('vehicleData');
      localStorage.removeItem('vehicleFormFiles');
    }
    return response;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};
export const saveVehicleData = (data) => ({
  type: 'SAVE_VEHICLE_DATA',
  payload: data,
});

export const getMyLead = (userId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams({
      userId,
    }).toString();

    let config = {
      method: 'get',
      url: `${REACT_APP_API_BASE_URL}/request/get-mine?${params}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);
    // Dispatch action if data is present
    if (response.data) {
      dispatch({
        type: GET_LEAD_SUCCESS,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
    return error;
  }
};

export const getMyLeadByCategory = (category) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const params = new URLSearchParams({
      userId,
      category: category,
    }).toString();

    let config = {
      method: 'get',
      url: `${REACT_APP_API_BASE_URL}/request/get-list-by-category?${params}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Execute Axios request
    const response = await axios.request(config);
    // Dispatch action if data is present
    if (response.data) {
      dispatch({
        type: GET_LEAD_SUCCESS,
        payload: response.data?.data,
      });
    }

    return response.data;
  } catch (error) {
    // Handle errors
    console.error(error);
    return error;
  }
};

export const getMyLeadByVehicleType = (year) => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');

    // Prepare the query parameters
    const params = new URLSearchParams({ year }).toString();

    // Axios configuration
    let config = {
      method: 'get',
      url: `${REACT_APP_API_BASE_URL}/request/get-request-by-vehicleType?${params}`,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      dispatch({
        type: GET_REQUEST_VEHICLE_STATE,
        payload: response.data?.data, // Ensure response format matches expectations
      });
    }

    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message); // Show error message
    return error;
  }
};

export const getMyPolicyByStatus = (years) => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');

    // Axios configuration
    let config = {
      method: 'get',
      url: `${REACT_APP_API_BASE_URL}/request/get-status-by-yaer?years=${[
        years,
      ]}`,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      dispatch({
        type: GET_POLICY_BY_STATUS,
        payload: response.data?.data, // Ensure response format matches expectations
      });
    }

    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message); // Show error message
    return error;
  }
};

export const getMyPolicyByStageStatus = () => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');
    // Axios configuration
    let config = {
      method: 'get',
      url: `${REACT_APP_API_BASE_URL}/request/get-stagewise-total-request`,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      dispatch({
        type: GET_POLICY_BY_STAGE_AND_STATUS,
        payload: response.data?.data, // Ensure response format matches expectations
      });
    }

    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message); // Show error message
    return error;
  }
};

export const getAllRequestList = () => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');
    // Axios configuration
    let config = {
      method: 'get',
      url: `${REACT_APP_API_BASE_URL}/request/get-list`,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      dispatch({
        type: GET_ALL_REQUEST_LIST,
        payload: response.data?.data, // Ensure response format matches expectations
      });
    }

    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    return error;
  }
};

export const getCompanyList = () => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');
    // Axios configuration
    let config = {
      method: 'get',
      url: `${REACT_APP_API_BASE_URL}/company/list`,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      dispatch({
        type: GET_COMPANY_LIST,
        payload: response.data?.data, // Ensure response format matches expectations
      });
    }

    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    return error;
  }
};

export const addVideo = (data) => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');
    // Axios configuration
    let config = {
      method: 'post',
      url: `${REACT_APP_API_BASE_URL}/video/add`,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      data: data,
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      toast.success(response.data?.message || 'Video added successfully'); // Show error message
    }

    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message); // Show error message
    return error;
  }
};

export const policyUploaded = (id, data) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    let config = {
      method: 'patch',
      url: `${REACT_APP_API_BASE_URL}/request/upload-policy/?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      data: data,
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      toast.success(response.data?.message || 'Policy Uploaded successfully'); // Show error message
    }
    dispatch({
      type: GET_ALL_REQUEST_BYID,
      payload: response.data?.data, // Ensure response format matches expectations
    });
    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message); // Show error message
    return error;
  }
};

export const getRequestById = (id) => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');

    // Axios configuration with the query parameter
    let config = {
      method: 'get',
      url: `${REACT_APP_API_BASE_URL}/course/get-by-id?id=${id}`, // Append 'id' as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      dispatch({
        type: GET_ALL_REQUEST_BYID,
        payload: response.data?.data, // Ensure response format matches expectations
      });
    }

    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    return error;
  }
};

export const deleteVideoById = (id) => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');
    let config = {
      method: 'delete',
      url: `${REACT_APP_API_BASE_URL}/video/remove-by-id?id=${id}`, // Append 'id' as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);
    if (response) {
      toast.success(response?.data?.message || 'Video deleted successfully'); // Show error message
    }

    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    return error;
  }
};

export const getVideosById = (id) => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');

    // Axios configuration with the query parameter
    let config = {
      method: 'get',
      url: `${REACT_APP_API_BASE_URL}/video/get-by-course-id?courseId=${id}`, // Append 'id' as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      dispatch({
        type: GET_COURSE_VIDEO_LIST,
        payload: response.data?.data, // Ensure response format matches expectations
      });
    }

    return response.data; // Return response for further use
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const addComment = (data) => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');
    // Axios configuration with the query parameter
    let config = {
      method: 'post',
      url: `${REACT_APP_API_BASE_URL}/comment/add`, // Append 'id' as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      data: data,
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response

    console.log(response, 'response');
    if (response?.data) {
      toast.success(response?.data?.message || 'Comment added successfully!'); // Show error message
    }

    return response.data; // Return response for further use
  } catch (error) {
    toast.error(error.response?.data?.message || error.message); // Show error message
    return error;
  }
};

export const varifyActivityPoint = (id) => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');

    // Axios configuration with the query parameter
    let config = {
      method: 'patch',
      url: `${REACT_APP_API_BASE_URL}/request/varified-payemnt/?requestId=${id}`, // Append 'id' as a query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      data: {},
      maxBodyLength: Infinity, // Match the cURL option
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response

    if (response?.data) {
      toast.success(response?.data?.message || 'Activity Points are varified'); // Show error message
    }

    return response.data; // Return response for further use
  } catch (error) {
    toast.error(error.response?.data?.message || error.message); // Show error message
    return error;
  }
};

export const searchRequestList = (body) => async (dispatch) => {
  try {
    // Extract the token from localStorage
    const token = localStorage.getItem('token');
    // Axios configuration
    let config = {
      method: 'post',
      url: `${REACT_APP_API_BASE_URL}/request/serach`,
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token as in the cURL
        'Content-Type': 'application/json', // Include content type (optional for GET requests)
      },
      data: body, // Use `data` for the request payload
      maxBodyLength: Infinity,
    };

    // Execute Axios request
    const response = await axios.request(config);

    // Dispatch action on successful response
    if (response.data) {
      dispatch({
        type: GET_ALL_REQUEST_LIST,
        payload: response.data?.data, // Ensure response format matches expectations
      });
    }

    return response.data; // Return response for further use
  } catch (error) {
    // Handle and log errors
    console.error(error);
    toast.error(error.response?.data?.message || error.message); // Show error message
    return error;
  }
};
