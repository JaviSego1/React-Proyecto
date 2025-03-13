import { createContext, useState } from "react";
import axios from 'axios';

export const TOKEN_KEY = 'TOKEN';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLogged: false,
        email: '',
        id: 0,
        jwt: ''
    });

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email, 
                password
            });
            if (response.status === 200) {
                const userToken = response.data; 
                console.log(userToken);
                localStorage.setItem(TOKEN_KEY, userToken.accessToken);
                setUser({
                    isLogged: true,
                    email: userToken.user.email,
                    id: userToken.user.id
                });
                return { error: false, data: 'Sesión iniciada correctamente' };
            } else {
                return { error: true, data: 'Usuario o contraseña incorrecta' };
            }
        } catch (error) {
            return { error: true, data: 'Usuario o contraseña incorrecta' };
        }
    };

    const logout = () => {
        setUser({
            isLogged: false,
            email: '',
            id: 0
        });
        localStorage.removeItem(TOKEN_KEY);
    };

    const register = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/register', {
                email, 
                password
            });
            if (response.status === 201) {
                return { error: false, data: 'Usuario registrado correctamente' };
            } else {
                return { error: true, data: 'Error al registrar usuario' };
            }
        } catch (error) {
            return { error: true, data: 'Error al registrar el usuario' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
