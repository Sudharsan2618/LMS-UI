// import { useEffect, useState } from "react"
// import { ChevronDown, ChevronRight } from "lucide-react"



// function transformCourseData(data) {
//     const courseMap = {};

//     data?.forEach(item => {
//         const { course_mastertitle_breakdown_id, course_mastertitle_breakdown, course_subtitle_id, course_subtitle } = item;
//         const uniqueSubtitleId = `${course_mastertitle_breakdown_id}-${course_subtitle_id}`;

//         if (!courseMap[course_mastertitle_breakdown_id]) {
//             courseMap[course_mastertitle_breakdown_id] = {
//                 id: course_mastertitle_breakdown_id,
//                 title: course_mastertitle_breakdown,
//                 subtitles: []
//             };
//         }

//         courseMap[course_mastertitle_breakdown_id].subtitles.push({
//             id: uniqueSubtitleId,
//             title: course_subtitle
//         });
//     });

//     return Object.values(courseMap);
// }

// export default function CourseNavigation({ content, onContentSelect }) {

//     const [courseStructure, setCourseStructure] = useState(transformCourseData(content))


//     useEffect(() => {
//         setCourseStructure(transformCourseData(content))

//     }, [content])


//     const [expandedSections, setExpandedSections] = useState([])

//     const toggleSection = (sectionId) => {
//         setExpandedSections((prev) =>
//             prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
//         )
//     }

//     return (
//         <nav className="p-4">
//             <h2 className="text-xl font-bold mb-4 text-primary">Course Contents</h2>
//             <ul>
//                 {courseStructure.map((section) => (
//                     <li key={section.id} className="mb-2">
//                         <button
//                             onClick={() => toggleSection(section.id)}
//                             className="flex items-center w-full text-left text-primary-foreground hover:text-primary"
//                         >
//                             {expandedSections.includes(section.id) ? (
//                                 <ChevronDown className="w-4 h-4 mr-2" />
//                             ) : (
//                                 <ChevronRight className="w-4 h-4 mr-2" />
//                             )}
//                             {section.title}
//                         </button>
//                         {expandedSections.includes(section.id) && (
//                             <ul className="ml-4 mt-1">
//                                 {section.subtitles.map((subtitle) => (
//                                     <li key={subtitle.id} className="my-1">


//                                         <button onClick={() => onContentSelect(subtitle.id)} className="text-sm text-primary-foreground hover:text-primary">
//                                             {subtitle.title}
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </nav>
//     )
// }

import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function transformCourseData(data) {
    const courseMap = {};
    data?.forEach(({ course_mastertitle_breakdown_id, course_mastertitle_breakdown, course_subtitle_id, course_subtitle }) => {
        const uniqueSubtitleId = `${course_mastertitle_breakdown_id}-${course_subtitle_id}`;
        if (!courseMap[course_mastertitle_breakdown_id]) {
            courseMap[course_mastertitle_breakdown_id] = {
                id: course_mastertitle_breakdown_id,
                title: course_mastertitle_breakdown,
                subtitles: []
            };
        }
        courseMap[course_mastertitle_breakdown_id].subtitles.push({
            id: uniqueSubtitleId,
            title: course_subtitle
        });
    });
    return Object.values(courseMap);
}

function getSubtitleProgressMap(courseProgress) {
    return courseProgress?.reduce((acc, { course_subtitle_id, course_subtitle_progress }) => {
        acc[course_subtitle_id] = course_subtitle_progress;
        return acc;
    }, {}) || {};
}

export default function CourseNavigation({ courseProgress, courseStatus, content, onContentSelect, activeContentId }) {
    const [courseStructure, setCourseStructure] = useState([]);
    const [expandedSections, setExpandedSections] = useState(new Set());
    const [progressMap, setProgressMap] = useState({});

    useEffect(() => {
        setCourseStructure(transformCourseData(content));

        console.log(courseProgress, "courseProgress");

        setProgressMap(getSubtitleProgressMap(courseProgress));
    }, [content, courseProgress]);

    const [status, setStatus] = useState()
    useEffect(() => {
        if (courseStatus?.data) {
            setStatus([...courseStatus.data].sort((a, b) => a.course_master_breakdown_id - b.course_master_breakdown_id));
        }
    }, [courseStatus]);

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            newSet.has(sectionId) ? newSet.delete(sectionId) : newSet.add(sectionId);
            return newSet;
        });
    };





    return (
        <nav className="p-4 bg-white">
            <h2 className="text-xl font-bold mb-4 text-primary">Course Contents</h2>
            <ul>
                {courseStructure.map(({ id, title, subtitles }, i) => (
                    <li key={id} className="mb-4 border-b pb-2 last:border-none">
                        <div className="flex items-center justify-between w-full">
                            <button
                                onClick={() => toggleSection(id)}
                                className="flex items-center justify-between text-left font-medium px-4 py-1 rounded w-full transition-all bg-gray-200 hover:bg-gray-300"
                            >
                                <span>{title}</span>
                                <div className="w-12 h-12 p-1">
                                    <CircularProgressbar
                                        strokeWidth={10}
                                        value={status?.[id - 1]?.progress_percentage * 1 || 0}
                                        text={`${Math.round(status?.[id - 1]?.progress_percentage || 0)}%`}
                                        styles={buildStyles({
                                            textSize: "30px",
                                            pathColor: (status?.[id - 1]?.progress_percentage * 1 || 0) === 100 ? "#4CAF50" : "#FFC107",
                                            textColor: "#000",
                                            trailColor: "#ddd",
                                        })}
                                    />

                                </div>
                            </button>
                        </div>
                        {expandedSections.has(id) && (
                            <ul className="ml-6 mt-2">
                                {subtitles.map(({ id: subId, title: subTitle }) => (
                                    <li key={subId} className="my-2 flex items-center justify-between">
                                        <button
                                            onClick={() => onContentSelect(subId)}
                                            className={`text-sm flex-1 text-left px-3 py-1 rounded transition-all ${subId === activeContentId ? "bg-primary text-black" : "text-primary-foreground hover:bg-gray-200"}`}
                                        >
                                            {subTitle}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
