import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import InputField from "../../components/InputField/InputField";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import { authorize } from "../../redux/slices/auth";
// import authService from "../../services/auth.service";
import userService from "../../services/users.service"
import './RegisterPage.css';

const RegisterPage = () => {
    const [credentials, setCredentials] = useState({ login: null, pass: null })
    const isAuthorized = useSelector(state => state.auth.isAuthorized)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const register = async (e) => {
        e.preventDefault();
        console.log(credentials);
        if (!credentials.login || !credentials.pass || !validateEmail(credentials.login)) {
            alert("Login or password cannot be empty.");
            return;
        }
        let token = await userService.register(credentials.login, credentials.pass);
        console.log(token);
        if (token) dispatch(authorize({token: token}));
        else alert("Error while registrating")
    }

    useEffect(()=>{
        if (isAuthorized) navigate('/')
    },[isAuthorized])

    return (
        <>
            <Card className='card-login'>
                <Logo minified/>
                <hr />
                <h3 style={{textAlign:"center", margin: 0, marginBottom:"15px"}}>Registration</h3>
                <form>
                    <InputField
                        name='login'
                        type='text'
                        id="login"
                        label="Email"
                        onChange={(e) => setCredentials({ ...credentials, login: e.target.value })}
                    />
                    <InputField
                        name='pass'
                        type='password'
                        id="pass"
                        label="Password"
                        onChange={(e) => setCredentials({ ...credentials, pass: e.target.value })}
                    />
                </form>
                <Button style={{marginTop: "auto"}} onClick={register} color="bg-blue" type="submit">Register</Button>
                <p style={{fontSize: "14px", textAlign: "center"}}>You can authorize <a style={{"textDecoration": "underline"}} onClick={()=>{navigate('/login')}}>here</a></p>
            </Card>
        </>
    )
}

export default RegisterPage;