import { Link } from "react-router-dom";

export default function TextLink({ link }) {
  return (
    <div className="text-sm">
      <Link
        to={link}
        className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        Forgot password?
      </Link>
    </div>
  );
}
