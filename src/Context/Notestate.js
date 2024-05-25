import NoteContext from "./Notecontext";

import { useState } from "react";

const Notestate = (props) => {
  const userInitial = [];
  const [user, setUser] = useState(userInitial);

  const [post, setPost] = useState([]);
  const [alluser, setalluser] = useState([]);

  const loginUser = async (email, password) => {
    const response = await fetch("http://localhost:5000/twitter/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    return json;
  };

  const getUser = async () => {
    const response = await fetch("http://localhost:5000/twitter/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const users = await response.json();

    if (users._id && user.length == 0) {
      setUser(user.concat(users));
    }
    return users;
  };

  const getallUser = async () => {
    const response = await fetch("http://localhost:5000/twitter/getalluser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const users = await response.json();
    if (alluser.length != 5) {
      setalluser(alluser.concat(users));
    }

    return users;
  };

  const getPost = async () => {
    const response = await fetch("http://localhost:5000/twitter/getpost", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    const json = await response.json();
    setPost(json);
    return json;
  };

  const addPost = async (
    image,
    description,
    userName,
    user,
    name,
    profileimage
  ) => {
    const response = await fetch("http://localhost:5000/twitter/addpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        user,
        userName,
        description,
        name,
        profileimage,
      }),
    });

    const json = await response.json();
    setPost(post.concat(json));
  };

  const deletePost = async (id) => {

    const response = await fetch(
      `http://localhost:5000/twitter/deletepost/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   
    const newPost = post.filter((post) => {
      return post._id !== id;
    });
    setPost(newPost);
  };

  const updatePostLike = async (_id, user) => {
    const response = await fetch(
      `http://localhost:5000/twitter/updatepostlike/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      }
    );

     await response.json();

    const res = await getPost();
    setPost(res);
  };

  const follow = async (id, uid) => {
    const response = await fetch(
      `http://localhost:5000/twitter/follow/${uid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    );

     await response.json();
   
  };

  const updatePostRetweet = async (_id, user) => {
    const response = await fetch(
      `http://localhost:5000/twitter/updatepostretweet/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      }
    );

     await response.json();

    const res = await getPost();
    setPost(res);
  };

  return (
    <NoteContext.Provider
      value={{
        user,
        getUser,
        post,
        addPost,
        getPost,
        updatePostLike,
        updatePostRetweet,
        loginUser,
        alluser,
        getallUser,
        follow,
        deletePost,
      }}
    >
      {props.children} {/*children components passing props*/}
    </NoteContext.Provider>
  );
};

export default Notestate;
