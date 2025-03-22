
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CourseCard from "../Components/CourseCard";

import {
    Linkedin, Github, User, Briefcase, MapPin, GraduationCap,
    Mail, Smartphone, Globe, Target, Award, Star, Book
} from "lucide-react";
import Certificates from "../Components/Certificates";
import Badges from "../Components/Badges";
import UserProfile from "../Components/UserProfile";

export default function StudentProfile() {
    const [activeTab, setActiveTab] = useState("Enrolled Courses");
    const [userDetails, setUserDetails] = useState({});
    const [userCourses, setUserCourses] = useState({});
    const [userBadges, setUserBadges] = useState({});
    const [userCertificates, setUserCertificates] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(true);

    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser).user_id;

    async function fetchUserDetails() {
        try {
            setLoading(true);
            const response = await fetch("https://lms-be-sqpa.onrender.com/api/userdetails", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId })
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            setUserDetails(data?.user_details?.user_details || {});
            setUserCourses(data?.user_details?.enrolled_courses || {});
            setUserBadges(data?.user_details?.user_badges || {});
            setUserCertificates(data?.user_details?.user_certifications || {});
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        setEditData(userDetails);
    }, [userDetails]);

    const handleInputChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch("https://lms-be-sqpa.onrender.com/api/userdetails/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editData)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            fetchUserDetails();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };

    const SkeletonLoader = () => (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <Skeleton height={120} className="mb-4" />
            <Skeleton height={20} width="80%" />
            <Skeleton height={20} width="60%" className="mt-2" />
        </div>
    );
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-300 flex justify-center items-center rounded-full mb-4">
                        {loading ? <Skeleton circle height={96} width={96} /> : <p className="text-5xl capitalize">{userDetails?.user_name?.charAt(0)}</p>}
                    </div>
                    <h2 className="text-xl font-bold text-center">
                        {loading ? <Skeleton width={120} /> : userDetails?.user_name}
                    </h2>
                    <p className="text-gray-500 mb-4 text-center">
                        {loading ? <Skeleton width={100} /> : userDetails?.job_title}
                    </p>
                    <div className="flex space-x-4 mb-4">
                        {loading ? (
                            <Skeleton width={80} />
                        ) : (
                            <>
                                <a href={userDetails?.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center space-x-2">
                                    <Linkedin size={20} />
                                    <span>LinkedIn</span>
                                </a>
                                <a href={userDetails?.github_profile} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center space-x-2">
                                    <Github size={20} />
                                    <span>GitHub</span>
                                </a>
                            </>
                        )}
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="text-md p-2 w-full md:w-[10vw] font-medium text-white bg-primary rounded-[5px] hover:bg-primary-dark transition-colors">
                        Edit Profile
                    </button>
                </div>

                {/* Profile Tabs */}
                <div className="col-span-3">
                    <div className="flex flex-wrap border-b">
                        {["Enrolled Courses", "Certificates", "Badges", "Profile Details"].map((tab) => (
                            <button key={tab} className={`px-6 py-2 ${activeTab === tab ? "border-b-2 border-primary" : "text-gray-500"}`} onClick={() => setActiveTab(tab)}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 p-4">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                                {[
                                    "user_name", "job_title", "city", "designation", "highest_qualification", "mail_id", "mobile_number", "portfolio_website"
                                ].map((field) => (
                                    <input
                                        key={field}
                                        type="text"
                                        name={field}
                                        value={editData[field] || ""}
                                        onChange={handleInputChange}
                                        placeholder={field.replace("_", " ").toUpperCase()}
                                        className="w-full border p-2 mb-4 rounded"
                                    />
                                ))}
                                <div className="flex justify-end space-x-2">
                                    <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                                    <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition">Save</button>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Tab Content */}
                    <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm mt-4">
                        {activeTab === "Enrolled Courses" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {loading
                                    ? Array(6)
                                        .fill(0)
                                        .map((_, index) => <SkeletonLoader key={index} />)
                                    : userCourses?.map((course) => (
                                        <CourseCard rate={false} key={course.course_id} course={course} />
                                    ))}
                                {!loading && userCourses.length === 0 && <p>No course found</p>}
                            </div>
                        )}

                        {activeTab === "Profile Details" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                {[
                                    { icon: User, label: "Age", value: userDetails?.age },
                                    { icon: Target, label: "Ambition", value: userDetails?.ambition },
                                    { icon: MapPin, label: "City", value: userDetails?.city },
                                    { icon: Briefcase, label: "Designation", value: userDetails?.designation },
                                    { icon: GraduationCap, label: "Highest Qualification", value: userDetails?.highest_qualification },
                                    { icon: Mail, label: "Email", value: userDetails?.mail_id },
                                    { icon: Smartphone, label: "Mobile", value: userDetails?.mobile_number },
                                    { icon: Globe, label: "Portfolio", value: userDetails?.portfolio_website },
                                    { icon: Book, label: "Work Experience", value: `${userDetails?.work_experience} years` },
                                    { icon: Award, label: "Badge", value: userDetails?.badge_name || "None" },
                                    { icon: Star, label: "Area of Interest", value: userDetails?.area_of_interest }
                                ].map((item, index) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded-[5px] shadow-md flex items-center">
                                        <item.icon size={24} className="mr-3 text-primary" />
                                        <div>
                                            <p className="text-sm text-gray-500">{item.label}</p>
                                            <p className="font-medium">{loading ? <Skeleton width={100} /> : item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>


                            // <UserProfile user={userDetails} />
                        )}

                        {activeTab === "Certificates" && <Certificates certificates={userCertificates} />}
                        {activeTab === "Badges" && <Badges badges={userBadges} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
