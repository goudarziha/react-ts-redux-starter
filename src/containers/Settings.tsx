import * as React from "react";
import * as _ from "lodash";
import { ProfileForm, ChangePasswordForm } from "../components";

const Settings = () => {
  return (
    <div className="container">
      <h2>Settings</h2>
      <div className="row">
        <div className="col-4">
          <ul className="nav flex-column nav-pills">
            <li className="active">
              <a data-toggle="pill" href="#example1">
                Profile
              </a>
            </li>
            <li>
              <a data-toggle="pill" href="#example2">
                Password
              </a>
            </li>
          </ul>
        </div>

        <div className="col-8">
          <div className="tab-content">
            <div id="example1" className="tab-pane fade in active">
              <h3>Profile</h3>
              <ProfileForm />
            </div>

            <div id="example2" className="tab-pane fade">
              <h3>Change Password</h3>
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
