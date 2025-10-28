import {Outlet, Navigate} from "react-router-dom"
import Header from "../components/Header"

const useAuth = () => {
    const user = localStorage.getItem("access_token");

    return !!user;
};

export default function PrivateRoutes(){
    const isAuth = useAuth();

    if(!isAuth){
        return <Navigate to="/login"/>;
    }

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}