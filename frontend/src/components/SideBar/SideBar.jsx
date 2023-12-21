import "./SideBar.css";

const SideBar = ({children}) => {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>
                        Auth Service
                    </h2>
                </div>
                <div className="sidebar-body">
                    {children}
                </div>
                <div className="sidebar-footer">
                    <b>Theme toggle</b> or not
                </div>
            </div>
        </>
    )
}

export default SideBar;