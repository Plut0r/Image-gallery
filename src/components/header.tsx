import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import Login from "./login";

interface Header {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ isLoggedIn, setIsLoggedIn }: Header) {
  const [login, setLogin] = useState(false);
  return (
    <>
      {login && (
        <Login open={login} setOpen={setLogin} setIsLoggedIn={setIsLoggedIn} />
      )}
      <div className="h-14 w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-gray-500">Gallery</h1>
          <AiOutlineRight color="gray" />
          <h2 className="text-green-800 font-semibold">Images</h2>
        </div>
        <button
          className={`${
            isLoggedIn ? "bg-gray-500" : "bg-green-800"
          } px-5 py-2 text-white rounded-lg`}
          // disabled={isLoggedIn}
          onClick={() => isLoggedIn ? setIsLoggedIn(false) : setLogin(true)}
        >
          {isLoggedIn ? "Log Out" : "Login"}
        </button>
      </div>
    </>
  );
}

export default Header;
