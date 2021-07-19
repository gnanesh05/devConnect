import { Fragment, useState } from "react"
import axios from 'axios';
import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { setAlert } from "../../actions/alert";
import PropTypes from 'prop-types'


export const Register = ({setAlert}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2)
            setAlert("Passwords don't match", "danger");
        else {
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
    }
    return (
        <Fragment>
            <h1 class="large text-primary">Sign Up</h1>
            <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>
            <form class="form" onSubmit={e => onSubmit(e)}>
                <div class="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} name="email" required />
                    <small class="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
                    >
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        required
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p class="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.prototypes = {
    setAlert: PropTypes.func.isRequired,
}
export default connect(null, { setAlert })(Register);