import { useEffect } from "react"
import { useLocation } from "react-router-dom";


function Following() {
    const location = useLocation()

    useEffect(() => {
        document.title = 'Following - Watch videos from creators you follow | TikTok'
    }, [location.pathname])

    return (
        <h1>Following page</h1>
    );
}

export default Following;