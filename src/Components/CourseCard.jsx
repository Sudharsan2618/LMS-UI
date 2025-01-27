import React from 'react';
import { formatDuration } from '../Utils/courseUtils';

// Sub-component to render rating stars
const RatingStars = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

// Main CourseCard component
const CourseCard = ({ course }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="p-6">
                <h3
                    title={course.course_name}
                    className="text-lg font-semibold mb-2 w-64 max-h-12 overflow-hidden line-clamp-1"
                >
                    {course.course_name}
                </h3>

                <p className=" min-h-10 text-gray-600 text-sm mb-4 w-64 max-h-12 overflow-hidden line-clamp-2">
                    {course.course_short_description}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{formatDuration(course.course_duration_hours, course.course_duration_minutes)}</span>
                    <span className={course.course_type === "free" ? "text-green-500" : "text-blue-500"}>
                        {course.course_type === "free" ? "Free" : "Subscription"}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${course.course_progress}%` }}
                        ></div>
                    </div>
                    <span className="text-sm text-gray-600">{course.course_progress}%</span>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex">
                <RatingStars rating={course.rating} />
                <span className="ml-2 text-sm text-gray-600">{course.rating.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default CourseCard;
