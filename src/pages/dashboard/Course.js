import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Ediit from '../../assets/icons/Ediit';
import Del from '../../assets/icons/Del';
import { ToastContainer, toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { Circles } from 'react-loader-spinner';
import {
  getCourseList,
  addCourse,
  deleteCourse,
  updateCourse,
  getRequestVerified,
} from '../../redux/action/auth';
import { getAllUserPaidCourse } from '../../redux/action/request';
import { useDispatch, useSelector } from 'react-redux';
import { Eye } from 'lucide-react';
const Course = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [courseLogo, setcourseLogo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { courseData } = useSelector((state) => state.auth);
  const { paidCourse } = useSelector((state) => state.auth);
  console.log(paidCourse, 'paidCourse');
  useEffect(() => {
    dispatch(getCourseList());
  }, [1000]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [1000]);
  const [editcourse, setEditcourse] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const handleEdit = (course) => {
    setPreview(course?.courseImage);
    setEditcourse(course);
  };

  const handleView = (id) => {
    setCourseId(id);
    dispatch(getAllUserPaidCourse(id));
  };

  const handleSaveEdit = () => {
    const data = {
      courseName: editcourse?.title,
      courseImage: editcourse?.courseImage || preview,
      ...editcourse,
    };
    dispatch(updateCourse(data, editcourse?._id));
    setTimeout(() => dispatch(getCourseList()), 4000);
    setEditcourse(null);
  };
  const handleExport = () => {
    const exportData = courseData?.map((data) => ({
      _id: data._id,
      name: data?.courseName,
      logo: data?.courseLogo,
      createdAt: data?.createdAt,
    }));

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert the modified JSON data into a worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Requests Data');

    // Generate and download the Excel file
    XLSX.writeFile(wb, `course_list.xlsx`);
  };

  const [formData, setFormData] = useState({
    title: '',
    courseImage: '',
    courseTag: [],
    courseType: '',
    definition: '',
    description: '',
    duration: '',
    language: '',
    outLine: [],
    prize: '',
    skill: '',
    subject: '',
    discription: '',
    defination: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files.length > 0) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [name]: reader.result, // Store Base64 for file input
        }));
      };

      reader.readAsDataURL(files[0]); // Convert to Base64
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Store value for text, number, email, etc.
      }));
    }
  };


  const handleSubmit = (e) => {
    console.log(formData, 'formData');
    e.preventDefault();
    if (formData.title && (formData.courseImage || preview)) {
      const data = {
        courseImage: formData?.courseLogo || formData?.courseImage || preview,
        ...formData,
      };

      dispatch(addCourse(data));
      setIsModalOpen(false);
      setTimeout(() => dispatch(getCourseList()), 2000);
      setFormData({
        title: '',
        courseImage: '',
        courseTag: [],
        courseType: '',
        definition: '',
        description: '',
        duration: '',
        language: '',
        outLine: [],
        prize: '',
        skill: '',
        subject: '',
        discription: '',
        defination: '',
      });
    } else {
      toast.error('Please fill both required fields');
    }
  };

  const [isToolTipOpen, setIsToolTipOpen] = useState(null);
  const openToolTip = (userId) => setIsToolTipOpen(userId);
  const closeToolTip = () => setIsToolTipOpen(null);
  const confirmDelete = (userId) => {
    dispatch(deleteCourse(userId));
    setTimeout(() => dispatch(getCourseList()), 2000);
    closeToolTip();
  };

  const [preview, setPreview] = useState(null);
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type == 'New') {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onloadend = () => {
          console.log(reader.result, 'reader.result');
          setPreview(reader.result);
          setFormData({ ...formData, courseImage: reader.result }); 
        };
      }
    } else {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result); 
          setEditcourse({ ...editcourse, courseImage: reader.result }); 
        };
      }
    }
  };

  const [previewForNew, setPreviewForNew] = useState(null);
  const handleTagInput = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      const newTag = e.target.value.trim(); 
      if (newTag) {
        setEditcourse((prev) => ({
          ...prev,
          courseTag: [...prev.courseTag, newTag],
        }));
        e.target.value = '';
      }
    }
  };
  const [formData2, setFormData2] = useState({
    courseTag: [],
  });

  const handleTagInput_2 = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag && !formData2.courseTag.includes(newTag)) {
        setFormData2((prev) => ({
          ...prev,
          courseTag: [...prev.courseTag, newTag],
        }));
        e.target.value = '';
      }
    }
  };

  const removeTag_2 = (tagToRemove) => {
    setFormData2((prev) => ({
      ...prev,
      courseTag: prev.courseTag.filter((tag) => tag !== tagToRemove),
    }));
  };

  const removeTag = (tagToRemove) => {
    setEditcourse((prev) => ({
      ...prev,
      courseTag: prev.courseTag.filter((tag) => tag !== tagToRemove),
    }));
  };

  useEffect(() => {
    console.log(preview);
  }, [preview]);
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <ToastContainer />

      {!loading ? (
        <>
          {' '}
          <div className='flex items-center justify-between bg-[#FFFFFF] p-2'>
            <h1 className='text-2xl font-bold'>course</h1>
            <div className='ml-auto flex items-center space-x-4'>
              <span
                onClick={() => handleExport()}
                className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg hover:bg-blue-600 hover:text-black transition-colors duration-300 ease-in-out cursor-pointer'
              >
                Export Excel
              </span>
              <button
                onClick={() => setIsModalOpen(true)}
                className='px-4 py-2 bg-[#1E90FE] text-white font-semibold rounded-lg hover:bg-blue-600 hover:text-black transition-colors duration-300 ease-in-out cursor-pointer'
              >
                Add course
              </button>
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto'>
              <thead className='text-gray-600 uppercase text-sm leading-normal'>
                <tr>
                  <th className='py-3 px-6 text-left'>Names</th>
                  <th className='py-3 px-6 text-left'>Mode</th>
                  <th className='py-3 px-6 text-left'>Added Date</th>
                  <th className='py-3 px-6 text-left'>Thumbinal</th>
                  <th className='py-3 px-6 text-left'>Video Uploaded</th>
                  <th className='py-3 px-6 text-left'>Enrollments</th>
                  <th className='py-3 px-6 '>Action</th>
                </tr>
              </thead>
              <tbody className='text-gray-700 text-sm'>
                {courseData?.map((obj, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                      }`}
                  >
                    <td className='py-3 px-6 text-left'>{obj.title}</td>
                    <td className='py-3 px-6 text-left'>
                      {' '}
                      <small className='bg-[#1E90FE] rounded p-1 text-[white]'>
                        {obj.courseType}
                      </small>
                    </td>
                    <td className='py-3 px-6 text-left'>
                      {new Date(obj.addedAt).toLocaleDateString('en-CA')}
                    </td>
                    <td className=' justify-center items-center text-center'>
                      {obj?.courseImage ? (
                        <button
                          onClick={() => {
                            setcourseLogo(obj?.courseImage);
                            setIsOpen(true);
                          }}
                        >
                          <img
                            className='w-10 h-10 cursor-pointer relative left-5'
                            src={obj.courseImage}
                            alt='No course Thumbnail'
                          />
                        </button>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className=' justify-center items-center text-center'>
                      {obj?.videos ? <span>{obj?.videos?.length}</span> : ''}
                    </td>
                    <td className=' justify-center items-center text-center'>
                      <button
                        className='text-green-500 hover:text-green-700'
                        onClick={() => handleView(obj?._id)}
                      >
                        <Eye />
                      </button>
                    </td>

                    <td className='py-3 px-6 text-center flex justify-center space-x-4 relative'>
                      <button
                        className='text-green-500 hover:text-green-700'
                        onClick={() => handleEdit(obj, index)}
                      >
                        <Ediit />
                      </button>
                      <button
                        className='text-red-500 hover:text-red-700'
                        onClick={() => openToolTip(obj._id)}
                      >
                        <Del />
                      </button>

                      {/* Tooltip */}
                      {isToolTipOpen === obj._id && (
                        <div className='absolute top-10 left-[-40px] mt-2 bg-white p-4 rounded shadow-lg border z-[9999]'>
                          <p className='text-gray-700'>
                            Do you really want to delete this course?
                          </p>
                          <div className='flex justify-between mt-4'>
                            <button
                              className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'
                              onClick={closeToolTip}
                            >
                              Cancel
                            </button>
                            <button
                              className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                              onClick={() => confirmDelete(obj._id)}
                            >
                              OK
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isOpen && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-4 rounded-lg shadow-lg text-center'>
                <img
                  className='w-40 h-40 mx-auto my-4'
                  src={courseLogo}
                  alt='QR Code'
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className='text-center bg-red-500 text-white px-4 py-2 rounded-md'
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {isModalOpen && (
            <div
              className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
              onClick={() => setIsModalOpen(false)} // Close modal on outside click
            >
              <div
                onClick={(e) => e.stopPropagation()} // Prevent click from propagating
                className='bg-white rounded-lg shadow-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto'
              >
                <h2 className='text-xl font-bold mb-4'>Add Course</h2>
                <form
                  onSubmit={handleSubmit}
                  className='grid grid-cols-2 gap-4'
                >
                  {/* Course Title */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Course Title
                    </label>
                    <input
                      type='text'
                      name='title'
                      placeholder='Enter course title'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Course Type */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Course Type
                    </label>
                    <select
                      name='courseType'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.courseType}
                      onChange={handleChange}
                    >
                      <option value='Online'>Online</option>
                      <option value='Offline'>Offline</option>
                    </select>
                  </div>

                  {/* Course Image Upload (Full Width) */}
                  <div className='col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Course Image
                    </label>
                    <div className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center'>
                      <label
                        htmlFor='courseImage'
                        className='flex flex-col items-center space-y-2'
                      >
                        <input
                          type='file'
                          accept='.png, .jpg, .jpeg'
                          onChange={(e) => handleFileChange(e, 'New')}
                          className='hidden'
                          id='courseImage'
                        />
                        {preview ? (
                          <img
                            width={200}
                            height={200}
                            src={preview}
                            alt='Selected Course Image'
                          />
                        ) : (
                          <>
                            <p className='text-sm text-gray-500'>
                              Drag & drop or click to upload
                            </p>
                            <p className='text-xs text-gray-400'>
                              Only PNG, JPG, and JPEG files are supported.
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Course Tags (Full Width) */}
                  <div className='col-span-2'>
                    {/* Second Set of Tags */}
                    <label className='block text-sm font-medium text-gray-700 mb-1 mt-4'>
                      Course Tags
                    </label>
                    <div className='flex flex-wrap gap-2 border p-2 rounded-lg'>
                      {/* Display existing tags for the second set */}
                      {formData2?.courseTag?.map((tag, index) => (
                        <div
                          key={index}
                          className='flex items-center bg-green-500 text-white px-2 py-1 rounded-lg space-x-2'
                        >
                          <span>{tag}</span>
                          <button
                            type='button'
                            onClick={() => removeTag_2(tag)} // Remove tag from the second set
                            className='text-white text-sm'
                          >
                            ❌
                          </button>
                        </div>
                      ))}

                      {/* Input for adding new tags to the second set */}
                      <input
                        type='text'
                        placeholder='Type and press Space or Enter to add a tag'
                        onKeyDown={handleTagInput_2}
                        className='flex-grow p-2 outline-none'
                      />
                    </div>
                  </div>


                  {/* Duration */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Duration
                    </label>
                    <input
                      type='text'
                      name='duration'
                      placeholder='Enter duration (e.g., 1 month)'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData?.duration}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Language */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Language
                    </label>
                    <input
                      type='text'
                      name='language'
                      placeholder='Enter language (e.g., English/Urdu)'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.language}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Defination
                    </label>
                    <input
                      type='text'
                      name='defination'
                      placeholder='Enter language (e.g., English/Urdu)'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData?.defination}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Subject
                    </label>
                    <input
                      type='text'
                      name='subject'
                      placeholder='Enter language (e.g., English/Urdu)'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData?.subject}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Skill Level */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Skill Level
                    </label>
                    <select
                      name='skill'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.skill}
                      onChange={handleChange}
                    >
                      <option value='Beginner'>Beginner</option>
                      <option value='Intermediate'>Intermediate</option>
                      <option value='Advanced'>Advanced</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Price (PKR)
                    </label>
                    <input
                      type='number'
                      name='prize'
                      placeholder='Enter price'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.prize}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Description (Full Width) */}
                  <div className='col-span-2'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Description
                    </label>
                    <textarea
                      name='discription'
                      rows='3'
                      placeholder='Enter course description'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.discription}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Launched Date
                    </label>
                    <input
                      type='date'
                      name='launchedDate'
                      placeholder='Enter price'
                      className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                      value={formData.launchedDate}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Buttons (Full Width, Centered) */}
                  <div className='col-span-2 flex justify-end space-x-2'>
                    <button
                      type='button'
                      onClick={() => setIsModalOpen(false)}
                      className='px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                    >
                      Add Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {editcourse && (
            <div
              className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
              onClick={() => setEditcourse(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                className='bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto'
              >
                <h2 className='text-xl font-bold mb-4'>Edit Course</h2>

                <form onSubmit={handleSaveEdit}>
                  <div className='grid grid-cols-2 gap-4'>
                    {/* Course Name */}
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-medium'>
                        Course Name
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                        value={editcourse.title}
                        onChange={(e) =>
                          setEditcourse({
                            ...editcourse,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Course Type */}
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-medium'>
                        Course Type
                      </label>
                      <select
                        className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                        value={editcourse.courseType}
                        onChange={(e) =>
                          setEditcourse({
                            ...editcourse,
                            courseType: e.target.value,
                          })
                        }
                      >
                        <option value='Online'>Online</option>
                        <option value='Physical'>Physical</option>
                      </select>
                    </div>

                    {/* Price */}
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-medium'>
                        Price (PKR)
                      </label>
                      <input
                        type='number'
                        className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                        value={editcourse.prize}
                        onChange={(e) =>
                          setEditcourse({
                            ...editcourse,
                            prize: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Duration */}
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-medium'>
                        Duration
                      </label>
                      <input
                        type='text'
                        name='duration'
                        className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                        value={editcourse.duration}
                        onChange={(e) =>
                          setEditcourse({
                            ...editcourse,
                            duration: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className='mb-4'>
                      <label className='block text-gray-700 font-medium'>
                        Launched Date
                      </label>
                      <input
                        type='date'
                        name='launchedDate'
                        className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                        value={editcourse.launchedDate}
                        onChange={(e) =>
                          setEditcourse({
                            ...editcourse,
                            launchedDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className='col-span-2'>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Course Tags
                      </label>
                      <div className='flex flex-wrap gap-2 border p-2 rounded-lg'>
                        {/* Display existing tags */}
                        {editcourse?.courseTag?.map((tag, index) => (
                          <div
                            key={index}
                            className='flex items-center bg-blue-500 text-white px-2 py-1 rounded-lg space-x-2'
                          >
                            <span>{tag}</span>
                            <button
                              type='button'
                              onClick={() => removeTag(tag)}
                              className='text-white text-sm'
                            >
                              ❌
                            </button>
                          </div>
                        ))}

                        {/* Input for adding new tags */}
                        <input
                          type='text'
                          placeholder='Type and press Space to add a tag'
                          onKeyDown={handleTagInput}
                          className='flex-grow p-2 outline-none'
                        />
                      </div>
                    </div>

                    {/* Language */}
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-medium'>
                        Language
                      </label>
                      <input
                        type='text'
                        className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                        value={editcourse.language}
                        onChange={(e) =>
                          setEditcourse({
                            ...editcourse,
                            language: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Skill Level */}
                    <div className='mb-4'>
                      <label className='block text-gray-700 font-medium'>
                        Skill Level
                      </label>
                      <select
                        className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                        value={editcourse.skill}
                        onChange={(e) =>
                          setEditcourse({
                            ...editcourse,
                            skill: e.target.value,
                          })
                        }
                      >
                        <option value='Beginner'>Beginner</option>
                        <option value='Intermediate'>Intermediate</option>
                        <option value='Advanced'>Advanced</option>
                      </select>
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Course Thumbnail
                    </label>
                    <div className='cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center'>
                      <label
                        htmlFor='courseImage'
                        className='flex flex-col items-center space-y-2'
                      >
                        <input
                          type='file'
                          accept='.png, .jpg, .jpeg'
                          onChange={(e) => handleFileChange(e)}
                          className='hidden'
                          id='courseImage'
                        />
                        {preview || editcourse?.courseImage ? (
                          <img
                            width={200}
                            height={200}
                            src={preview || editcourse?.courseImage}
                            alt='Course Thumbnail'
                          />
                        ) : (
                          <>
                            <p className='text-sm text-gray-500'>
                              Drag & drop or click to upload
                            </p>
                            <p className='text-xs text-gray-400'>
                              Only PNG, JPG, and JPEG files are supported.
                            </p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Description */}
                  <div className='mb-4'>
                    <label className='block text-gray-700 font-medium'>
                      Description
                    </label>
                    <textarea
                      className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                      rows='3'
                      value={editcourse?.discription}
                      onChange={(e) =>
                        setEditcourse({
                          ...editcourse,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className='mb-4'>
                    <label className='block text-gray-700 font-medium'>
                      Subject
                    </label>
                    <textarea
                      className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                      rows='3'
                      value={editcourse?.subject}
                      onChange={(e) =>
                        setEditcourse({
                          ...editcourse,
                          subject: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className='mb-4'>
                    <label className='block text-gray-700 font-medium'>
                      Defination
                    </label>
                    <textarea
                      className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
                      rows='3'
                      value={editcourse?.defination}
                      onChange={(e) =>
                        setEditcourse({
                          ...editcourse,
                          defination: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Buttons */}
                  <div className='flex justify-end space-x-2'>
                    <button
                      type='button'
                      onClick={() => setEditcourse(null)}
                      className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {courseId && (
            <div
              className='fixed inset-0 flex items-center w-500 justify-center bg-black bg-opacity-50 z-50'
              onClick={() => setEditcourse(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                className='bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto'
              >
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-xl font-bold'>Review Course Request</h2>
                  <button onClick={() => setCourseId(null)}>
                    <X className='w-7 h-7 text-red-500 cursor-pointer hover:text-red-700' />
                  </button>
                </div>

                <div className='overflow-x-auto'>
                  <table className='min-w-full border border-gray-300'>
                    <thead className='bg-gray-100'>
                      <tr>
                        <th className='border p-2'>User</th>
                        <th className='border p-2'>Phone</th>
                        <th className='border p-2'>Paid Challan</th>
                        <th className='border p-2'>Uploaded Date</th>
                        <th className='border p-2'>Verification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paidCourse.length > 0 ? (
                        paidCourse.map((data, index) => (
                          <tr
                            key={data._id}
                            className='text-center border-b'
                          >
                            <td className='border p-2 flex items-center space-x-2'>
                              <img
                                src={data.userDetails?.profilePhoto}
                                alt='Profile'
                                className='w-10 h-10 rounded-full object-cover'
                              />
                              <span className='text-gray-800 font-medium'>
                                {data.userDetails?.name}
                              </span>
                            </td>

                            <td className='border p-2'>
                              {data.userDetails?.phone}
                            </td>

                            <td className='border p-2'>
                              <a
                                href={data.paidChallan}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-500 underline'
                              >
                                View
                              </a>
                            </td>

                            <td className='border p-2'>
                              {new Date(data.uploadedAt).toLocaleString(
                                'en-US',
                                {
                                  year: 'numeric',
                                  month: 'short',
                                  day: '2-digit',
                                  hour12: true,
                                }
                              )}
                            </td>

                            <td className='border p-2'>
                              <button>
                                {data.status == 'Pending' ? (
                                  <span
                                    className='bg-red-500 text-white rounded p-1'
                                    onClick={() => {
                                      dispatch(getRequestVerified(data?._id));
                                      setTimeout(() => {
                                        dispatch(
                                          getAllUserPaidCourse(courseId)
                                        );
                                      }, [2000]);
                                    }}
                                  >
                                    Verify Now
                                  </span>
                                ) : (
                                  <span className='bg-green-500 text-white rounded p-1'>
                                    Verified
                                  </span>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan='5'
                            className='text-center p-4 text-gray-500'
                          >
                            No User Request for this Course
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Circles
            height='40'
            width='40'
            color='#1E90FF'
            ariaLabel='loading'
          />
        </div>
      )}
    </div>
  );
};

export default Course;
