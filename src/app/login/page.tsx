'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
            router.push('/blog');
        }
    }, []);

    // Redirect if logged in
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/blog');
        }
    }, [isLoggedIn, router]);

    if (isLoggedIn) {
        return null;
    }

    const authEndpoint = `http://${window.location.hostname}:3010/api/v1/user/login`;
    const handleLogin = async () => {
        try {
            const response = await fetch(authEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log(data);
            const token = data.token;
            const userId = data.userId;

            // Save the token for subsequent calls
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);
            setIsLoggedIn(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'black' }}>
            <h1 style={{ color: '#FFD700', fontFamily: 'inherit', marginBottom: '20px', fontSize: '4em', position: 'absolute', top: '10%' }}>Photo Journal</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ border: '1px solid #FFD700', borderRadius: '25px', padding: '20px', backgroundColor: '#444422' }}>
                    <table style={{ color: '#FFD700', marginBottom: '20px' }}>
                        <tbody>
                            <tr>
                                <td style={{ textAlign: 'right', paddingRight: '10px' }}><h2>Email</h2></td>
                                <td>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            width: '100%',
                                            background: 'black',
                                            borderRadius: '5px',
                                            border: '2px solid #FFD700',
                                            outlineColor: 'blue',
                                            color: '#FFD700',
                                            paddingLeft: '10px',
                                            fontFamily: 'inherit',
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'right', paddingRight: '10px' }}><h2>Password</h2></td>
                                <td>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{
                                            width: '100%',
                                            background: 'black',
                                            borderRadius: '5px',
                                            border: '2px solid #FFD700',
                                            outlineColor: 'blue',
                                            color: '#FFD700',
                                            paddingLeft: '10px',
                                            fontFamily: 'inherit',
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button
                                        onClick={handleLogin}
                                        style={{
                                            padding: '10px 20px',
                                            border: '2px solid #FFD700',
                                            color: '#FFD700',
                                            background: 'transparent',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            width: '50%',
                                            margin: '30px auto 0',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        Login
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                </div>
            </div>
        </div>
    );
};

export default LoginPage; 