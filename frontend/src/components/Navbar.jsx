import userIcon from "../assets/user.svg";
// import login from "../assets/login.svg";
// import logout from "../assets/logout.svg";

export default function Navbar() {
  function handleProfileIconClick() {
    console.log("I got Clicked");
  }
  return (
    <main className="w-full flex items-center justify-center bg-stone-300">
      <section className="container mx-5">
        <nav className="w-full flex items-center justify-between h-14">
          <input
            type="text"
            className="border-3 border-stone-400 w-2/3 h-10 p-3 rounded-4xl bg-[#f5f5f5] outline-none"
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
              style={{ filter: "invert(1)" }}
            />
          </button>
        </nav>
      </section>
    </main>
  );
}
