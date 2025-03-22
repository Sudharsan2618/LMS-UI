import { Medal, Award, Trophy, Calendar } from "lucide-react";

const badgeIcons = {
    Skill: <Medal className="text-blue-600 w-6 h-6" />,
    Achievement: <Award className="text-yellow-600 w-6 h-6" />,
    Milestone: <Trophy className="text-green-600 w-6 h-6" />,
};

const Badges = ({ badges }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Group badges by type
    const groupedBadges = badges.reduce((acc, badge) => {
        acc[badge.badge_type] = acc[badge.badge_type] || [];
        acc[badge.badge_type].push(badge);
        return acc;
    }, {});

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
            {Object.keys(groupedBadges).length === 0 ? (
                <p className="text-gray-500">No badges earned yet.</p>
            ) : (
                Object.entries(groupedBadges).map(([type, badges]) => (
                    <div key={type} className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-gray-700">{type} Badges</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {badges.map((badge) => (
                                <div key={badge.badge_id} className="bg-white shadow-lg rounded-2xl p-4 border hover:shadow-xl transition-all">
                                    <div className="flex items-center gap-3">
                                        {badgeIcons[badge.badge_type] || <Medal className="text-gray-600 w-6 h-6" />}
                                        <h3 className="text-lg font-semibold">{badge.badge_name}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{badge.badge_level} Level</p>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>Earned on {formatDate(badge.earned_date)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Badges;
