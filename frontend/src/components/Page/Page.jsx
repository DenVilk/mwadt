import SideBar from "../SideBar/SideBar"
import Content from "../Content/Content"
import Header from "../Header/Header"
import './Page.css'

const Page = ({children}) => {
    return (
        <div className="page">
            <Header/>
            <Content>
                {children}
            </Content>
        </div>
    )
}

export default Page;