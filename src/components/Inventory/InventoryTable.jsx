import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import edit from "../../assets/images/edit.png";
import trash from "../../assets/images/trash.png";
import visible from "../../assets/images/visible.png";
import invisible from "../../assets/images/disabled.png";
import classNames from "classnames";

const InventoryTable = ({ handleEdit }) => {
  const { inventory, adminView } = useSelector((state) => state?.inventory);
  const dispatch = useDispatch();

  return (
    <div className="inventory-table">
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th scope="col">
              <div className="table-title small-text">Name</div>
            </th>
            <th scope="col">
              <div className="table-title small-text">Category</div>
            </th>
            <th scope="col">
              <div className="table-title small-text">Price</div>
            </th>
            <th scope="col">
              <div className="table-title small-text">Quantity</div>
            </th>
            <th scope="col">
              <div className="table-title small-text">Value</div>
            </th>
            <th scope="col">
              <div className="table-title small-text">ACTION</div>
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {inventory?.data?.map((item, index) => (
            <tr
              key={index}
              className={classNames({
                disabled: item?.visibility === 0,
              })}
            >
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.value}</td>
              <td className="table-icons">
                <button
                  disabled={!adminView || item?.visibility === 0}
                  onClick={() => handleEdit(item)}
                >
                  <img src={edit} alt="" />
                </button>
                <button
                  disabled={!adminView || item?.visibility === 0}
                  onClick={() =>
                    dispatch({ type: "DISABLE_ITEM", payload: item.id })
                  }
                >
                  <img
                    src={item?.visibility === 0 ? invisible : visible}
                    alt=""
                  />
                </button>
                <button
                  disabled={!adminView || item?.visibility === 0}
                  onClick={() =>
                    dispatch({ type: "DELETE_ITEM", payload: item.id })
                  }
                >
                  <img src={trash} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default InventoryTable;
