import * as React from "react";
import _ from "lodash";
import Avatar from "./Avatar";

interface ProfileCardProps {
  avatar: string;
  username: string;
  created: string;
  email: string;
}

const ProfileCardProps = ({
  avatar,
  username,
  created,
  email,
  ...props
}: ProfileCardProps) => {
  return (
    <div className="card">
      <div className="card-body">{username}</div>
    </div>
  );
};

export default ProfileCardProps;
