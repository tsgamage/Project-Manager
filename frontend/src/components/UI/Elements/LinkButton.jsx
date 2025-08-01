import { Link } from "react-router-dom";

export default function LinkButton({ link, children, paddingClasses }) {
    return <Link
        to={link}
        className={`${paddingClasses} group w-full sm:w-auto flex justify-center items-center rounded-xl shadow-lg text-sm font-semibold text-white gradient-blue hover:shadow-xl transition-all duration-300 hover-lift focus-ring`}
    >
        {children}
    </Link>
}