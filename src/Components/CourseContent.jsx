
// // import { useEffect, useState } from "react"

// // function transformData(data) {

// //     return data?.map(item => ({
// //         id: `${item.course_mastertitle_breakdown_id}-${item.course_subtitle_id}`,
// //         title: item.course_subtitle,
// //         content: item.subtitle_content.trim()
// //     }));


// // }

// // export default function CourseContent({ data, selectedContentId }) {
// //     const [courseContent, setCourseContent] = useState(transformData(data))
// //     useEffect(() => {
// //         setCourseContent(transformData(data))
// //     }, [data])


// //     const [currentContent, setCurrentContent] = useState(null)

// //     useEffect(() => {

// //         setCurrentContent(courseContent?.find((content) => content.id == selectedContentId))

// //     }, [courseContent, selectedContentId])

// //     const [currentContentId, setCurrentContentId] = useState(1)

// //     // const currentContent = courseContent?.find((content) => content.id === currentContentId)


// //     return (
// //         <div className="mt-6">
// //             <h2 className="text-2xl font-bold mb-4 text-primary">{currentContent?.title}</h2>
// //             <div className="prose max-w-none">
// //                 {currentContent?.content.split("\n\n").map((paragraph, index) => (
// //                     <p key={index} className="mb-4">
// //                         {paragraph}
// //                     </p>
// //                 ))}
// //             </div>
// //         </div>
// //     )
// // }


// import { useEffect, useState, useRef } from "react";

// function transformData(data) {
//     return data?.map(item => ({
//         id: `${item.course_mastertitle_breakdown_id}-${item.course_subtitle_id}`,
//         title: item.course_subtitle,
//         content: item.subtitle_content.trim(),
//         masterId: item.course_mastertitle_breakdown_id,
//         subtitleId: item.course_subtitle_id
//     }));
// }

// export default function CourseContent({ data, selectedContentId }) {
//     const [courseContent, setCourseContent] = useState(transformData(data));
//     const [currentContent, setCurrentContent] = useState(null);
//     const contentRef = useRef(null);

//     useEffect(() => {
//         setCourseContent(transformData(data));
//     }, [data]);

//     useEffect(() => {
//         setCurrentContent(courseContent?.find(content => content.id === selectedContentId));
//     }, [courseContent, selectedContentId]);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (contentRef.current) {
//                 const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
//                 const progress = Math.min(100, (scrollTop / (scrollHeight - clientHeight)) * 100);
//                 updateProgress(progress);
//             }
//         };

//         const updateProgress = (progress) => {
//             const user = JSON.parse(localStorage.getItem("user"));
//             if (user && currentContent) {
//                 fetch("https://lms-be-do05.onrender.com/api/course-progress", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({
//                         user_id: user.user_id,
//                         course_id: 1, // Update dynamically if needed
//                         course_subtitle_id: currentContent.subtitleId,
//                         course_mastertitle_breakdown_id: currentContent.masterId,
//                         course_progress: Math.round(progress),
//                         course_subtitle_progress: Math.round(progress),
//                     }),
//                 });
//             }
//         };

//         const contentDiv = contentRef.current;
//         if (contentDiv) {
//             contentDiv.addEventListener("scroll", handleScroll);
//         }

//         return () => {
//             if (contentDiv) {
//                 contentDiv.removeEventListener("scroll", handleScroll);
//             }
//         };
//     }, [currentContent]);

//     return (
//         <div ref={contentRef} className="mt-6 overflow-auto h-[80vh]">
//             <h2 className="text-2xl font-bold mb-4 text-primary">{currentContent?.title}</h2>
//             <div className="prose max-w-none">
//                 {currentContent?.content.split("\n\n").map((paragraph, index) => (
//                     <p key={index} className="mb-4">{paragraph}</p>
//                 ))}
//             </div>
//         </div>
//     );
// }

import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourseProgress } from "../Store/coursesSlice";
import { debounce } from "lodash";

function transformData(data) {
    return data?.map(item => ({
        id: `${item.course_mastertitle_breakdown_id}-${item.course_subtitle_id}`,
        title: item.course_subtitle,
        content: item.subtitle_content.trim(),
        masterId: item.course_mastertitle_breakdown_id,
        subtitleId: item.course_subtitle_id
    }));
}

export default function CourseContent({ data, courseProgress, selectedContentId }) {
    const dispatch = useDispatch();
    const progress = useSelector(state => state.courses.progress);
    const [courseContent, setCourseContent] = useState(transformData(data));
    const [currentContent, setCurrentContent] = useState(null);
    const contentRef = useRef(null);

    useEffect(() => {
        setCourseContent(transformData(data));
    }, [data]);

    useEffect(() => {
        setCurrentContent(courseContent?.find(content => content.id === selectedContentId));
    }, [courseContent, selectedContentId]);

    const updateProgress = useCallback(
        debounce((newProgress) => {
            if (currentContent) {
                const user = JSON.parse(localStorage.getItem("user"));
                dispatch(updateCourseProgress({
                    userId: user.user_id,
                    courseId: data[0].course_id, // Ensure this is dynamically updated if needed
                    subtitleId: currentContent.subtitleId,
                    masterId: currentContent.masterId,
                    progress: newProgress,
                    courseProgress: newProgress
                    // courseProgress: Math.min(100, Math.round(courseProgress.reduce((sum, d) => sum + d.course_subtitle_progress, 0)))
                }));

            }
        }, 500), // Debounce with 500ms delay
        [currentContent, dispatch]
    );

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = contentRef.current;

                let newProgress;
                if (scrollHeight <= clientHeight) {
                    newProgress = 100; // Auto-complete progress for short content
                } else {
                    newProgress = Math.min(100, (scrollTop / (scrollHeight - clientHeight)) * 100);
                }

                if (currentContent && (!progress[currentContent.subtitleId] || progress[currentContent.subtitleId] < newProgress)) {
                    updateProgress(newProgress);
                }
            }
        };

        const contentDiv = contentRef.current;
        if (contentDiv) {
            handleScroll(); // Check progress on mount
            contentDiv.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (contentDiv) {
                contentDiv.removeEventListener("scroll", handleScroll);
            }
            updateProgress.cancel(); // Cancel debounced calls on unmount
        };
    }, [currentContent, progress, updateProgress]);

    return (
        <div ref={contentRef} className="mt-6 overflow-auto h-[80vh]">
            <h2 className="text-2xl font-bold mb-4 text-primary">{currentContent?.title}</h2>
            <div className="prose max-w-none">
                {currentContent?.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                ))}
            </div>
        </div>
    );
}

