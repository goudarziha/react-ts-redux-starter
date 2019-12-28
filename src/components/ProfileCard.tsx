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
      <Avatar name={username} size={64} />
      <div className="card-body">
        <p className="card-text">{username}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">{created}</small>
      </div>
    </div>
  );
};

export default ProfileCardProps;
