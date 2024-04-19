import { useState } from "react";
import { LinksItems } from "../types/SidebarItemsHome";
import { DropdownLinkSidebar } from "./DropdownComponentLink";

export default function Sidebar() {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenMin, setOpenMin] = useState(false);


    function handleOpenClick() {
        setIsOpen(!isOpen)
    }
    function handleOpenMin() {
        setOpenMin(!isOpenMin)
    }


    const baseClass = 'h-screen scroll-perso border-r-1 border-gray-600 absolute z-20 overflow-x-hidden transition-all custom-scrollbar-aside duration-300 bg-dashboard-third';
    const hoverClass = isHovered ? 'w-48 overflow-y-scroll' : 'w-20';
    const openMinClass = isOpenMin ? '' : 'max-sm:hidden';
    const classPersoSide = `${baseClass} ${hoverClass} ${openMinClass}`;

    return (
        <>
            <button className="absolute top-5 right-4 p-2 sm:hidden rounded-lg bg-gray-950/90  text-white z-20" onClick={() => handleOpenMin()}>
                {
                    isOpenMin ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) :
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )
                }
            </button>
            <aside
                className={classPersoSide}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="bg-dashboard-third scroll-perso flex border-none p-3 justify-center items-center border-b border-gray-600">
                    <img className="w-10" src="../../src/assets/react.svg" alt="Logo" />
                </div>
                <div className={`flex mt-5 flex-col ${!isHovered && 'items-center'}  mx-2`}>
                    <DropdownLinkSidebar
                        ITEM_NAME="Dashboard"
                        ITEM_TOP_NAME="DASHBOARD"
                        isHovered={isHovered}
                        handleOpenClickPages={handleOpenClick}
                        isOpenPages={isOpen}
                        LinksItems={LinksItems}
                        IconSVG={(isHovered: boolean) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`${isHovered ? 'w-5' : 'bg-gray-800/50 p-3 w-11'} rounded-lg `}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>)
                        }
                    />
                </div>
            </aside>
        </>
    )
}
