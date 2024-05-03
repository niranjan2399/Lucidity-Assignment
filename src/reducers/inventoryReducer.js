const initialState = {
  adminView: true,
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_FETCH":
      return {
        ...state,
        inventory: {
          fetching: true,
        },
      };
    case "FETCH_ERR":
      return {
        ...state,
        inventory: {
          err: action.payload.err,
          fetching: false,
        },
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        inventory: {
          data: action.payload,
          fetching: false,
        },
      };
    case "CAL_CARD_DATA":
      console.log("calll", action.payload);
      const categories = new Set(
        action.payload
          .filter((item) => item?.visibility !== 0)
          .map((item) => item.category)
      );

      return {
        ...state,
        cardData: {
          totalProducts: action.payload
            .filter((item) => item?.visibility !== 0)
            .reduce((accumulator, item) => {
              return accumulator + Number(item.quantity);
            }, 0),
          totalStoreValue: action.payload
            .filter((item) => item?.visibility !== 0)
            .reduce((accumulator, item) => {
              const valueWithoutDollarSign =
                item.value.length > 1 && item.value.substr(0, 1) === "$"
                  ? parseFloat(item.value.slice(1))
                  : parseFloat(item.value);
              return accumulator + valueWithoutDollarSign;
            }, 0),
          outOfStocks: action.payload.filter(
            (item) => !item.quantity && item?.visibility !== 0
          )?.length,
          totalCategories: categories.size,
        },
      };
    case "EDIT_ITEM":
      return {
        ...state,
        inventory: {
          ...state.inventory,
          data: state.inventory.data.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }

            return item;
          }),
        },
      };

    case "DELETE_ITEM":
      return {
        ...state,
        inventory: {
          ...state.inventory,
          data: state.inventory.data.filter(
            (product) => product.id !== action.payload
          ),
        },
      };
    case "DISABLE_ITEM":
      return {
        ...state,
        inventory: {
          ...state.inventory,
          data: state.inventory.data.map((product) => {
            if (product.id === action.payload) {
              product = {
                ...product,
                visibility: product?.visibility === 0 ? 1 : 0,
              };
            }

            return { ...product };
          }),
        },
      };
    case "CHANGE_VIEW":
      return { ...state, adminView: !state.adminView };
    default:
      return state;
  }
};
