import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected({ component }) {
    const Component = component;
    const navigate = useNavigate()

    useEffect(() => {
        const login = localStorage.getItem('login');
        if (login !== 'true') {
            navigate('/login');
        } else if (login === 'true') {
            navigate('/dashboard');
        }
    }, [navigate]);



    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected