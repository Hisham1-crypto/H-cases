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
import BabeShark from "./BabeShark/BabeShark"
import TigerCase from "./TigerCase/TigerCase"
import LvCase from "./LvCase/LvCase";
import EvileEye from "./EvileEye/EvileEye";
import Porche911 from "./Porche911/Porche911";
import LufiCase from "./LufiCase/LufiCase";
import LabubuCase from "./LabubuCase/LabubuCase";
import Costume from "./Costume/Costume";
import Minibag from "./Minibag/Minibag";
import Funnybag from "./Funnybag/Funnybag";
import Laptopsleeve from "./Laptopsleeve/Laptopsleeve";
import Laptopsleeve1 from "./Laptopsleeve1/Laptopsleeve1";
import Funnybagdetails from "./Funnybagdetails/Funnybagdetails"
import Minibagdetails from "./Minibagdetails/Minibagdetails"
import Phonecoverdetails from "./Phonecoverdetails/Phonecoverdetails";
import ScrollToTop from "./ScrollToTop";
import PhonecoverPage from "./PhonecoverPage/PhonecoverPage";

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
                <ScrollToTop /> 
          <div>
            <Routes>
              <Route path="/shoppingbag" element={<Shoppingbag />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/babeshark" element={<BabeShark/>}/>
              <Route path="/tigercase" element={<TigerCase/>}/>
              <Route path="/evileeye" element={<EvileEye/>}/>
              <Route path="/lvcase" element={<LvCase/>}/>
              <Route path="/porsche911" element={<Porche911/>}/>
              <Route path="/luficase" element={<LufiCase/>}/>
              <Route path="/labubu" element={<LabubuCase/>}/>
              <Route path="/costume" element={<Costume/>}/>
              <Route path="/minibag" element={<Minibag/>}/>
              <Route path="/minibagdetails/:id" element={<Minibagdetails/>}/>
              <Route path="/funnybag" element={<Funnybag/>}/>
              <Route path="/funnybagdetails/:id" element={<Funnybagdetails/>}/>
              <Route path="/laptopsleeve" element={<Laptopsleeve/>}/>
              <Route path="/laptopsleeve/:id" element={<Laptopsleeve1/>}/>
              <Route path="/phonedetails/:id" element={<Phonecoverdetails/>}/>
              <Route path="/phonecover" element={<PhonecoverPage/>}/>


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
