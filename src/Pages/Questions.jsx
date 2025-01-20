import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestions } from "../Store/questionsSlice";
import infoImage from "../assets/images/login.svg"

const Questions = () => {
    const [expandedQuestion, setExpandedQuestion] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState({});

    const { questions, tabName, loading } = useSelector(state => state.questions)

    const handleOptionChange = (questionId, option) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [questionId]: option,
        }));
    };
    const [activeTab, setActiveTab] = useState(1)

    const handleNext = () => {
        setActiveTab((prev) =>
            prev < 5 ? prev + 1 : 5
        );
    };

    const handlePrevious = () => {
        setActiveTab((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchQuestions({ tabId: activeTab, userId: JSON.parse(localStorage.getItem("user"))?.user_id }))
    }, [activeTab])

    useEffect(() => {
        window.scroll(0, 0)
    }, [loading])


    return (
        <div className="min-h-screen bg-neutral-light p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    {/* Logo */}
                    <div className="relative flex opacity-0">
                        <div className="w-12 h-12 bg-primary-light rounded-full" />
                        <div className="w-12 h-12 bg-primary-dark rounded-full -ml-6" />
                        <span className="ml-2 text-xl font-semibold">Companion</span>
                    </div>

                    {/* Tab Name */}
                    <h1 className="text-3xl font-bold border-b-2 border-primary-dark">
                        {tabName}
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        {questions.map((question, i) => (
                            <div key={`question-${i}`} className="w-full">
                                <button
                                    onClick={() => setExpandedQuestion(i + 1)}
                                    className={`w-full p-4 text-left rounded flex justify-between items-center ${expandedQuestion === question.id
                                        ? "bg-primary-light"
                                        : "bg-secondary-light"
                                        }`}
                                >
                                    <span className="text-lg font-medium">{question.question}</span>
                                    {expandedQuestion === i + 1 ? (
                                        <ChevronUp />
                                    ) : (
                                        <ChevronDown />
                                    )}
                                </button>

                                {expandedQuestion === i + 1 && question.options && (
                                    <div className="mt-2 p-3 bg-neutral-light  rounded">
                                        <div className="space-y-2">
                                            {question.options.map((option) => (
                                                <div key={option} className="flex items-center space-x-2">
                                                    <label className="flex items-center justify-center gap-2 cursor-pointer">
                                                        <input
                                                            className=" size-4"
                                                            type="radio"
                                                            name={`question-${i + 1}`}
                                                            checked={selectedOptions[i + 1] === option}
                                                            onChange={() => handleOptionChange(i + 1, option)}
                                                        />
                                                        <span>

                                                            {option.option_text}
                                                        </span>

                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-end">
                                            <button className="mt-4 px-4 py-2 bg-primary-dark text-white rounded">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-center text-center">
                        <img
                            src={infoImage}
                            alt="info image"
                            className="w-64 h-64 object-contain"
                        />
                        <h2 className="text-4xl font-bold text-primary-dark">
                            Help us to understand more about you!
                        </h2>
                    </div>
                </div>

                <div className="flex justify-between mt-8">
                    <button disabled={activeTab === 1}
                        onClick={handlePrevious}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-5"
                    >
                        <ArrowLeft /> Previous
                    </button>
                    <button disabled={activeTab === 5}
                        onClick={handleNext}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded disabled:opacity-5"
                    >
                        Next <ArrowRight />
                    </button>
                </div>
            </div>

            {loading &&
                <div className="fixed inset-0 bg-primary-light flex items-center justify-center">
                    <p>Loading...</p>
                </div>
            }
        </div>
    );
};

export default Questions;
