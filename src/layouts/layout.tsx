import Sidebar from "../components/Sidebar";
import { ReactNode } from "react";

type LayoutProps = {
    children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Sidebar />
            {children}
        </>
    )
}