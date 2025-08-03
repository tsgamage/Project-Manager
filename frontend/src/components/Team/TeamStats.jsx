import {Calendar, Target, Users} from "lucide-react";

export default function TeamStats({teamStats}) {
    return (<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="gradient-card rounded-xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                        Total Members
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-400">            {teamStats.totalMembers}              </p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400"/>
            </div>
        </div>


        <div className="gradient-card rounded-xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                        Active Members
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-green-400">
                        {teamStats.activeMembers}
                    </p>
                </div>
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-400"/>
            </div>
        </div>

        <div className="gradient-card rounded-xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                        Available
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                        {teamStats.assignableMembers}
                    </p>
                </div>
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400"/>
            </div>
        </div>

        <div className="gradient-card rounded-xl p-4 sm:p-6 shadow-lg hover-lift transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                        Total Projects
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                        {teamStats.totalProjects}
                    </p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400"/>
            </div>
        </div>
    </div>)
}