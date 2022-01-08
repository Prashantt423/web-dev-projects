import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  user: {
    _id: "61d80913c6b8a7fa057f3321",
    username: "prashant",
    email: "impktk@gmail.com",
    password: "$2b$10$lilXbkTZjPKi50SexREsb.3BGKsr6G4KTJPNHDZDBLnC6beGYbdPS",
    profilePic: "",
    coverPic: "",
    followers: ["61d80a18c6b8a7fa057f3332"],
    following: ["61d80a18c6b8a7fa057f3332"],
    isAdmin: false,
    desc: "",
    from: "",
    posts: [
      "61d8096ac6b8a7fa057f3326",
      "61d8097fc6b8a7fa057f332a",
      "61d80991c6b8a7fa057f332e",
      "61d88f28b98b0f35ec77860a",
      "61d88fe85713a9184024e789",
      "61d890045713a9184024e78d",
    ],
    createdAt: "2022-01-07T09:34:11.570Z",
    updatedAt: "2022-01-07T19:09:58.134Z",
    __v: 0,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
