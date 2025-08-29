import { useState, useEffect } from "react";
import { HiOutlineHome, HiOutlineUser, HiMenu, HiX } from "react-icons/hi";
import { FaRegCreditCard, FaExchangeAlt, FaUserCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useIsMobile from "../../libs/helpers/isMobile";

const Sidebar = ({ baseUrl = "/dashboard" }) => {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(!isMobile);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsCollapsed(!isMobile);
  }, [isMobile]);

  const size = isCollapsed ? 16 : 18;

  const menuItems = [
    { icon: <HiOutlineHome size={size} />, label: "Dashboard", link: "/" },
    {
      icon: <FaExchangeAlt size={size} />,
      label: "Transactions",
      link: "/transactions",
    },
    // { icon: <HiOutlineUser size={size} />, label: "Profile", link: "/" },
    {
      icon: <FaRegCreditCard size={size} />,
      label: "Send Proof Of Payment",
      link: "/proof-of-payment",
    },
    {
      icon: <FaUserCog size={size} />,
      label: "Account Setting",
      link: "/account-setting",
    },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-1 left-4 z-50 p-2 bg-gray-50 rounded shadow"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-gray-50 mt-10 flex flex-col transition-all duration-300 transform z-40
          ${isCollapsed ? "w-16" : "w-54"} 
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 shadow
        `}
        onMouseEnter={() => !isMobile && setIsCollapsed(false)}
        onMouseLeave={() => !isMobile && setIsCollapsed(true)}
      >
        <ul className="flex flex-col mt-4 gap-2 p-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === `${baseUrl}${item.link}`;
            return (
              <li key={item.label}>
                <Link
                  to={`${baseUrl}${item.link}`}
                  className={`
                    flex items-center gap-3 p-3 rounded-md transition-colors duration-200
                    ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100 hover:text-blue-300"}
                  `}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.icon && (
                    <span
                      className={isActive ? "text-blue-600" : "text-gray-500"}
                    >
                      {item.icon}
                    </span>
                  )}
                  {(!isCollapsed || isMobileOpen || isMobile) && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-gray-200 bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
