import {Link} from "react-router-dom";
import userIcon from "../assets/user.svg";
// import login from "../assets/login.svg";
// import logout from "../assets/logout.svg";

export default function Navbar() {
    function handleProfileIconClick() {
        console.log("I got Clicked");
    }

    return (
        <main className="w-full flex items-center justify-center bg-stone-900">
            <section className="container mx-5">
                <nav className="w-full flex items-center justify-between h-24">
                    <Link
                        to="/"
                        className="hidden md:block text-xl lg:text-2xl font-bold text-stone-200"
                    >
                        Project Manager
                    </Link>
                    <Link to="/" className="md:hidden text-2xl font-bold text-stone-200">
                        PM
                    </Link>
                    <input
                        type="text"
                        className="border-2 border-stone-700 w-2/3 h-10 p-3 rounded-4xl text-stone-200 bg-stone-700"
                        placeholder="Search for projects (CTRL + K)"
                    />
                    <button
                        onClick={handleProfileIconClick}
                        className="rounded-4xl p-1 cursor-pointer bg-stone-800 fill-white"
                    >
                        <img
                            src={userIcon}
                            alt="A placeholder image for user fill-white"
                            className="w-8 "
                            style={{filter: "invert(1)"}}
                        />
                    </button>
                </nav>
            </section>
        </main>
    );
}
