import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiBell } from 'react-icons/fi';
import { FiMenu } from 'react-icons/fi';
import { GlobalDetails } from '@/context/commonContext';
import { Sidebar } from "./Sidebar"
import { useAppUtils, useReduxState } from '@/hooks/useAppUtils';

export const SidebarWrapper = ({ children, headerText, showHeader = true }) => {
    return (
        <div className="  flex  bg-gray-100  removeScroll">
            <style jsx>{`
        .customGradient {
          background-image: linear-gradient(to right, #111827, #1f2937);
        }
      `}</style>

            {/* Sidebar */}

            <Sidebar />
            {/* Main Content */}
            <div
                className={`
        flex-1 transition-all   h-screen overflow-y-auto  duration-300
        `}
            >
                {showHeader && (
                    <Header text={headerText} />
                )}
                <main className=" sm:p-4 p-2 lg:p-6 ">
                    {children}
                </main>
            </div>
        </div>
    )
}





function Header({ text }) {
    // const session = useSession();
    const { sidebarOpen, setSidebarOpen } = GlobalDetails()
    return (
        <header className="flex  justify-between w-full  items-center sm:mb-0 mb-2  py-4 px-2     ">
            <div className=" flex-col w-full flex items-start  ">
                <div className="w-full items-center flex lg:justify-end justify-between ">
                    <button
                        className="lg:hidden sm:ml-[-98%] ml-[-92%]  p-2 mb-3 w-full flex justify-end items-end text-lg   rounded-lg text-white bg-primary"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <FiMenu className="text-lg text-white" />
                    </button>

                </div>
                <div className=" w-full">
                    <Banner text={text} />
                </div>
                <div>
                </div>
            </div>

        </header>

    )
}





const Banner = (props) => {
    const Navigator = useRouter();
    const { router } = useAppUtils()
    const { userInfo } = useReduxState()


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <div className="w-full flex flex-col    bg-primary px-4 sm:px-6 md:px-10 py-2 md:py-3 lg:py-4 text-white gap-0    rounded-md">
            <div
                className={`w-full flex relative   justify-between ${props?.heading ? 'items-end' : 'items-center'}`}
            >
                <h1 className="md:text-[30px] sm:text-[25px] text-[22px] capitalize ">
                    {props?.text}
                </h1>
                <button
                    className="rounded-full relative bg-white   "
                    onClick={() => router.push('/profile')}
                >
                    <img
                        src={userInfo?.avatar || "/default-avatar.png"} // fallback image
                        alt="User Avatar"
                        className="md:w-[40px] md:h-[40px] w-[40px] h-[40px] rounded-full object-cover"
                    />
                    <span className="absolute top-0 right-0 w-2 h-2  rounded-full"></span>
                </button>
                {/* <button className="p-2 mr-4 rounded-lg bg-gray-200 relative">
                          <FiBell className="text-gray-700 text-lg " />
                          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button> */}
                {isDropdownOpen && (
                    <div className="absolute z-50 top-full right-[-10px] sm:right-[-30px] mt-2 p-2 sm:p-4 py-6 bg-gray-100  text-black rounded  shadow-dark_green">
                        <p
                            onClick={() => Navigator.push('/login')}
                            className="p-3 bg-white mb-3 cursor-pointer  shadow- border-2 hover:bg-color_1 hover:text-white"
                        >
                            Login
                        </p>
                        <p onClick={() => Navigator.push('/profile')} className="p-3 bg-white  shadow-lg border-2 cursor-pointer hover:bg-color_1 hover:text-white">
                            Profile
                        </p>
                    </div>
                )}
            </div>
            <p className="md:text-[22px] text-[16px]">{props?.heading}</p>
        </div>
    );
};
