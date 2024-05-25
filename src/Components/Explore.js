import noteContext from "../Context/Notecontext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

let uid = "";

const Explore = () => {
  const context = useContext(noteContext);
  const { alluser, getallUser, getUser, follow } = context;
  const [filteruser, setfilteruser] = useState([]);

  let [usermainid, setusermainid] = useState([]);

  const handleFollow = async (id, uid, e) => {
    e.preventDefault();
    const fol = await follow(id, uid);
    setusermainid(fol);

    alert("succesfully followed");
  };

  const render = (name, userName, id, image, following, followers) => {
    const status = usermainid.includes(id);

    if (uid == id || status) {
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
          <div className="flex-row flex items-center justify-between  mr-6 ">
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
            <div className="pt-5">
              <button
                onClick={(e) => handleFollow(id, uid, e)}
                className="bg-white  hover:scale-110 font-bold  py-1 px-4 text-black rounded-2xl"
              >
                Follow
              </button>
            </div>
          </div>{" "}
        </Link>
      );
    }

  
  };

  const callalluser = async () => {
    const users = await getallUser();
    setfilteruser(filteruser.concat(users));

    const mainid = await getUser();
  

    setusermainid(usermainid.concat(mainid.following));
    uid = mainid._id;
  };


  useEffect(() => {
    callalluser();
  }, []);
  return (
    <>
      <div className="h-[21%]  md:w-2/8 my-10 border-gray-800 border mt-16 mx-8 rounded-2xl ">
        <div className=" text-white">
          <div className="text-xl font-bold pt-4 pl-4 pb-2">
            Subscribe to Premium
          </div>
          <div className=" pl-4 pb-2">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </div>
          <button className="bg-blue-500 ml-4 font-bold pt-1 pb-2 px-4  rounded-2xl">
            Subscribe
          </button>
        </div>
      </div>

      <div className="  h-3/5 rounded-2xl md:mx-8  border-gray-800 border w-2/8">
        <div className="text-white">
          <div className="text-xl font-bold pt-4 pl-4 pb-2">Who to follow</div>

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
    </>
  );
};

export default Explore;
