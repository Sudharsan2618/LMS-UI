import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            const response = await axios.get("https://lms-be-sqpa.onrender.com/api/jobs");
            setJobs(response.data.jobs || []);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="max-w-8xl mx-auto">
            <div className="shadow py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold">Jobs</h1>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {loading ? (
                    [...Array(6)].map((_, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow">
                            <Skeleton height={30} width="70%" />
                            <Skeleton height={20} width="40%" className="mt-2" />
                            <Skeleton count={3} className="mt-2" />
                            <Skeleton height={36} className="mt-4" />
                        </div>
                    ))
                ) : (
                    jobs.map((job) => (
                        <div key={job.job_id} className="border rounded-lg p-4 shadow-md">
                            <h2 className="text-lg font-semibold line-clamp-1">{job.job_title}</h2>
                            <p className="text-sm text-gray-600">{job.company}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {new Date(job.updated_date).toLocaleDateString()}
                            </p>
                            <p className="text-sm mt-2 line-clamp-3 text-gray-700">{job.description}</p>
                            <p className="text-xs text-gray-600 mt-1">Location: {job.location}</p>
                            <p className="text-xs text-gray-600">Salary: {job.salary}</p>
                            <a
                                href={job.apply_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-center bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark mt-4"
                            >
                                Apply Now
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Jobs;
