import { fetchCourseDetails } from "../Store/coursesSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BookOpen, BarChart, Target, UserCheck, ClipboardList } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Enroll = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const { courseDetails, loading } = useSelector((state) => state.courses);
    const course = courseDetails?.course;

    useEffect(() => {
        if (courseId) {
            dispatch(fetchCourseDetails(courseId));
        }
    }, [dispatch, courseId]);


    return (
        <div className="min-h-screen bg-gray-100 ">
            {/* Breadcrumbs */}
            <div className="p-4 pl-20">
                <nav className="text-sm">
                    <Link to="/" className="text-primary hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/courses" className="text-primary hover:underline">Courses</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-500">{loading ? <Skeleton width={100} /> : course?.course_name || "Course Name"}</span>
                </nav>
            </div>
            <div className="max-w-4xl mx-auto">

                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Hero Section */}
                    <div className="bg-gradient-to-r from-primary to-primary-light p-8 text-black">
                        <h1 className="text-3xl font-bold mb-2">
                            {loading ? <Skeleton width={200} /> : course?.course_name || "Course Name"}
                        </h1>
                        <p className="text-l">
                            {loading ? <Skeleton count={2} /> : course?.course_description || "Course description goes here."}
                        </p>
                    </div>

                    {/* Course Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                        {[{
                            icon: <BookOpen className="text-2xl text-primary mr-4" />,
                            label: "Course Level",
                            value: course?.course_level
                        }, {
                            icon: <BarChart className="text-2xl text-primary mr-4" />,
                            label: "Course Type",
                            value: course?.course_type
                        }, {
                            icon: <UserCheck className="text-2xl text-primary mr-4" />,
                            label: "Suitable Roles",
                            value: course?.roles
                        }].map((item, index) => (
                            <div key={index} className="flex items-center">
                                {item.icon}
                                <div>
                                    <h3 className="font-semibold text-gray-700">{item.label}</h3>
                                    <p className="capitalize">{loading ? <Skeleton width={150} /> : item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Course Objective Section */}
                    <div className="bg-gray-50 p-8 border-t border-gray-200">
                        <div className="flex items-start">
                            <Target className="text-2xl text-primary mr-4" />
                            <div>
                                <h3 className="font-semibold text-gray-700">Course Objective</h3>
                                <p>{loading ? <Skeleton width={200} /> : course?.course_objective}</p>
                            </div>
                        </div>
                    </div>

                    {/* Prerequisites Section */}
                    <div className="bg-gray-50 p-8 border-t border-gray-200">
                        <div className="flex items-start">
                            <ClipboardList className="text-2xl text-primary mr-4 mt-1" />
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Prerequisites</h3>
                                <p>{loading ? <Skeleton width={200} /> : course?.pre_requirments || "Basic Python knowledge"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Enrollment Button */}
                    <div className="p-8 flex justify-center">
                        {loading ?
                            <Skeleton width={70} height={20} />
                            :
                            <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center" disabled={loading}>
                                Enroll Now
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enroll;
