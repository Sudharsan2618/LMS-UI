import { BadgeCheck, Calendar } from "lucide-react";

const Certificates = ({ certificates }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Certificates</h2>
            {certificates.length === 0 ? (
                <p className="text-gray-500">No certificates available.</p>
            ) : (
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                    {certificates?.map((cert) => (
                        <div key={cert.certificate_id} className="bg-white shadow-lg rounded-2xl p-4 border hover:shadow-xl transition-all">
                            <div className="flex items-center gap-3">
                                <BadgeCheck className="text-blue-600 w-6 h-6" />
                                <h3 className="text-lg font-semibold">{cert.certificate_name}</h3>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{cert.certification_level} Level</p>
                            <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                                <Calendar className="w-4 h-4" />
                                <span>Enrolled on {formatDate(cert.enrollment_date)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Certificates;
