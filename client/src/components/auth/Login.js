import { Fragment, useState } from "react"
import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        // const newuser = {
        //     name,
        //     email,
        //     password
        // };

        // try {
        //     const config = {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }
        //     const body = JSON.stringify(newuser);
        //     const res = await axios.post('/api/users', body, config);
        //     console.log(res.data);
        // }
        // catch (err) {
        //     console.error(err.response.data);
        // }

    }
    return (
        <Fragment>
            <h1 class="large text-primary">Sign Up</h1>
            <p class="lead"><i class="fas fa-user"></i> Sign in to Your Account</p>
            <form class="form" onSubmit={e => onSubmit(e)}>
                <div class="form-group">
                    <input type="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} name="email" required />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        required
                        value={password}
                        onChange={e => onChange(e)}

                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Sign In" />
            </form>
            <p class="my-1">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </Fragment>
    )
}
