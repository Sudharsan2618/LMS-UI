
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
//                 fetch("http://54.209.80.251:5000/api/course-progress", {
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

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourseProgress } from "../Store/coursesSlice";
import { debounce } from "lodash";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark, tomorrow, solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";


function transformData(data) {
    return data?.map(item => ({
        id: `${item.course_mastertitle_breakdown_id}-${item.course_subtitle_id}`,
        title: item.course_subtitle,
        content: item.subtitle_content.trim(),
        masterId: item.course_mastertitle_breakdown_id,
        subtitleId: item.course_subtitle_id,
        code: item.subtitle_code,
        links: item.helpfull_links,
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
        contentRef.current.scrollTo(0, 0)

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
                    // courseProgress: newProgress
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

                console.log("call");
                // if (currentContent && (!progress[currentContent.subtitleId] || progress[currentContent.subtitleId] < newProgress)) {
                updateProgress(newProgress);
                // }
            }

        };

        const contentDiv = contentRef.current;
        if (contentDiv) {
            handleScroll(); // Check progress on mount
            contentDiv.addEventListener("scroll", handleScroll);
        }

        console.log(currentContent?.links?.split(","), "currentContent");


        return () => {
            if (contentDiv) {
                contentDiv.removeEventListener("scroll", handleScroll);
            }
            updateProgress.cancel(); // Cancel debounced calls on unmount
        };


    }, [currentContent, progress, updateProgress, selectedContentId]);


    return (
        <div ref={contentRef} id="scrollContent" className="mt-6 solai  overflow-auto h-[80vh] pb-5">
            <h2 className="text-2xl font-bold mb-4 text-primary">{currentContent?.title}</h2>
            <div className="prose max-w-none" >
                {currentContent?.content.split("\n\n").map((paragraph, index) => (
                    // <p key={index} className="mb-4">{paragraph}</p>

                    <ReactMarkdown key={index}
                        components={{
                            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4" {...props} />,
                            p: ({ node, ...props }) => <p className="mt-2 text-lg" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mt-2" {...props} />,
                            li: ({ node, ...props }) => <li className="mt-1 text-lg" {...props} />,
                            strong: ({ node, ...props }) => <strong className="text-gray-900 dark:text-gray-100" {...props} />
                        }}
                    >
                        {paragraph}
                    </ReactMarkdown>


                    // <ReactMarkdown>{paragraph}</ReactMarkdown>

                    // <p className="text-gray-700 dark:text-gray-300 p-4">
                    //     {paragraph.split("\n").map((line, index) => (
                    //         <React.Fragment key={index}>
                    //             {line}
                    //             <br />
                    //         </React.Fragment>
                    //     ))}
                    // </p>
                ))}
            </div>

            {currentContent?.code

                &&

                <div className=" max-w-max">
                    <h3 className="text-lg font-semibold my-4 text-gray-800 dark:text-white">Code</h3>
                    {currentContent?.code?.split("\n\n").map((code, index) => (
                        // <p key={index} className="mb-4">{code}</p>

                        // <div className=" bg-[#f2b55a] text-white mb-4 p-4 rounded-md shadow-md overflow-x-auto">
                        //     <pre className="whitespace-pre-wrap text-black font-mono text-sm">
                        //         {code}
                        //     </pre>
                        // </div>

                        <SyntaxHighlighter language="python" style={atomDark}>
                            {code}
                        </SyntaxHighlighter>

                    ))}
                </div>
            }


            {currentContent?.links &&
                <div className="max-w-max">
                    <h3 className="text-lg font-semibold my-4 text-gray-800 dark:text-white">Helpful Links</h3>


                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                        <ul className="mt-2 space-y-2">
                            {currentContent?.links?.split(",")?.map((link) => {
                                return <li key={link}>
                                    <a href={link} target="_blank"
                                        className="text-blue-600 hover:underline dark:text-blue-400">
                                        {link}
                                    </a>
                                </li>
                            })}
                        </ul>
                    </div>


                </div>
            }

        </div>
    );
}

