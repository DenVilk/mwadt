import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import secureAPI from "../utils/secureHttp"
import Page from "../components/Page/Page"
import { API_URL } from "../config/api"


const ProfilePage = () => {
    const user = useSelector(state => state.auth.user)
    const [userInfo, setUserInfo] = useState() 
    const [ready, setReady] = useState(false)

    useEffect(()=>{
        secureAPI.get(`${API_URL}user-management/users/${user.user_id}`).then(response=>{
            console.log(response.data)
            setUserInfo(response.data)
            setReady(true)
        })
    }, [])

    return (
        <Page>
            {ready ? (
                <>
                    <h2>UserId: {user.user_id}</h2> 
                    <ul>
                        <li>Username: {userInfo.username}</li>
                        <li>Name: {userInfo.firstname}</li>
                        <li>Midname: {userInfo.midname}</li>
                        <li>Surname: {userInfo.lastname}</li>
                    </ul>
                </>
            ):( 
                <h3>Loading...</h3>
            )}
        </Page>
    )
}

export default ProfilePage;