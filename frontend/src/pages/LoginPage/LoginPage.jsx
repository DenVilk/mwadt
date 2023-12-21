import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import InputField from "../../components/InputField/InputField";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import { authorize } from "../../redux/slices/auth";
import authService from "../../services/auth.service";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import './LoginPage.css';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ login: null, pass: null })
    const isAuthorized = useSelector(state => state.auth.isAuthorized)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [googleUser, setGoogleUser] = useState();

    const login = async (e) => {
        e.preventDefault();
        console.log(credentials);
        if (!credentials.login || !credentials.pass) {
            alert("Login or password cannot be empty.");
            return;
        }
        let token = await authService.login(credentials.login, credentials.pass);
        console.log(token);
        if (token) dispatch(authorize({ token: token }));
        else alert("Error while authorizing");
    }

    const loginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setGoogleUser(codeResponse)
            console.log(codeResponse)
        },
        onError: (error) => console.log("Login Failed:", error)
    })


    useEffect(() => {
        if (googleUser) {
            console.log(1)
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${googleUser.access_token}`,
                        Accept: "application/json",
                    },
                }
            ).then(async (res) => {
                console.log(res.data);
                let token = await authService.loginWithGoogle(res.data.email, res.data.id);
                if (token) dispatch(authorize({token: token}));
                else alert("Error while authorizing");
            })
        }
    }, [googleUser])

    useEffect(() => {
        if (isAuthorized) navigate('/')
    }, [isAuthorized])

    return (
        <>
            <Card className='card-login'>
                <Logo minified />
                <hr />
                <h3 style={{ textAlign: "center", margin: 0, marginBottom: "15px" }}>Login</h3>
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
                <Button style={{ marginTop: "auto" }} onClick={login} color="bg-blue" type="submit">Log In</Button>
                <Button style={{ marginTop: "auto" }} onClick={loginWithGoogle} type="submit">login with google</Button>
                <p style={{ fontSize: "14px", textAlign: "center" }}>You can register <a style={{ "textDecoration": "underline" }} onClick={() => { navigate('/register') }}>here</a></p>
            </Card>
        </>
    )
}

export default LoginPage;