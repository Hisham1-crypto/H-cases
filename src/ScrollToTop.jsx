import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // لو مش عايزها تتحرك بسلاسة، شيل السطر ده
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
