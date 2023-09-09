// eslint-disable-next-line no-unused-vars
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


const MainLayout = (Component) => function HOC(){
  return (
    

      <div className="flex bg-slate-200">
        <Sidebar />
        <div className="flex flex-col flex-grow ">
        <Navbar />
        <main className="p-2 bg-white rounded-lg  h-full justify-center m-2">
         <Component/>
          </main>
        </div>
      </div>
     
  
  );
};

export default MainLayout;