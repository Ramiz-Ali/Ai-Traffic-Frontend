// Action types
const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
const GET_REDY_QUIZ = 'GET_REDY_QUIZ';
const GET_REDY_QUIZ_RESULT = 'GET_REDY_QUIZ_RESULT';

const GET_STATES_REQUEST = 'GET_STATES_REQUEST'; // New action type
const GET_STATES_SUCCESS = 'GET_STATES_SUCCESS'; // New action type
const GET_STATES_FAILURE = 'GET_STATES_FAILURE'; // New action type

const GET_ACTIVITY_POINTS_SUCCESS = 'GET_POINST_SUCCESS';
const GET_POINTS_HISTORY_SUCCESS = 'GET_POINST_HISTORY_SUCCESS';

const GET_ALL_COURSE = 'GET_ALL_COURSE';
const GET_COURSE_DETAIL = 'GET_COURSE_DETAIL';
const GET_MY_ADD_TO_CART = 'GET_MY_ADD_TO_CART';

const GET_EMPLOYEE_DATA = 'GET_EMPLOYEE_DATA';

const GET_COURSE_VIDEO_LIST = 'GET_COURSE_VIDEO_LIST';
const GET_REQUEST_VEHICLE_STATE = 'GET_REQUEST_VEHICLE_STATE';
const GET_POLICY_BY_STATUS = 'GET_POLICY_BY_STATUS';
const GET_POLICY_BY_STAGE_AND_STATUS = 'GET_POLICY_BY_STAGE_AND_STATUS';
const GET_USER_LIST = 'GET_USER_LIST';
const GET_COMPANY_LIST = 'GET_COMPANY_LIST';
const GET_ALL_REQUEST_BYID = 'GET_ALL_REQUEST_BYID';
const GET_COURSE_DATA = 'GET_COURSE_DATA';
const GET_ALL_REQUEST_LIST = 'GET_ALL_REQUEST_LIST';
const GET_ADMIN_NOTIFICATION = 'GET_ADMIN_NOTIFICATION';
const GET_USER_NOTIFICATION = 'GET_USER_NOTIFICATION';
const GET_ADMIN_UNREAD_NOTIFICATION = 'GET_ADMIN_UNREAD_NOTIFICATION';
const GET_MY_PAID_COURSE= 'GET_MY_PAID_COURSE'
// Initial state
const initialState = {
  course: [],
  courseDetail: {},
  pointsHistory: [],
  activityPoints: {},
  states: {},
  quiz: [],
  quizResult: {},
  profile: null,
  loading: false,
  error: '',
  linkSent: false,
  addToCartCourse: [],

  pointsHistory: [],
  userslist: [],
  requestById: {},
  allRequestList: [],
  activityPoints: {},
  requestVehicleStat: [],
  policy: [],
  requestByStatus: [],
  states: {},
  employee: [],
  profile: null,
  loading: false,
  error: '',
  linkSent: false,
  companyList: [],
  getAdminNotify: [],
  adminUnReadNotification: [],
  getUserNotify: [],
  courseData: [],
  courseVidosData: [],
  paidCourse:[]
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PAID_COURSE:
    return { ...state, loading: true, paidCourse: action.payload };
    case GET_COURSE_DATA:
      return { ...state, loading: true, courseData: action.payload };
    case GET_COURSE_VIDEO_LIST:
      return { ...state, loading: false, courseVidosData: action.payload };
    case GET_ADMIN_UNREAD_NOTIFICATION:
      return {
        ...state,
        loading: true,
        adminUnReadNotification: action.payload,
      };
    case GET_USER_NOTIFICATION:
      return { ...state, loading: true, getUserNotify: action.payload };
    case GET_ADMIN_NOTIFICATION:
      return { ...state, loading: true, getAdminNotify: action.payload };
    case GET_COMPANY_LIST:
      return { ...state, loading: true, companyList: action.payload };
    case GET_ALL_REQUEST_BYID:
      return { ...state, loading: true, requestById: action.payload };
    case GET_ALL_REQUEST_LIST:
      return { ...state, loading: true, allRequestList: action.payload };
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true, error: '' };
    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case GET_USER_LIST:
      return { ...state, loading: false, userslist: action.payload };

    case GET_EMPLOYEE_DATA:
      return { ...state, loading: false, employee: action.payload };
    case GET_POLICY_BY_STATUS:
      return { ...state, loading: false, policy: action.payload };
    case GET_POLICY_BY_STAGE_AND_STATUS:
      return { ...state, loading: false, requestByStatus: action.payload };
    case GET_REQUEST_VEHICLE_STATE:
      return { ...state, loading: false, requestVehicleStat: action.payload };
    case GET_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // New cases for fetching states
    case GET_STATES_REQUEST:
      return { ...state, loading: true, error: '' };

    case GET_STATES_SUCCESS:
      return { ...state, loading: false, states: action.payload };
    case GET_MY_ADD_TO_CART:
      return { ...state, loading: true, addToCartCourse: action.payload };
    case GET_PROFILE_REQUEST:
      return { ...state, loading: true, error: '' };
    case GET_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case GET_COURSE_DETAIL:
      return { ...state, loading: false, courseDetail: action.payload };
    case GET_REDY_QUIZ:
      return { ...state, loading: false, quiz: action.payload };
    case GET_REDY_QUIZ_RESULT:
      return { ...state, loading: false, quizResult: action.payload };
    case GET_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // New cases for fetching states
    case GET_STATES_REQUEST:
      return { ...state, loading: true, error: '' };

    case GET_STATES_SUCCESS:
      return { ...state, loading: false, states: action.payload };

    case GET_STATES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ACTIVITY_POINTS_SUCCESS:
      return { ...state, loading: false, activityPoints: action.payload };
    case GET_POINTS_HISTORY_SUCCESS:
      return { ...state, loading: false, pointsHistory: action.payload };
    case GET_ALL_COURSE:
      return { ...state, loading: false, course: action.payload };
    default:
      return state;
  }
};

export default authReducer;
