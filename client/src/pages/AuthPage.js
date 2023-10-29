import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }

    const loginPressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/auth/login', 'POST', { ...form })
                auth.login(data.token, data.userId)
            } catch (e) { }
        }
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Створи список справ</h1>
                <div className="card blue darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>

                            <div className='input-field'>
                                <input
                                    id='email'
                                    automation-id="email-input"
                                    type='text'
                                    name='email'
                                    value={form.email}
                                    className="yellow-input"
                                    onChange={changeHandler}
                                    style={{ "color": "#ffffff" }}
                                />
                                <label role='form' htmlFor='email'>Enter your email</label>
                            </div>

                            <div className='input-field'>
                                <input
                                    id='password'
                                    automation-id="password-input"
                                    type='password'
                                    name='password'
                                    className="yellow-input"
                                    value={form.password}
                                    onChange={changeHandler}
                                    onKeyPress={loginPressHandler}
                                    style={{ "color": "#ffffff" }}
                                />
                                <label htmlFor='password'>Enter your password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            automation-id="login-btn"
                            style={{ marginRight: 10 }}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Sign In
                        </button>
                        <button
                            className="btn grey darken-1 black-text"
                            automation-id="register-btn"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
            {/* <img src="images/img1.png">
            </img>
            <img src="images/img2.png">
            </img>
            <img src="images/img3.png" alt='fjkdjfkdjf'>
            </img>
            <img src="images/img3.png" alt='fjkdjfkdjf'>
            </img> */}
        </div>
    )
}