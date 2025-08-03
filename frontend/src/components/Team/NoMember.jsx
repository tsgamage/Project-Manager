import { UserPlus, Users } from "lucide-react";

export default function NoMember({onClick}) {
    return (
        <div className="text-center py-12">
            <div className="w-20 h-20 gradient-card rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
                No team members found
            </h3>
            <p className="text-gray-400 mb-6">
                Add your first team member to get started
            </p>
            <button onClick={onClick} className="gradient-blue hover:shadow-lg text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 hover-lift mx-auto">
                <UserPlus className="h-4 w-4" />
                Add First Member
            </button>
        </div>
    )
}