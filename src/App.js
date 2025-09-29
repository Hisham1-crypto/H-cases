import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
} from "react-router-dom";
import Shoppingbag from "./Shoppingbag/Shoppingbag";
import NavBar from "./NavBar/NavBar";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Favourites from "./Favourites/Favourites";
import Checkout from "./Checkout/Checkout";
import Signup from "./Signup/Signup";
import { CartProvider } from "./CartContext";
import { FavoritesProvider } from "./FavoritesProvider";
import Payment from "./Payment/Payment";
import AuthProvider, { AuthContext } from "./AuthProvider";
import RapScene from "./RapScene/RapScene"
import BabeShark from "./BabeShark/BabeShark"
import TigerCase from "./TigerCase/TigerCase"
import CarCase from "./CarCase/CarCase"



const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <div>
            <Routes>
              <Route path="/shoppingbag" element={<Shoppingbag />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/rapscene" element={<RapScene/>}/>
                            <Route path="/babeshark" element={<BabeShark/>}/>
                                          <Route path="/tigercase" element={<TigerCase/>}/>
                                                        <Route path="/carcase" element={<CarCase/>}/>
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
