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
    followers: [],
    following: [],
    isAdmin: false,
    desc: "",
    from: "",
    posts: ["61d99a60a3287d785d97bece", "61d99b06a3287d785d97bed7"],
    createdAt: "2022-01-07T09:34:11.570Z",
    updatedAt: "2022-01-09T11:59:58.752Z",
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
