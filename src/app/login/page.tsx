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
        // const token = localStorage.getItem('authToken');
        // if (token) {
        //     setIsLoggedIn(true);
        //     router.push('/blog');
        // }
    }, [router]);

    // Redirect if logged in
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/blog');
        }
    }, [isLoggedIn, router]);

    if (isLoggedIn) {
        return null;
    }

    const handleLogin = async () => {
        const authEndpoint = `http://${window.location.hostname}:5000/api/v1/user/login`;
        try {
            const response = await fetch(authEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
                credentials: 'include', // Necessary to include cookies
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log(data);

            // Assuming the server sets the authToken and userId in httpOnly cookies
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
            <h1 style={{ color: 'var(--text-color)', fontFamily: 'inherit', marginBottom: '0px', fontSize: '4em', position: 'absolute', top: '10%' }}>Photo Journal</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ border: '1px solid var(--text-color)', borderRadius: '15px', padding: '10px', backgroundColor: '#444444' }}>
                    <table style={{ color: 'var(--text-color)', marginBottom: '0px' }}>
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
                                            width: '225px', // Increased width by 25px from 100px
                                            background: 'black',
                                            borderRadius: '5px',
                                            border: '2px solid var(--text-color)',
                                            outlineColor: 'blue',
                                            color: 'var(--text-color)',
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
                                            width: '225px', // Increased width by 25px from 200px
                                            background: 'black',
                                            borderRadius: '5px',
                                            border: '2px solid var(--text-color)',
                                            outlineColor: 'blue',
                                            color: 'var(--text-color)',
                                            paddingLeft: '10px',
                                            fontFamily: 'inherit',
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td style={{ textAlign: 'right' }}>
                                    <button
                                        onClick={handleLogin}
                                        style={{
                                            padding: '0px 20px',
                                            border: '2px solid var(--text-color)',
                                            color: 'var(--text-color)',
                                            background: 'transparent',
                                            borderRadius: '20px',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            width: '50%',
                                            margin: '10px auto 0',
                                            fontFamily: 'inherit',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'black'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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