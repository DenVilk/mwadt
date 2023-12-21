import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/Page/Page";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";

const AnimalPage = () => {
    const { animal_id } = useParams();
    const [ready, setReady] = useState();
    const [animal, setAnimal] = useState();
    const isAuthenticated = useSelector(state => state.auth.isAuthorized);
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    console.log(isAuthenticated)
    console.log(user)

    useEffect(() => {
        async function fetchData() {
            let url = `http://localhost:3000/api/animals/${animal_id}`;
            let response = await fetch(url);
            response.json().then(res => {
                setAnimal({
                    kindId: res.kind.id,
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
        fetchData();
    }, [animal_id])


    return (
        <Page>
            {
                ready &&
                animal &&
                <Card>
                    <h1>Animal {animal_id}</h1>
                    <table>
                        <tr>
                            <td>Вид</td>
                            <td>{animal.kind}</td>
                        </tr>
                        <tr>
                            <td>Описание</td>
                            <td>{animal.description}</td>
                        </tr>
                        <tr>
                            <td>Пол</td>
                            <td>{animal.gender}</td>
                        </tr>
                        <tr>
                            <td>Возраст</td>
                            <td>{animal.age}</td>
                        </tr>
                        <tr>
                            <td>Страна</td>
                            <td>{animal.country}</td>
                        </tr>
                        <tr>
                            <td>Дата прибытия</td>
                            <td>{animal.arrival_date}</td>
                        </tr>
                    </table>
                    {
                        isAuthenticated &&
                        user.role == 'ADMIN' &&
                        <Button onClick={()=>{navigate(`/animals/${animal_id}/edit`)}}>Edit</Button>
                    }
                </Card>
            }
        </Page>
    )
}

export default AnimalPage;