import { Link } from "react-router-dom";

export default function TextLink({ link }) {
  return (
    <div className="text-xs sm:text-sm">
      <Link
        to={link}
        className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
      >
        Forgot password?
      </Link>
    </div>
  );
}
