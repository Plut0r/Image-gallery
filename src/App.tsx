import { useState } from "react";
import Header from "./components/header";
import Images from "./components/images";

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  return (
    <div className="container">
      <Header setIsLoggedIn={setisLoggedIn} isLoggedIn={isLoggedIn} />
      <Images isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
