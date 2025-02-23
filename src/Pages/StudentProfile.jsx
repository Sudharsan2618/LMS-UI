import { useState } from "react";

const StudentProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [student, setStudent] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        bio: "Passionate learner exploring new skills in web development.",
        avatar: "https://i.pravatar.cc/103",
        courses: [
            { title: "React Basics", progress: 80 },
            { title: "Advanced JavaScript", progress: 50 },
            { title: "CSS Mastery", progress: 100 },
        ],
    });

    const handleEdit = () => setIsEditing(!isEditing);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({ ...prev, [name]: value }));
    };

    const { username } = JSON.parse(localStorage.getItem("user"))

    return (
        <div className="max-w-lg mx-auto p-6">
            <div className="text-center p-6 border border-gray-300 rounded-lg shadow-md">
                <img src={student.avatar} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
                {isEditing ? (
                    <input disabled
                        type="text"
                        name="name"
                        value={username}
                        onChange={handleChange}
                        className="block mt-2 text-xl font-semibold border rounded px-2 py-1"
                    />
                ) : (
                    <h2 className="text-xl font-semibold mt-2">{username}</h2>
                )}
                {isEditing ? (
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        className="block mt-1 text-gray-600 border rounded px-2 py-1"
                    />
                ) : (
                    <p className="text-gray-600">{student.email}</p>
                )}
                {isEditing ? (
                    <textarea
                        name="bio"
                        value={student.bio}
                        onChange={handleChange}
                        className="block mt-2 text-gray-700 border rounded px-2 py-1 w-full"
                    />
                ) : (
                    <p className="mt-2 text-gray-700">{student.bio}</p>
                )}
                <button
                    onClick={handleEdit}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {isEditing ? "Save" : "Edit Profile"}
                </button>
            </div>

            <h3 className="mt-6 text-lg font-semibold">Course Progress</h3>
            <div className="mt-4 space-y-4">
                {student.courses.map((course, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                        <h4 className="font-medium">{course.title}</h4>
                        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{course.progress}% completed</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentProfile;
