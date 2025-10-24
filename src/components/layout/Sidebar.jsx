"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiShoppingBag, } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { FaChevronDown, FaShoppingBag } from 'react-icons/fa';
import { userRoutes } from '@/constant/routes';
import { GlobalDetails } from '@/context/commonContext';
import { useReduxState } from '@/hooks/useAppUtils';

const NavItem = ({ icon, title, link, subItems }) => {
    const pathname = usePathname();
    console.log(pathname);

    const { setSidebarOpen } = GlobalDetails()
    const [isOpen, setIsOpen] = useState(false);
    const isActive = pathname === link || (subItems && subItems.some(item => pathname === item.link));

    return (
        <div className="mx-2 mb-[0.6rem]">
            <Link
                href={link || ''}
                onClick={() => {
                    if (subItems) {
                        setIsOpen(!isOpen);
                    }
                    if (link) {
                        setSidebarOpen(false);
                    }
                }}
                className={`flex items-center  w-full px-4 py-2  hover:bg-white  hover:text-black transition-colors rounded-md ${isActive ? "bg-white text-black" : "text-gray-300"
                    }`}
            >
                <span className="text-xl mr-3">{icon}</span>
                <span className="flex-1 text-left">{title}</span>
                {subItems && (
                    <FaChevronDown
                        className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                )}
            </Link>
            {subItems && isOpen && (
                <div className="ml-6 mt-1">
                    {subItems.map((item, index) => (
                        <Link
                            onClick={() => setSidebarOpen(false)}
                            key={index}
                            href={item.link}
                            className={`flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors rounded-md ${pathname === item.link ? "bg-gray-700 text-white" : ""
                                }`}
                        >
                            <span>{item?.title}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export const Sidebar = () => {
    const { userInfo } = useReduxState()
    const { sidebarOpen, setSidebarOpen } = GlobalDetails()
    return (
        <aside
            className={`
        fixed lg:relative inset-y-0 left-0 z-40
        w-64 h-[100vh]   bg-primary
        transform transition-all duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
         shadow-2xl
      `}
        >
            {/* Sidebar Header with Logo and Close Button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                <Link href="/" className="flex items-center space-x-2">
                    <FiShoppingBag className="h-8 w-8 text-white" />
                    <span className="text-xl font-bold text-white">HealthMate</span>
                </Link>
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden p-2 rounded-full hover:bg-gray-700/50 text-white transition-colors"
                >
                    <RxCross2 className="h-5 w-5" />
                </button>
            </div>

            {/* User Profile Section */}
            {/* {session && (
                <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                            <FiUser />
                        </div>
                        {(sidebarOpen || window.innerWidth >= 640) && (
                            <div>
                                <p className="text-white font-medium truncate">
                                    {session?.user?.name || "User"}
                                </p>
                                <p className="text-gray-300 text-xs truncate">
                                    {session?.user?.email}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )} */}

            {/* Navigation Menu */}
            <nav className="mt-4">

                {userInfo?.user?.role === "admin" ? adminRoutes?.map((route, index) => {
                    return (
                        <NavItem
                            key={index}
                            icon={route.icon}  // 👈 ab yahan <Icon /> likho
                            title={route.label}
                            link={route.path}
                        />
                    );
                }) : userRoutes?.map((route, index) => {
                    return (
                        <NavItem
                            key={index}
                            icon={route.icon}
                            title={route.label}
                            link={route.path}
                        />
                    );
                })}


            </nav>
        </aside>
    );
}
