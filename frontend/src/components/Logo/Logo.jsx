import LogoImg from "../../assets/prodigy.svg"
import "./Logo.css"

const Logo = ({minified}) => {
    return (
        <>
            <div className="logo">
                <img src={LogoImg} alt="" />
                {minified && <p>Prodigy</p>}
            </div>
        </>
    )
}

export default Logo;