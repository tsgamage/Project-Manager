import { Users } from "lucide-react";

export default function TeamHeader() {
    return <div className="mb-8 fade-in">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-card rounded-xl flex items-center justify-center shadow-lg">
                <Users className="h-6 w-6 text-white" />
            </div>
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Team Management
                </h1>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
        </div>
        <p className="text-gray-400">
            Manage your team members and track their performance
        </p>
    </div>
}