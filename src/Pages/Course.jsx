import React, { useEffect, useState } from 'react'
import CourseNavigation from '../Components/CourseNavigation'
import CourseContent from '../Components/CourseContent'
import { fetchCourseContent } from '../Store/coursesSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Course = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch()
    const { courseContent, loading } = useSelector((state) => state.courses);
    // const course = courseDetails?.course;
    useEffect(() => {
        if (courseId) {
            const userId = JSON.parse(localStorage.getItem("user")).user_id
            dispatch(fetchCourseContent({ userId, courseId }));
        }
    }, [dispatch, courseId]);
    const [selectedContentId, setSelectedContentId] = useState("1-1")

    useEffect(() => {
        const parent = document.querySelector("#parent")
        parent.scroll(0, 0)
    }, [selectedContentId])
    return (
        <div className="flex min-h-screen bg-background">
            <aside className="w-64 bg-secondary">
                <CourseNavigation content={courseContent} onContentSelect={setSelectedContentId} />
            </aside>
            <main className="flex-1 p-6">
                {/* <UserProgress /> */}
                <CourseContent data={courseContent} selectedContentId={selectedContentId} />
            </main>
        </div>
    )
}

export default Course