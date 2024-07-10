export const initialProductState = {
  data: [],
  loading: false,
  error: null,
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_PRODUCT_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_PRODUCT_FAILURE":
      return { ...state, loading: false, error: "Failed to fetch data" };
    case "ADD_PRODUCT_REQUEST":
      return { ...state, loading: true, error: null };
    case "ADD_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_PRODUCT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_PRODUCT_REQUEST":
      return { ...state, loading: true, error: null };
    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "UPDATE_PRODUCT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_PRODUCT_REQUEST":
      return { ...state, loading: true, error: null };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((product) => product.id !== action.payload),
      };
    case "DELETE_PRODUCT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
