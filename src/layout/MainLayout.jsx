// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = (Component) => function HOC(){
  return (
        <div className="flex bg-slate-300 relative">
    <Sidebar />
    {/* <MobileMenu mobile={showMenu} setMobile={setShowMenu} /> */}
    <div className="md:ml-60 flex flex-col flex-grow bg-slate-300">
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>
      <main className="relative h-full overflow-hidden  bg-white justify-center md:mt-2 ">
          <Component/>
      </main>      
    </div>
    {/* <ProfileCompletionPopup /> */}
  </div>
     
  
  );
};

export default MainLayout;