import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const {register} = useContext(AuthContext);
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (email.current.value && password.current.value) {
            const response = await register(email.current.value, password.current.value);
            if (!response.error) {
                navigate('/');  // Redirige a login después del registro
            }
        }
    }

    return (
        <>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                Email:<input type="text" ref={email} />
                Clave:<input type="password" ref={password} />
                <button>Registrar usuario</button>
            </form>
        </>
    );
}

export default Register;
