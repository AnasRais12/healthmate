"use client"
import { useEffect, useState } from "react";
import PWAHome from "@/components/userComponent/PWAHome";
import Home from '@/components/userComponent/Home'
import { useReduxState } from '@/hooks/useAppUtils'
import Dashboard from '@/components/userComponent/Dashboard'
import useIsPWA from "@/hooks/useIsPWA";

const page = () => {
  const { userInfo } = useReduxState()
  const isPWA = useIsPWA();
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    // show splash only when opened as PWA and not dismissed before
    const dismissed = localStorage.getItem("pwa_home_dismissed");
    if (isPWA && !dismissed) {
      setShowHome(true);
    }
  }, [isPWA]);

  const handleEnter = () => {
    localStorage.setItem("pwa_home_dismissed", "1");
    setShowHome(false);
  };

  if (showHome) return <PWAHome onEnter={handleEnter} />;
  return (
    <>

      {!userInfo?.id ? <Home /> : <Dashboard />}
    </>
  )
}

export default page
