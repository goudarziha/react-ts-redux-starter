import * as React from "react";
import * as _ from "lodash";

interface AvatarProps {
  name: string;
  size: number;
  url?: string;
}

const Avatar = ({ name, size, url, ...props }: AvatarProps) => {
  const avatarUrl = (name: string, size: number): string => {
    return `https://ui-avatars.com/api/?name=${name}&size=${size}`;
  };
  return (
    <img
      src={!_.isEmpty(url) ? url : avatarUrl(name, size)}
      alt={name}
      style={{
        borderRadius: size / 2,
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        color: "white",
        fontSize: size / 2.2
      }}
      {...props}
      data-testid="avatar-test"
    />
  );
};

Avatar.defaultProps = {
  size: 32
};
export default Avatar;
