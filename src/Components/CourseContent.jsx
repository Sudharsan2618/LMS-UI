
import { useEffect, useState } from "react"

const courseContent = [
    {
        id: 1,
        title: "Why Python ?",
        content:
            "Python is one of the most popular programming languages today, known for its simplicity, extensive features and library support. Its clean and straightforward syntax makes it beginner-friendly, while its powerful libraries and frameworks makes it perfect for developers.\n\nPython is:\n\nA versatile, high-level programming language.\nEasy-to-learn syntax, perfect for beginners and experts.\nKnown for its readability and extensive library support.",
    },
    // Add more content as needed
]

function transformData(data) {

    return data?.map(item => ({
        id: `${item.course_mastertitle_breakdown_id}-${item.course_subtitle_id}`,
        title: item.course_subtitle,
        content: item.subtitle_content.trim()
    }));


}

export default function CourseContent({ data, selectedContentId }) {
    const [courseContent, setCourseContent] = useState(transformData(data))
    useEffect(() => {
        setCourseContent(transformData(data))
    }, [data])


    const [currentContent, setCurrentContent] = useState(null)

    useEffect(() => {

        setCurrentContent(courseContent?.find((content) => content.id == selectedContentId))

    }, [courseContent, selectedContentId])

    const [currentContentId, setCurrentContentId] = useState(1)

    // const currentContent = courseContent?.find((content) => content.id === currentContentId)


    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">{currentContent?.title}</h2>
            <div className="prose max-w-none">
                {currentContent?.content.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    )
}

