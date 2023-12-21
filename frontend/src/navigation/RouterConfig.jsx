import { Route, Routes } from 'react-router-dom'
import Test from '../components/Test'
import LoginPage from '../pages/LoginPage/LoginPage';
import { LOGIN, PROFILE, ROOT, REGISTER, ANIMALS, ANIMAL,ANIMAL_EDIT, ANIMAL_CREATE, ANIMAL_DELETE } from './CONSTANTS'
import PrivateRoute from './PrivateRoute';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import AnimalsPage from '../pages/AnimalsPage/AnimalsPage';
import AnimalPage from '../pages/AnimalPage/AnimalPage';
import AnimalEditPage from '../pages/AnimalEditPage/AnimalEditPage';
import AnimalDeletePage from '../pages/AnimalDeletePage/AnimalDeletePage';

const RouterConfig = () => {
    return (
        <>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route exact path={PROFILE} element={<ProfilePage />} />
                </Route>
                {/* <PrivateRoute exact path={PROFILE} element={<ProfilePage />} /> */}
                <Route path={ANIMAL_EDIT} element={<AnimalEditPage />} />
                <Route path={ANIMAL_CREATE} element={<AnimalEditPage />} />
                <Route path={ANIMAL_DELETE} element={<AnimalDeletePage />} />
                <Route path={ANIMAL} element={<AnimalPage />} />
                <Route path={ROOT} element={<Test />} />
                <Route path={LOGIN} element={<LoginPage />} />
                <Route path={REGISTER} element={<RegisterPage />} />
                <Route path={ANIMALS} element={<AnimalsPage />} />
            </Routes>
        </>
    )
}

export default RouterConfig;