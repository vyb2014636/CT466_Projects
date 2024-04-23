import React from "react";
import { useParams } from "react-router-dom";
const Profile = () => {
  const { id_user } = useParams();
  console.log(id_user);
  return <div>Profile</div>;
};

export default Profile;
