import React, { useEffect, useState } from 'react'
import CourseNavigation from '../Components/CourseNavigation'
import CourseContent from '../Components/CourseContent'
import { fetchCourseContent, resetProgressUpdated, userCourseStatus } from '../Store/coursesSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';

const Course = () => {
    const { courseId } = useParams();
    const dispatch = useDispatch()
    const { courseContent, courseProgress, loading, courseStatus, progressUpdated } = useSelector((state) => state.courses);
    // const course = courseDetails?.course;

    const [currentProgress, setCurrentProgress] = useState(courseProgress)

    useEffect(() => {
        setCurrentProgress(courseProgress)
    }, [courseProgress])
    useEffect(() => {
        if (courseId) {
            const userId = JSON.parse(localStorage.getItem("user")).user_id
            dispatch(fetchCourseContent({ userId, courseId }));
        }
    }, [dispatch, courseId]);
    // const progressUpdated = useSelector((state) => state.course.progressUpdated);

    useEffect(() => {
        if (courseId) {
            const userId = JSON.parse(localStorage.getItem("user")).user_id
            dispatch(userCourseStatus({ userId, courseId }));
        }

        setTimeout(() => {
            dispatch(resetProgressUpdated())
        }, 100)
    }, [progressUpdated])
    const [selectedContentId, setSelectedContentId] = useState("1-1")

    useEffect(() => {
        const parent = document.querySelector("#parent")
        parent.scroll(0, 0)
    }, [selectedContentId])
    return (<>

        <div className="flex h-full bg-background">
            <aside className=" max-w-max bg-white overflow-auto  shadow-lg">
                <CourseNavigation courseStatus={courseStatus} courseProgress={currentProgress} content={courseContent} onContentSelect={setSelectedContentId} activeContentId={selectedContentId} />
            </aside>
            <main className="flex-1 p-6 overflow-hidden">
                <CourseContent courseProgress={currentProgress} data={courseContent} selectedContentId={selectedContentId} />
            </main>
        </div>

        {loading && (
            <div className="fixed inset-0 bg-white flex items-center justify-center">
                <Loader />
            </div>
        )}
    </>


    );

}

export default Course