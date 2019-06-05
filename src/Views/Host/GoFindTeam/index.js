import React from "react";

import CorrelateLogo from "../../../Components/Branding";
import HostTeamJoiningBoxes from "../../../Components/HostTeamJoiningBoxes";

import PropTypes from "prop-types";
import defaultJoinedRoom from "../../../defaultProps";

import css from "./GoFindTeam.module.css";

function GoFindTeam({ joinedRoom }) {
  return (
    <div>
      <CorrelateLogo />
      <br />
      <div className={css.boxes}>
        <HostTeamJoiningBoxes {...joinedRoom} />
      </div>
    </div>
  );
}

export default GoFindTeam;
