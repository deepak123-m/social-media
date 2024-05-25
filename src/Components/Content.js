import { MdOutlineMoreHoriz } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";

import { MdOutlineSort } from "react-icons/md";
import { FaRegImage, FaHeart } from "react-icons/fa6";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { PiGifFill } from "react-icons/pi";
import { MdEmojiEmotions } from "react-icons/md";
import noteContext from "../Context/Notecontext";
import React, { useContext, useEffect, useState } from "react";

let userImage = "";

const Content = () => {
  const context = useContext(noteContext);
  const { getUser, addPost, post, getPost, updatePostLike, updatePostRetweet } =
    context;
  const [postImage, setPostImage] = useState({
    image: "",
    description: "",
    name: "",
    userName: "",
    user: "",
    profileimage: "",
  });

  const ImageSumbit = async (e) => {
    const file = e.target.files[0];

    const base64 = await converToBase64(file);
    setPostImage({ ...postImage, image: base64 });
  };

  const callUser = async () => {
    const users = await getUser();

    setPostImage({
      ...postImage,
      name: users.name,
      userName: users.userName,
      user: users._id,
      profileimage: users.image,
    });
    userImage = users.image;
  };

  const handlePost = async (e) => {
    e.preventDefault();

    await addPost(
      postImage.image,
      postImage.description,
      postImage.userName,
      postImage.user,
      postImage.name,
      postImage.profileimage
    );
    setPostImage({ ...postImage, image: "", description: "" });
    document.getElementById("post").value = document
      .getElementById("post")
      .getAttribute("placheolder");
    alert("successfully Posted");
  };

  const handleLike = async (index, _id) => {
    let postIndex = false;
    postIndex = post[index].likes.includes(postImage.user);
    if (postIndex === false) {
      document.querySelectorAll("svg#heart")[index].setAttribute("fill", "red");
    } else {
      document
        .querySelectorAll("svg#heart")
        [index].setAttribute("fill", "Gray");
    }

    await updatePostLike(_id, postImage.user);
  };

  const handleRetweet = async (index, _id) => {
    let postIndex = false;
    postIndex = post[index].retweets.includes(postImage.user);
    if (postIndex === false) {
      document
        .querySelectorAll("svg#retweet")
        [index].setAttribute("fill", "green");
    } else {
      document
        .querySelectorAll("svg#retweet")
        [index].setAttribute("fill", "Gray");
    }
    await updatePostRetweet(_id, postImage.user);
  };

  const handleDescription = async (e) => {
    setPostImage({ ...postImage, description: e.target.value });
  };

  const converToBase64 = (file) => {
    return new Promise((resolve, rejects) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        rejects(error);
      };
    });
  };

  const fetchPost = async () => {
    await getPost();
  };

  useEffect(() => {
    callUser();
    fetchPost();
  }, []);

  return (
    <div className="md:w-2/5 sm:w-full bg-black  h-full  ">
      <div className="h-14 border border-l-0 border-r text-white items-center flex justify-center border-gray-800">
        <div className="w-1/2    mt-3 font-sans justify-center flex  font-medium cursor-pointer">
          Posts{" "}
        </div>{" "}
      </div>

      <div className="h-[22%]  flex gap-5 border-r border-b border-gray-800">
        <div className="w-[10%] ml-4 pt-5">
          <img
            alt="error"
            className="w-12 h-12 inline rounded-full"
            src={userImage}
          />
        </div>

        <div className="w-full">
          <form>
            <input
              className="bg-black w-full my-5 placeholder:text-xl placeholder:text-gray-600 font-medium outline-none text-white "
              onChange={(e) => handleDescription(e)}
              type="text"
              placeholder="What is happening?!"
              id="post"
            />
          </form>

          <div className="text-blue-400 flex items-center text-[15px] pb-2 gap-2 font-medium">
            {" "}
            <BsGlobeCentralSouthAsia /> Everyone can reply
          </div>

          <div className="w-[90%] h-[0.2px] my-2 bg-gray-800"></div>

          <div className=" text-blue-400 flex justify-between my-3 w-full">
            <div className="flex gap-5 items-center ">
              <form>
                <input
                  onChange={(e) => ImageSumbit(e)}
                  className="w-0 h-0 visibility: hidden "
                  type="file"
                  name="postImage"
                  label="Image"
                  id="image"
                />
                <label className="cursor-pointer" for="image">
                  <FaRegImage />
                </label>
              </form>

              <PiGifFill size="19px" />
              <MdEmojiEmotions size="19px" />
            </div>
            <div>
              {" "}
              <button
                onClick={(e) => handlePost(e)}
                className="bg-blue-500 text-white w-16 font-bold  h-8  mr-3 rounded-2xl"
                type="submit"
              >
                Post
              </button>
            </div>
          </div>
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

              _id,

              profileimage,
            },
            index
          ) => {
            return (
              <div key={_id} className="border-r border-gray-800 ">
                <div className="min-h-[60%] border-b border-gray-800">
                  <div className="text-white     ml-4 pt-5">
                    <div>
                      <div className="flex gap-5">
                        <img
                          alt="error"
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
                                alt="error"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="mr-3 mt-1">
                          <MdOutlineMoreHoriz />
                        </div>
                      </div>
                    </div>
                    <div className="flex ml-16 justify-between mr-11 pb-4  text-gray-500">
                      <div className="flex text-gray-500 gap-2 items-center text-[13px]">
                        <BsChat size="15px" />0
                      </div>
                      <div className="flex  cursor-pointer gap-2 items-center  text-[13px]">
                        <div>
                          <AiOutlineRetweet
                            id="retweet"
                            onClick={() => handleRetweet(index, _id)}
                            size="15px"
                            fill={
                              post[index].retweets.includes(postImage.user)
                                ? "Green"
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
                            onClick={() => handleLike(index, _id)}
                            size="12px"
                            fill={
                              post[index].likes.includes(postImage.user)
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
                        <MdOutlineSort size="15px" />1
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default Content;
