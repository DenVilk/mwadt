import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/Button/Button";
import Page from "../../components/Page/Page";
import Card from "../../components/Card/Card";

const AnimalDeletePage = () => {
    const {animal_id} = useParams();
    const navigate = useNavigate();

    const deleteAnimal = ()=>{
        async function deleteA(){
            await axios.delete(`http://localhost:3000/api/animals/${animal_id}`).then(r=>{
                navigate('/animals/');
            })
        }
        deleteA();
    }

    return (
        <Page>
            <Card>
                <h2>Вы уверены что хотите удалить животного с идентификатором {animal_id}</h2>
                <Button color='bg-red' onClick={deleteAnimal}>Delete</Button>
            </Card>
        </Page>
    )
}

export default AnimalDeletePage;