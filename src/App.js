import Content from "./Components/Content";
import Home from "./Components/Home";
import NoteState from "./Context/Notestate";
import Explore from "./Components/Explore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Comingsoon from "./Components/Comingsoon";
import Following from "./Components/Following";
import Followers from "./Components/Followers";

function App() {
  return (
    <NoteState>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="bg-black">
                <div className="md:flex overflow-auto md:h-[750px] ">
                  <div className="md:w-1/4   lg:block md:border-gray-800   bg-black md:top-0 border-r border-white md:sticky md:flex-start ">
                    <Home />
                  </div>
                  <Content />
                  <div className=" md:w-[430px] w-full lg:block h-[750px]  md:top-0 md:sticky">
                    {" "}
                    <Explore />
                  </div>
                </div>
              </div>
            }
          />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/following"
            element={
              <div className="flex overflow-auto h-[750px] bg-black">
                <div className="w-1/4 hidden lg:block md:border-gray-800   bg-black top-0 border-r border-gray-800 sticky flex-start ">
                  <Home />
                </div>
                <div className="w-[50%] h-full">
                  {" "}
                  <Following />
                </div>
              </div>
            }
          />

          <Route
            exact
            path="/followers"
            element={
              <div className="flex overflow-auto h-[750px] bg-black">
                <div className="w-1/4 hidden lg:block md:border-gray-800   bg-black top-0 border-r border-gray-800 sticky flex-start ">
                  <Home />
                </div>
                <div className="w-[50%] h-full">
                  {" "}
                  <Followers />
                </div>
              </div>
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <div className="bg-black">
                <div className="md:flex overflow-auto md:h-[750px] ">
                  <div className="w-1/4 hidden lg:block md:border-gray-800   bg-black md:top-0 border-r border-gray-800 md:sticky md:flex-start ">
                    <Home />
                  </div>

                  <div className=" md:w-[50%] ">
                    <Profile />
                  </div>
                </div>
              </div>
            }
          />

          <Route
            exact
            path="/soon"
            element={
              <div className="bg-black">
                <div className="flex overflow-auto h-[750px] ">
                  <div className="w-1/4 hidden lg:block md:border-gray-800   bg-black top-0 border-r border-gray-800 sticky flex-start ">
                    <Home />
                  </div>

                  <div className="sticky top-0">
                    <Comingsoon />
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
