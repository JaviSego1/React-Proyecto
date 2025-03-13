import { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Container, Typography } from '@mui/material';

const Register = () => {
    const { register } = useContext(AuthContext);
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const passwordValue = password.current.value;

        if (!passwordValue) {
            setPasswordError(true);
            setPasswordErrorMessage('La contraseña es requerida.');
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');

            const response = await register(email.current.value, passwordValue);
            if (!response.error) {
                navigate('/');  // Redirige a login después del registro
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
                {/* Título de Registro */}
                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#1976d2' }}>
                    Registro
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        id="email"
                        type="email"
                        inputRef={email}
                        variant="outlined"
                        placeholder="Email"
                        fullWidth
                        required
                        sx={{ marginBottom: 2, backgroundColor: '#fafafa' }}
                    />

                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        id="password"
                        type="password"
                        inputRef={password}
                        variant="outlined"
                        placeholder="Contraseña"
                        fullWidth
                        required
                        sx={{ marginBottom: 2, backgroundColor: '#fafafa' }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 2, padding: '12px', fontSize: '16px' }}
                    >
                        Registrarse
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Register;
