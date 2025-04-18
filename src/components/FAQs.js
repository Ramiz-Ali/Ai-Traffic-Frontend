import React, { useState } from 'react';
import Header from './Header';
import Footer from './footur';

const FAQs = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6">
                <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
                            Frequently Asked Questions (FAQs)
                        </h1>

                        {/* Section 1: General Questions */}
                        <div className="mb-6">
                            <h2
                                className="text-xl font-semibold text-gray-800 cursor-pointer mb-2 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg hover:from-green-200 hover:to-green-300 transition-all duration-300 flex items-center justify-between"
                                onClick={() => toggleSection('general')}
                            >
                                <span>1. General Questions</span>
                                <span className="text-gray-700 transform transition-transform duration-300">
                                    {activeSection === 'general' ? '▼' : '▶'}
                                </span>
                            </h2>
                            {activeSection === 'general' && (
                                <ul className="space-y-4 pl-4 mt-4">
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q1: What is the Roshan Mustaqbil Hunarmand Program (RMHP)?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A1: RMHP is an initiative aimed at empowering individuals through skill-based
                                            training, scholarship opportunities, and various developmental programs to help
                                            them achieve professional and personal growth.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q2: Who can apply for RMHP programs?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A2: RMHP programs are open to individuals of all ages and educational
                                            backgrounds who are committed to learning and personal development. Specific
                                            eligibility criteria vary by program.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q3: What are the main objectives of RMHP?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A3: RMHP aims to:
                                            <ul className="list-disc list-inside ml-4">
                                                <li>Provide quality skill-based education.</li>
                                                <li>Facilitate career opportunities through internships and scholarships.</li>
                                                <li>Promote self-reliance and entrepreneurship.</li>
                                                <li>Support the community with sustainable and impactful initiatives.</li>
                                            </ul>
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q4: How can I stay updated about RMHP opportunities?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A4: You can follow RMHP on social media platforms, visit the official website,
                                            or subscribe to the newsletter for regular updates.
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Section 2: Program Enrollment */}
                        <div className="mb-6">
                            <h2
                                className="text-xl font-semibold text-gray-800 cursor-pointer mb-2 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg hover:from-green-200 hover:to-green-300 transition-all duration-300 flex items-center justify-between"
                                onClick={() => toggleSection('enrollment')}
                            >
                                <span>2. Program Enrollment</span>
                                <span className="text-gray-700 transform transition-transform duration-300">
                                    {activeSection === 'enrollment' ? '▼' : '▶'}
                                </span>
                            </h2>
                            {activeSection === 'enrollment' && (
                                <ul className="space-y-4 pl-4 mt-4">
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q5: How do I apply for RMHP programs?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A5: Visit the RMHP website and select the desired program. Fill out the online
                                            application form and submit the required documents.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q6: Is there an application fee?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A6: The application fee varies by program. Details will be provided in the
                                            program-specific guidelines.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q7: What happens after I submit my application?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A7: Once you submit your application, RMHP will review your eligibility and
                                            documentation. Shortlisted candidates will be notified via email or phone for
                                            further steps.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q8: Can I apply for multiple programs at the same time?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A8: Yes, you can apply for multiple programs, provided you meet the eligibility
                                            criteria for each.
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Section 3: Scholarships */}
                        <div className="mb-6">
                            <h2
                                className="text-xl font-semibold text-gray-800 cursor-pointer mb-2 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg hover:from-green-200 hover:to-green-300 transition-all duration-300 flex items-center justify-between"
                                onClick={() => toggleSection('scholarships')}
                            >
                                <span>3. Scholarships</span>
                                <span className="text-gray-700 transform transition-transform duration-300">
                                    {activeSection === 'scholarships' ? '▼' : '▶'}
                                </span>
                            </h2>
                            {activeSection === 'scholarships' && (
                                <ul className="space-y-4 pl-4 mt-4">
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q9: What types of scholarships are available under RMHP?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A9: RMHP offers several scholarships, including:
                                            <ul className="list-disc list-inside ml-4">
                                                <li>Study Abroad Scholarships</li>
                                                <li>Need-Based Scholarships</li>
                                                <li>Merit-Based Scholarships</li>
                                            </ul>
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q10: How do I qualify for a scholarship?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A10: Eligibility depends on academic performance, financial need, and the
                                            specific requirements of the scholarship program.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q12: Can I reapply if my scholarship application is rejected?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A12: Yes, you can reapply in the next cycle after addressing the feedback
                                            provided by RMHP.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q13: What types of training does RMHP provide?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A13: RMHP offers training in various fields, including:
                                            <ul className="list-disc list-inside ml-4">
                                                <li>Information Technology</li>
                                                <li>Vocational and Technical Skills</li>
                                                <li>Business and Entrepreneurship</li>
                                            </ul>
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q14: Are the training programs certified?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A14: Yes, RMHP provides internationally recognized certifications upon successful completion of the training programs.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q15: Can I access training materials online?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A15: Yes, RMHP provides an online Learning Management System (LMS) with access to training materials, assignments, and resources.
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Section 4: Internship and Employment Opportunities */}
                        <div className="mb-6">
                            <h2
                                className="text-xl font-semibold text-gray-800 cursor-pointer mb-2 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg hover:from-green-200 hover:to-green-300 transition-all duration-300 flex items-center justify-between"
                                onClick={() => toggleSection('internship')}
                            >
                                <span>4. Internship and Employment Opportunities</span>
                                <span className="text-gray-700 transform transition-transform duration-300">
                                    {activeSection === 'internship' ? '▼' : '▶'}
                                </span>
                            </h2>
                            {activeSection === 'internship' && (
                                <ul className="space-y-4 pl-4 mt-4">
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q16: Does RMHP offer internships?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A16: Yes, RMHP provides internship opportunities in collaboration with industry
                                            partners to help participants gain practical experience.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q17: How do I apply for an internship?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A17: Eligible participants can apply for internships through the RMHP portal by
                                            submitting an internship application form.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q18: Are internships paid?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A18: Most RMHP internships are paid, but this may vary depending on the organization
                                            or project.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q19: Will RMHP help me find a job after completing the program?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A19: Yes, RMHP’s career support team assists participants with job placements, resume
                                            building, and interview preparation.
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Section 5: Assan Schemes */}
                        <div className="mb-6">
                            <h2
                                className="text-xl font-semibold text-gray-800 cursor-pointer mb-2 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg hover:from-green-200 hover:to-green-300 transition-all duration-300 flex items-center justify-between"
                                onClick={() => toggleSection('assanSchemes')}
                            >
                                <span>5. Assan Schemes</span>
                                <span className="text-gray-700 transform transition-transform duration-300">
                                    {activeSection === 'assanSchemes' ? '▼' : '▶'}
                                </span>
                            </h2>
                            {activeSection === 'assanSchemes' && (
                                <ul className="space-y-4 pl-4 mt-4">
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q20: What are the Assan Schemes under RMHP?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A20: RMHP offers the following Assan Schemes:
                                            <ul className="list-disc list-inside ml-4">
                                                <li>Assan Laptop Scheme</li>
                                                <li>Assan Solar Scheme</li>
                                            </ul>
                                            These schemes aim to provide affordable tools and technologies to participants.
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q21: How do I apply for Assan Schemes?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A21: Submit an application through the RMHP website along with the required
                                            documents. Details about each scheme are available on the respective program pages.
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Section 6: Contact Us */}
                        <div>
                            <h2
                                className="text-xl font-semibold text-gray-800 cursor-pointer mb-2 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg hover:from-green-200 hover:to-green-300 transition-all duration-300 flex items-center justify-between"
                                onClick={() => toggleSection('contact')}
                            >
                                <span>6. Contact Us</span>
                                <span className="text-gray-700 transform transition-transform duration-300">
                                    {activeSection === 'contact' ? '▼' : '▶'}
                                </span>
                            </h2>
                            {activeSection === 'contact' && (
                                <ul className="space-y-4 pl-4 mt-4">
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q22: How can I contact RMHP for more information?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A24: You can reach out via:
                                            <ul className="list-disc list-inside ml-4">
                                                <li>Email: info@rmhp.org</li>
                                                <li>Phone: +92-XXX-XXXXXXX</li>
                                                <li>Office Hours: Monday to Friday, 9:00 AM to 5:00 PM</li>
                                            </ul>
                                        </span>
                                    </li>
                                    <li className="bg-green-50 p-4 rounded-lg shadow-sm">
                                        <strong className="text-gray-700">Q23: Is there a support center for technical issues?</strong>
                                        <br />
                                        <span className="text-gray-600">
                                            A25: Yes, RMHP provides technical support for LMS and other program-related
                                            queries. Contact support@rmhp.org for assistance.
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FAQs;