import React from "react";
import { MDBSwitch } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const { adminView } = useSelector((state) => state?.inventory);
  const dispatch = useDispatch();

  return (
    <div className="dashboard-nav">
      <div className="nav-options">
        <span className="small-text">admin</span>
        <MDBSwitch
          checked={!adminView}
          onChange={() =>
            dispatch({
              type: "CHANGE_VIEW",
            })
          }
        />
        <span className="small-text">user</span>
      </div>
    </div>
  );
};

export default Navigation;
