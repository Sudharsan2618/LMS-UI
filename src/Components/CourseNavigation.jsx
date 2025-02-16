import { useEffect, useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

const courseStructure = [
    {
        id: 1,
        title: "Objectives And Outcomes",
        subtitles: [{ id: 1, title: "Why Python ?" }],
    },
    {
        id: 2,
        title: "Getting Start With Python",
        subtitles: [
            { id: 1, title: "Python Syntax" },
            { id: 2, title: "Python Commands" },
            { id: 3, title: "Python Variables" },
            { id: 4, title: "Python Keywords" },
        ],
    },
    // Add more sections as needed
]

function transformCourseData(data) {
    const courseMap = {};

    data?.forEach(item => {
        const { course_mastertitle_breakdown_id, course_mastertitle_breakdown, course_subtitle_id, course_subtitle } = item;
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

export default function CourseNavigation({ content, onContentSelect }) {

    const [courseStructure, setCourseStructure] = useState(transformCourseData(content))


    useEffect(() => {
        setCourseStructure(transformCourseData(content))

    }, [content])


    const [expandedSections, setExpandedSections] = useState([])

    const toggleSection = (sectionId) => {
        setExpandedSections((prev) =>
            prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
        )
    }

    return (
        <nav className="p-4">
            <h2 className="text-xl font-bold mb-4 text-primary">Course Contents</h2>
            <ul>
                {courseStructure.map((section) => (
                    <li key={section.id} className="mb-2">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="flex items-center w-full text-left text-primary-foreground hover:text-primary"
                        >
                            {expandedSections.includes(section.id) ? (
                                <ChevronDown className="w-4 h-4 mr-2" />
                            ) : (
                                <ChevronRight className="w-4 h-4 mr-2" />
                            )}
                            {section.title}
                        </button>
                        {expandedSections.includes(section.id) && (
                            <ul className="ml-4 mt-1">
                                {section.subtitles.map((subtitle) => (
                                    <li key={subtitle.id} className="my-1">


                                        <button onClick={() => onContentSelect(subtitle.id)} className="text-sm text-primary-foreground hover:text-primary">
                                            {subtitle.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}

