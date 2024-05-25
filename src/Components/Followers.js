import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import noteContext from "../Context/Notecontext";

const Followers = () => {
  let navigate = useNavigate();

  if (localStorage.getItem("token") === null) {
    navigate("/login");
  }
  let context = useContext(noteContext);
  const { alluser } = context;
  const location = useLocation();



  const render = (name, userName, id, image, following, followers) => {
    if (!location.state.followers.includes(id)) {
     
    } else {
      return (
        <Link
          to="/profile"
          state={{
            img: image,
            nme: name,
            unme: userName,
            flw: following,
            flwrs: followers,
            id: id,
            yes: "no",
          }}
        >
          <div className="flex-row flex m-3 items-center justify-between  mr-6 ">
            <div>
              <div className="flex gap-3  pt-4 pl-4 ">
                <img
                  alt="error"
                  className="w-12 h-12 inline rounded-full"
                  src={image}
                />

                <div>
                  <div key={id}>
                    <div className="font-bold ">{name}</div>
                    <div className="text-gray-500">@{userName}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-5"></div>
          </div>{" "}
        </Link>
      );
    }
  };

  return (
    <div>
      <div className="   rounded-2xl mx-8  border-gray-800 border ">
        <div className="text-white">
          <div className="text-xl font-bold pt-4 pl-4 pb-2">Followers</div>

          {alluser &&
            alluser.map(
              ({ name, userName, _id, image, following, followers }) => {
                let userid = _id;
                return render(
                  name,
                  userName,
                  userid,
                  image,
                  following,
                  followers
                );
              }
            )}
        </div>
      </div>
    </div>
  );
};

export default Followers;
