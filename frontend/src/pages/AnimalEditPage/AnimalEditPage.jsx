import Page from "../../components/Page/Page";
import InputField from "../../components/InputField/InputField";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AnimalEditPage = () => {
    const { animal_id = null } = useParams();
    const [ready, setReady] = useState();
    const [animal, setAnimal] = useState();
    const [isEdit, setIsEdit] = useState(true);

    const isAuthorized = useSelector(state => state.auth.isAuthorized)
    const user = useSelector(state => state.auth.user)

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            let url = `http://localhost:3000/api/animals/${animal_id}`;
            let response = await fetch(url);
            response.json().then(res => {
                setAnimal({
                    kind: res.kind.name,
                    description: res.description,
                    gender: res.gender,
                    age: res.age,
                    country: res.country.name,
                    countryId: res.country.id,
                    arrival_date: res.arrival_date
                });
                setReady(true);
            });
        }
        if (animal_id) fetchData();
        else {
            setIsEdit(false);
            setReady(true);
            setAnimal({
                kind: "",
                description: "",
                gender: "",
                age: "",
                country: "",
                arrival_date: ""
            })
        }
    }, [])

    useEffect(() => {
        if (!isAuthorized) navigate('/')
        if (user.role != "ADMIN") navigate("/animals")
    }, [isAuthorized])

    const click = (e) => {
        e.preventDefault();
        if (isEdit) {
            axios.put(`http://localhost:3000/api/animals/${animal_id}`, animal).then(r=> {navigate('/animals/');});
        } else {
            axios.post('http://localhost:3000/api/animals/', animal).then(r => {navigate('/animals/');});
        }
    }

    return (
        <Page>
            <Card>{
                ready &&
                <form>
                    <InputField
                        name='kind'
                        type='text'
                        id="kind"
                        label="Вид"
                        onChange={(e) => setAnimal({ ...animal, kind: e.target.value })}
                        defaultValue={animal.kind}
                    />
                    <InputField
                        name='description'
                        type='text'
                        id="desc"
                        label="Описание"
                        onChange={(e) => setAnimal({ ...animal, description: e.target.value })}
                        defaultValue={animal.description}
                    />
                    <InputField
                        name='gender'
                        type='text'
                        id="gender"
                        label="Пол"
                        onChange={(e) => setAnimal({ ...animal, gender: e.target.value })}
                        defaultValue={animal.gender}
                    />
                    <InputField
                        name='Age'
                        type='integer'
                        id="desc"
                        label="Возраст"
                        onChange={(e) => setAnimal({ ...animal, age: e.target.value })}
                        defaultValue={animal.age}
                    />
                    <InputField
                        name='arrival_date'
                        type='date'
                        id="arrival_date"
                        label="Дата прибытия"
                        onChange={(e) => setAnimal({ ...animal, arrival_date: e.target.value })}
                        defaultValue={animal.arrival_date.substr(0, 10)}
                    />
                    <InputField
                        name='country'
                        type='text'
                        id="country"
                        label="Страна"
                        onChange={(e) => setAnimal({ ...animal, country: e.target.value })}
                        defaultValue={animal.country}
                    />
                    <Button style={{ marginTop: "auto" }} onClick={click} color="bg-blue" type="submit">{isEdit ? "Update" : "Create"}</Button>
                </form>}
            </Card>
        </Page>
    )
}

export default AnimalEditPage;