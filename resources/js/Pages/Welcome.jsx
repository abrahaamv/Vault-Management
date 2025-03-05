import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Card,
    Button,
} from 'react-bootstrap';


export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        const screenshot = document.getElementById('screenshot-container');
        if (screenshot) screenshot.classList.add('hidden');
    };

    return (
        <>
            <Head title="Welcome" />

            <Navbar
                variant="dark"
                expand="md"
                className="bg-sky-800 border-b border-teal-300 shadow-sm"
            >
                <Container>
                    <Navbar.Brand className="font-bold text-xl">
                        Barrett Tax Law
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav" className="justify-end">
                        <Nav>
                            {auth.user ? (
                                <Link href={route('dashboard')} className="nav-link">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="nav-link">
                                        Log in
                                    </Link>
                                    <Link href={route('register')} className="nav-link">
                                        Register
                                    </Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="relative bg-white text-teal-900 min-h-screen pt-8">
                <img
                    id="background"
                    className="absolute left-0 top-0 z-0 w-full max-w-2xl opacity-20"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                    alt="Background pattern"
                />

                <Container className="relative z-10 py-5">
                    {/* Encabezado principal */}
                    <Row className="mb-5 text-center">
                        <Col>
                            <h1 className="text-4xl font-bold mb-3">
                                Wills and estate planning software
                            </h1>
                            <p className="text-teal-700">
                                We made estate plans easier for lawyers to create and explain to their clients. Typical plans can be generated with just one click.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
