import React, { useContext, useEffect } from "react";
import { GoMail, GoHomeFill } from "react-icons/go";
import { IoPerson, IoSearch } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { TbSlash } from "react-icons/tb";
import { FaRectangleList } from "react-icons/fa6";
import { BsPersonSquare } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import noteContext from "../Context/Notecontext";
import { Link, useNavigate } from "react-router-dom";

let profileimage = "";
let uname = "";
let uusername = "";
let userid = "";
let following;
let followers;

const Home = () => {
  let navigate = useNavigate();

  if (localStorage.getItem("token") === null) {
    navigate("/login");
  }

  const updateUseer = () => {
    callUser();
  };
  const context = useContext(noteContext);
  const { user, getUser } = context;

  const callUser = async () => {
    const userimag = await getUser();

    profileimage = userimag.image;
    uname = userimag.name;
    uusername = userimag.userName;
    followers = userimag.followers;
    following = userimag.following;
    userid = userimag._id;
  };

  useEffect(() => {
    callUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const items = [
    {
      id: 0,
      name: null,
      icon: <RiTwitterXFill size="34px" />,
      to: "/soon",
    },
    {
      id: 1,
      name: "Home",
      icon: <GoHomeFill size="28px" />,
      to: "/",
    },
    {
      id: 10,
      name: "Profile",
      icon: <IoPerson size="28px" />,
      to: "/profile",
    },
    {
      id: 4,
      name: "Notifications",
      icon: <IoMdNotifications size="28px" />,
      to: "/soon",
    },
    {
      id: 5,
      name: "Messages",
      icon: <GoMail size="28px" />,
      to: "/soon",
    },
    {
      id: 6,
      name: "Groks",
      icon: <TbSlash size="28px" />,
      to: "/soon",
    },
    {
      id: 7,
      name: "Lists",
      icon: <FaRectangleList size="28px" />,
      to: "/soon",
    },
    {
      id: 8,
      name: "Communities",
      icon: <BsPersonSquare size="28px" />,
      to: "/soon",
    },
    {
      id: 9,
      name: "Premium",
      icon: <RiTwitterXFill size="28px" />,
      to: "/soon",
    },
    {
      id: 3,
      name: "Explore",
      icon: <IoSearch size="28px" />,
      to: "/soon",
    },
    {
      id: 11,
      name: "Logout",
      icon: <CiCircleMore size="28px" />,
      to: "/login",
    },
  ];
  return (
    <div>
      <div className="  h-vh md:flex  justify-center pl-16  md:pl-32 ">
        <div className="text-white  ">
          {items.map(({ id, name, icon, to }) => (
            <div
              key={id}
              className="py-3 flex flex-row items-center cursor-pointer hover:bg-gray-700 rounded-2xl gap-5 text-xl   "
            >
              <div>{icon}</div>
              <Link
                to={to}
                state={{
                  img: profileimage,
                  id: userid,
                  nme: uname,
                  unme: uusername,
                  flw: following,
                  flwrs: followers,
                  yes: "yes",
                }}
              >
                {" "}
                <button   onClick={updateUseer()}>{name}</button>
              </Link>
            </div>
          ))}

          <Link to="/">
            {" "}
            <button className="py-2 h-14 font-bold bg-sky-500 cursor-potinter w-56 rounded-full mx-auto">
              Post
            </button>
          </Link>
        </div>
      </div>

      <div className="text-white   ml-16  md:ml-32 pt-3">
        <div className="flex gap-5 my-5">
          <img
            alt="error"
            className="w-12 h-12 inline rounded-full"
            src={profileimage}
          />
          <div>
            
            {user &&
              user.map(({ name, userName, _id }) => {
                return (
                  <div key={_id}>
                    <div className="font-bold ">{name}</div>
                    <div className="text-gray-500">@{userName}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
