"use client"
import { Link } from "react-router-dom";
import { LinkItem } from "../types/assets/LinkItem";

// Aca creamos una interfaz para los props que recibira el componente DropdownLinkSidebar
interface PropsItemsDropdown {
    isHovered: boolean;
    handleOpenClickPages: () => void;
    isOpenPages: boolean;
    LinksItems: LinkItem[];
    ITEM_NAME: string;
    ITEM_TOP_NAME?: string;
    IconSVG: (isHovered: boolean) => JSX.Element;
}


export const DropdownLinkSidebar: React.FC<PropsItemsDropdown> = ({ isHovered, ITEM_TOP_NAME, handleOpenClickPages, isOpenPages, LinksItems, ITEM_NAME, IconSVG }) => {
    return (
        <>
            {
                ITEM_TOP_NAME ? (
                    <h1 className={`text-gray-300 mb-2 mt-4 text-xs ${isHovered ? 'ml-2' : 'ml-0'}`}>

                        {isHovered ? (
                            ITEM_TOP_NAME.toUpperCase()
                        ) : (
                            <div className="rounded-full h-2 w-2 border"></div>
                        )}
                    </h1>
                ) : (
                    ''
                )
            }
            <button onClick={() => handleOpenClickPages()} className={`text-white  ${isHovered ? 'bg-gray-800/90 mt-3 p-3' : ''} w-full  rounded-lg flex justify-between items-center gap-3 text-xs p-2 duration-200 transition-all`}>
                {
                    IconSVG(isHovered)
                }
                <p className={` ${isHovered ? '' : 'hidden'}`}>
                    {ITEM_NAME}
                </p>
                <p className={`${isHovered ? '' : 'hidden'}`}>{
                    isOpenPages ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    )
                        :
                        (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        )
                }
                </p>
            </button>
            <ul className={`ml-6 flex flex-col gap-5 text-xs ${isOpenPages ? 'mt-3 mb-2' : ''} ${isHovered ? '' : 'hidden'}`}>
                {isOpenPages && (
                    isHovered && (
                        <>
                            {
                                LinksItems.map((item, index) => {
                                    return (
                                        <Link to={item.href} key={index} className="flex font-semibold text-gray-300 transition-all hover:text-white gap-2 items-center">
                                            <li className="list-disc">
                                                {item.name}
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </>
                    )
                )}
            </ul>
        </>
    )
}