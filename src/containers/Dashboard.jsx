import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfoCard from "../components/Inventory/InfoCard";
import Navigation from "../components/Inventory/Navigation";
import InventoryTable from "../components/Inventory/InventoryTable";
import { fetchInventory } from "../actions/inventoryActions";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBSpinner,
} from "mdb-react-ui-kit";

const Home = () => {
  const { inventory, cardData } = useSelector((state) => state?.inventory);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const dispatch = useDispatch();

  const handleEdit = (data) => {
    let formattedData = {
      ...data,
      price:
        data.price.length > 1 && data?.price?.substr(0, 1) === "$"
          ? parseFloat(data.price.slice(1))
          : parseFloat(data.price),
      value:
        data.value.length > 1 && data?.value?.substr(0, 1) === "$"
          ? parseFloat(data.value.slice(1))
          : parseFloat(data.value),
    };
    setEditItem(formattedData);
    setShowModal(!showModal);
  };

  const updateItem = (key, value) => {
    setEditItem((editItem) => ({ ...editItem, [key]: value }));
  };

  const handleSave = () => {
    dispatch({ type: "EDIT_ITEM", payload: editItem });
    setShowModal(false);
  };

  useEffect(() => {
    if (inventory?.fetching || inventory?.data) return;
    dispatch(fetchInventory());
  }, []);

  useEffect(() => {
    if (!inventory?.data) return;

    dispatch({ type: "CAL_CARD_DATA", payload: inventory?.data });
  }, [inventory?.data]);

  return (
    <div className="dashboard-container">
      <Navigation />
      {inventory?.data ? (
        <div className="inventory">
          <div className="inventory-title large-text">Inventory stats</div>
          <div className="inventory-card-container">
            <InfoCard
              cardTitle="Total product"
              cardValue={cardData?.totalProducts}
            />
            <InfoCard
              cardTitle="Total store value"
              cardValue={cardData?.totalStoreValue}
            />
            <InfoCard
              cardTitle="Out of stocks"
              cardValue={cardData?.outOfStocks}
            />
            <InfoCard
              cardTitle="No of Category"
              cardValue={cardData?.totalCategories}
            />
          </div>
          <InventoryTable handleEdit={handleEdit} />
        </div>
      ) : (
        <div className="loading-data">
          <MDBSpinner />
        </div>
      )}
      <MDBModal
        open={showModal}
        onClose={() => setShowModal(false)}
        tabIndex="-1"
        className="edit-modal"
      >
        <MDBModalDialog>
          <MDBModalContent>
            <div className="edit-modal-top">
              <div>Edit product</div>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setShowModal(false)}
              ></MDBBtn>
            </div>
            <MDBModalBody>
              <div className="product-title medium-text">{editItem?.name}</div>
              <div className="input-section">
                <div className="ig">
                  <div className="input-label">Category</div>
                  <input
                    type="text"
                    value={editItem?.category}
                    onChange={(e) => updateItem("category", e.target.value)}
                    name=""
                    id=""
                  />
                </div>
                <div className="ig">
                  <div className="input-label">Price</div>
                  <input
                    type="number"
                    value={editItem?.price}
                    onChange={(e) => updateItem("price", e.target.value)}
                    name=""
                    id=""
                  />
                </div>
              </div>
              <div className="input-section">
                <div className="ig">
                  <div className="input-label">Quantity</div>
                  <input
                    type="number"
                    value={editItem?.quantity}
                    onChange={(e) => updateItem("quantity", e.target.value)}
                    name=""
                    id=""
                  />
                </div>
                <div className="ig">
                  <div className="input-label">Value</div>
                  <input
                    type="number"
                    value={editItem?.value}
                    onChange={(e) => updateItem("value", e.target.value)}
                    name=""
                    id=""
                  />
                </div>
              </div>
              <div className="edit-actions">
                <button className="cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="save" onClick={() => handleSave()}>
                  Save
                </button>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default Home;
