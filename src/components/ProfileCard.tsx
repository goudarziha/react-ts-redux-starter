/** @jsx jsx */
import * as React from "react";
import _ from "lodash";
import Avatar from "./Avatar";
import { jsx, css } from "@emotion/core";
import Moment from "react-moment";

interface ProfileCardProps {
  avatar?: string;
  bio: string;
  username: string;
  created: string;
}

const ProfileCardProps = ({
  avatar,
  bio,
  username,
  created,
  ...props
}: ProfileCardProps) => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="card align-items-center"
        css={css`
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        `}
      >
        {!avatar && (
          <Avatar
            name={username}
            size={128}
            style={{ top: "-30px", position: "relative", zIndex: 99 }}
          />
        )}
        <div className="d-flex flex-column card-body align-items-center">
          <h5 className="card-text">{username}</h5>
          <p className="card-text">{bio}</p>
        </div>
        <div className="card-footer w-100">
          <div className="d-flex">
            <small className="text-muted">
              created: <Moment format="MMM YYYY">{created}</Moment>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardProps;
