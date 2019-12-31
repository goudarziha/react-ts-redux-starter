/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import * as React from "react";
import _ from "lodash";

interface PasswordInputProps {
  name?: string;
  placeholder?: string;
  ref?: any;
  className?: string;
}

const PasswordInput = ({
  name,
  placeholder,
  ref,
  className
}: PasswordInputProps) => {
  const [visible, setVisible] = React.useState<boolean>();
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <span
        css={css`
          position: absolute;
          top: 6px;
          left: 8px;
        `}
        onClick={() => setVisible(!visible)}
        data-testid="password-icon"
      >
        <i
          className="fa fa-eye"
          aria-hidden="true"
          css={css`
            color: ${visible ? "black" : "gray"};
          `}
        ></i>
      </span>
      <input
        type={visible ? "text" : "password"}
        name={name}
        ref={ref}
        className={className}
        placeholder={placeholder}
        css={css`
          text-indent: 32px;
        `}
        data-testid="password-input"
      />
    </div>
  );
};

export default PasswordInput;
