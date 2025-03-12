import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const {login} = useContext(AuthContext);
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email.current.value && password.current.value) {
            const response = await login(email.current.value, password.current.value);
            if (!response.error) {
                navigate('/videojuegos');  // Redirige al catálogo de videojuegos
            }
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                Email:<input type="text" ref={email} />
                Clave:<input type="password" ref={password} />
                <button>Iniciar sesión</button>
            </form>
        </>
    );
}

export default Login;
