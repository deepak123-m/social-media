import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { BsChat } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineSort } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import noteContext from "../Context/Notecontext";
import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

let count = 0;

let folowlength = 0;
let folowerslength = 0;
let user_id = "";
let userfollowing = [];
let userfollowers = [];

const Profile = (props) => {
  if (localStorage.getItem("token") === null) {
    navigate("/login");
  }

  const [folength, setfolength] = useState({ s: "", d: "" });
  let navigate = useNavigate();
  const location = useLocation();

  let context = useContext(noteContext);

  const {
    user,
    getUser,
    post,
    getPost,
    updatePostLike,
    updatePostRetweet,
    deletePost,
  } = context;

  const callUser = async () => {
    const userimag = await getUser();
    user_id = "";

    if (location.state.yes === "yes") {
      user_id = userimag._id;
      folowlength = 0;
      folowerslength = 0;
      folowlength = userimag.following.length;
      folowerslength = userimag.followers.length;
      userfollowers = [];
      userfollowers = [...userimag.followers];
      userfollowing = [];
      userfollowing = [...userimag.following];

      setfolength({ d: folowerslength, s: folowlength });
    }
  };

  const handleLike = async (_id, likes) => {
    let postIndex = false;
    postIndex = likes.includes(user_id);

    await updatePostLike(_id, user_id);
  };

  const handleRetweet = async (_id, retweets) => {
    let postIndex = false;
    postIndex = retweets.includes(user_id);

    await updatePostRetweet(_id, user_id);
  };

  const handleDelete = (id, e) => {
    e.preventDefault();
    deletePost(id);
  };

  const handleicondelte = (user_id, _id) => {
    if (user_id != "") {
      return (
        <div
          onClick={(e) => handleDelete(user, _id, e)}
          className="mr-3 cursor-pointer mt-1"
        >
          <RiDeleteBin6Line />
        </div>
      );
    }
  };

  if (localStorage.getItem("token") === null) {
    navigate("/login");
  }

  const handleUserPost = (
    image,
    description,
    userName,
    name,
    user,
    _id,
    retweets,
    likes,
    profileimage,
    index
  ) => {
    if (user != location.state.id) {
    } else {
      return (
        <div key={_id} className="border-r border-gray-800 ">
          <div className="min-h-[60%] border-b border-gray-800">
            <div className="text-white     ml-4 pt-5">
              <div>
                <div className="flex gap-5">
                  <img
                    className="w-12 h-12 inline rounded-full"
                    src={profileimage}
                  />

                  <div className="flex-row w-[85%] ">
                    <div className="flex">
                      <div className="font-bold ">{name}</div>
                      <div>
                        <img
                          className="w-8 mt-1"
                          src="https://images.herzindagi.info/image/2022/Dec/how-to-get-blue-tick-on-twitter-price.jpg"
                          alt="error"
                        />
                      </div>
                      <div className="text-gray-500"> @{userName}</div>
                    </div>
                    <div className="my-2">
                      <div className="text-white">{description}</div>
                      {image ? (
                        <img
                          className="w-full rounded-xl my-5  h-72"
                          src={image}
                          alt="No photo added for this post"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {handleicondelte(user_id, _id)}
                </div>
              </div>
              <div className="flex ml-16 justify-between mr-11 pb-4  text-gray-500">
                <div className="flex text-gray-500 gap-2 items-center text-[13px]">
                  <BsChat size="15px" />1
                </div>
                <div className="flex  cursor-pointer gap-2 items-center  text-[13px]">
                  <div>
                    <AiOutlineRetweet
                      id="retweet"
                      onClick={() => handleRetweet(_id, retweets)}
                      size="15px"
                      fill={
                        retweets.includes(location.state.id) ||
                        retweets.includes(user_id)
                          ? "green"
                          : "Gray"
                      }
                    />
                  </div>
                  <div className="text-gray-500">
                    {post[index].retweets.length}
                  </div>
                </div>

                <div className="flex  cursor-pointer gap-2 items-center  text-[13px]">
                  <div>
                    <FaHeart
                      id="heart"
                      onClick={() => handleLike(_id, likes)}
                      size="12px"
                      fill={
                        likes.includes(location.state.id) ||
                        likes.includes(user_id)
                          ? "red"
                          : "Gray"
                      }
                    />
                    {}
                  </div>

                  <div className="text-gray-500">
                    {post[index].likes.length}
                  </div>
                </div>
                <div className="flex text-gray-500 gap-2 items-center text-[13px]">
                  <MdOutlineSort size="15px" />0
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const fetchPost = async () => {
    const postCount = await getPost();

    count = 0;
    postCount.forEach((element) => {
      if (element.user === location.state.id) {
        count = count + 1;
      }
    });
  };
  useEffect(() => {
    fetchPost();

    callUser();
  }, []);
  return (
    <div className="border-r h-full border-gray-800 border-b bg-black text-white ">
      <div className="border-gray-800 border-b">
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <IoMdArrowBack size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{location.state.nme}</h1>
            <p className="text-gray-500 text-sm">{count}</p>
          </div>
        </div>
        <img
          src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360"
          alt="banner"
        />
        <div className="relative top-1 ml-2 w-[35%]  border-4 border-white pb-2 ">
          <img className=" " src={location.state.img} alt="error" />
        </div>
        <div className="text-right m-4"></div>
        <div className="m-4 mt-2">
          <h1 className="font-bold text-xl">{location.state.nme}</h1>
          <p>@{location.state.unme}</p>
        </div>

        <div className="m-4 flex gap-5 text-gray-600">
          <Link
            to="/following"
            state={
              location.state.yes === "yes"
                ? { following: userfollowing }
                : { following: location.state.flw }
            }
          >
            {" "}
            <div className="flex gap-1">
              <div className="text-white">
                {location.state.yes == "yes"
                  ? folength.s
                  : location.state.flw.length}
              </div>{" "}
              <div className="text-gray-600"> Following</div>
            </div>{" "}
          </Link>
          <Link
            to="/followers"
            state={
              location.state.yes === "yes"
                ? { followers: userfollowers }
                : { followers: location.state.flwrs }
            }
          >
            {" "}
            <div className="flex gap-1">
              {" "}
              <div className="text-white">
                {location.state.yes == "yes"
                  ? folength.d
                  : location.state.flwrs.length}
              </div>{" "}
              <div className="text-gray-600"> Followers</div>
            </div>
          </Link>
        </div>
        <div className="m-4 text-sm ">
          <p>
            🌐 Exploring the web's endless possibilities with MERN Stack 🚀 |
            Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me
            on this coding journey!
          </p>
        </div>
      </div>

      {post &&
        post.map(
          (
            {
              image,
              description,
              userName,
              name,
              user,
              _id,
              retweets,
              likes,
              profileimage,
            },
            index
          ) => {
            return handleUserPost(
              image,
              description,
              userName,
              name,
              user,
              _id,
              retweets,
              likes,
              profileimage,
              index
            );
          }
        )}
    </div>
  );
};

export default Profile;
