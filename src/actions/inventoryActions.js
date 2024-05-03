import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const fetchSucc = (data) => {
  return {
    type: "FETCH_SUCCESS",
    payload: data,
  };
};

const fetchFail = (message) => {
  return {
    type: "FETCH_ERR",
    payload: message,
  };
};

const startFetch = () => {
  return {
    type: "START_FETCH",
    payload: null,
  };
};

const fetchInventory = () => {
  return async (dispatch) => {
    try {
      dispatch(startFetch());
      let data = await axios.get(
        "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
      );
      data = data?.data?.map((inv) => ({ ...inv, id: uuidv4() }));
      dispatch(fetchSucc(data));
    } catch (error) {
      dispatch(fetchFail({ err: "failed to get inventory" }));
    }
  };
};

export { fetchInventory };
