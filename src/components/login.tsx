import React, { useState } from "react";
import Modal from "react-modal";
import { AiFillEye } from "react-icons/ai";
import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { IoMdClose } from "react-icons/io";

const firebaseConfig = {
  apiKey: "AIzaSyCChgG0oHz_uckhvNb_jxUvksYWCrdhaoo",
  authDomain: "image-login-392b3.firebaseapp.com",
  projectId: "image-login-392b3",
  storageBucket: "image-login-392b3.appspot.com",
  messagingSenderId: "1009711458114",
  appId: "1:1009711458114:web:2fc5be3672cdfe7a458adb",
  measurementId: "G-27GPDQSCSJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface Login {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ open, setOpen, setIsLoggedIn }: Login) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("1Password");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log(true);
      setLoading(false);
      setError("");
      setIsLoggedIn(true);
      setSuccess(true);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <Modal
      appElement={document.getElementById("root") || undefined}
      isOpen={open}
      className="modal"
      overlayClassName="backdrop"
      onRequestClose={() => setOpen(false)}
      shouldCloseOnOverlayClick={false}
    >
      <Modal
        appElement={document.getElementById("root") || undefined}
        isOpen={success}
        className="modal"
        overlayClassName="backdrop"
        onRequestClose={() => setSuccess(false)}
        shouldCloseOnOverlayClick={false}
      >
        <div className="w-[270px] p-4">
          <h4 className="text-center text-base font-semibold">
            User successfully logged in
          </h4>
          <button
            className="w-full h-10 bg-black text-white mt-4 rounded-md"
            onClick={() => (setSuccess(false), setOpen(false))}
          >
            Close
          </button>
        </div>
      </Modal>
      <div className="w-[350px] p-4 flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Login</h3>
          <div
            className="w-6 h-6 rounded-full bg-black text-white flex justify-center items-center cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <IoMdClose color="white" />
          </div>
        </div>
        <p className="text-sm text-gray-700">
          Kindly provide login details to access drag and drop
        </p>
        <form className="mt-2 flex flex-col gap-2" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-sm text-black">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full h-10 border rounded-md mt-1 pl-2 outline-none bg-[#f6f6f6] placeholder:text-xs text-xs"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm text-black">
              Password
            </label>
            <div className="flex items-center gap-4 h-10 border rounded-md mt-1 bg-[#f6f6f6] pr-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full h-10 pl-2 outline-none bg-transparent placeholder:text-xs text-xs"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowPassword(showPassword ? false : true)}
              >
                <AiFillEye />
              </div>
            </div>
          </div>
          <button
            className="mt-2 w-full h-12 bg-black text-white text-base rounded-md"
            // onClick={handleLogin}
          >
            {loading ? "Loading" : "Submit"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-3 text-center text-sm">{error}</p>
        )}
      </div>
    </Modal>
  );
}

export default Login;
