import { Fragment, useState } from "react"
import axios from 'axios';
import React from 'react'
import { Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth'
export const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
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

    if(isAuthenticated)
    {
        return <Redirect to="/dashboard" ></Redirect>
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
                        minLength="4"
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
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {login})(Login)
