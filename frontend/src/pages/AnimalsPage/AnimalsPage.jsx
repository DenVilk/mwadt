import { useEffect, useState } from "react";
import Row from "../../components/Row/Row";
import Page from "../../components/Page/Page";
import "./AnimalsPage.css";
import Button from "../../components/Button/Button";

const AnimalsPage = () => {
    const [animals, setAnimals] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [backup, setBackup] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [search, setSearch] = useState('')

    useEffect(() => {
        async function fetchData() {
            let url = "http://localhost:3000/api/animals/";
            let response = await fetch(url);
            response.json().then(res => {
                setAnimals(res);
                setLoaded(true);
            });
        }
        fetchData();
    }, []);

    const sortAnimals = (e) => {
        e.preventDefault();

        if (isSorted) {
            setAnimals(backup);
            setIsSorted(false);
            return;
        }
        if (!backup) setBackup(animals);
        setIsSorted(true);
        let a = [...animals];
        a.sort(function (x, y) {
            return x.age < y.age ? 1 : x.age > y.age ? -1 : 0;
        });
        setAnimals(a);
    }

    useEffect(() => {
        let val = search;
        console.log(val);
        if (animals && !backup.length) setBackup(animals);
        console.log(animals, backup);
        if (val == '') {setAnimals(backup);return}
        let a = [...animals];
        setAnimals(a.filter((x)=>x.description.startsWith(val)));
    },[search])

    return (
        <Page>
            <input className="search-input" type="text" disabled={!loaded?"disabled":""} onInput={(e)=>{setSearch(e.target.value)}} placeholder="search"/>
            <table>
                <thead>
                    <tr>
                        <th>Вид</th>
                        <th>Описание</th>
                        <th>Пол</th>
                        <th>Возраст <Button onClick={sortAnimals}>Sort</Button></th>
                        <th>Страна</th>
                        <th>Дата прибытия</th>
                        <th>Ссылка</th>
                        <th>Удалить?</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loaded &&
                        animals &&
                        animals.map(
                            value => {
                                return <Row
                                    key={value.id}
                                    id={value.id}
                                    subject={'animals'}
                                    values={[
                                        value.kind,
                                        value.description,
                                        value.gender,
                                        value.age,
                                        value.country,
                                        value.arrival_date
                                    ]} />
                            }
                        )
                    }
                </tbody>
            </table>
        </Page>
    )
}

export default AnimalsPage;