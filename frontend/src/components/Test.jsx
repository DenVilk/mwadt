import axios from "axios";
import { API_URL } from "../config/api";
import Page from "./Page/Page";
import { useEffect, useState } from "react";

const Test = () => {
    const [loaded, setLoaded] = useState(false)
    const [image, setImage] = useState('')
    const [smth, setSmth] = useState('')
    
    useEffect(()=>{
        axios.get('https://api.thecatapi.com/v1/images/search').then(res=>{
            setImage(res.data[0].url);
            console.log(res);
        });
        axios.get('http://numbersapi.com/random/trivia').then(res=>{
            setSmth(res.data);
            console.log(res);
        })
    }, [])

    useEffect(()=>{
        if (image && smth) setLoaded(true);
    }, [image, smth])

    return (
        <Page>
            {
                loaded && 
                <>
                <img src={image} />
                <p>{smth}</p>
                </>
            }
        </Page>
    )
}

export default Test;