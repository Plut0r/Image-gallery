import { useState, useEffect } from "react";
import Header from "./components/header";
import Images from "./components/images";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  console.log(isLoggedIn);

  useEffect(() => {
    const storedLogDetails = localStorage.getItem("loggedIn");
    if (storedLogDetails) {
      setisLoggedIn(JSON.parse(storedLogDetails));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  return (
    <div className="container">
      <Header setIsLoggedIn={setisLoggedIn} isLoggedIn={isLoggedIn} />
      <Images isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
