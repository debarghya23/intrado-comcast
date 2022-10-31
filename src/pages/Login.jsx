import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import eye_icon from "../assets/images/eye_icon.png";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from '../redux-store/actions/AuthAction';
import { callLoading } from '../redux-store/actions/CommonAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorTextComponent from '../components/common/ErrorTextComponent';

const Login = (props) => {
    const [form, setForm] = useState({ userId: '', password: '' });
    const [form_error, setFormError] = useState({});
    const requiredFiled = ['userId', 'password'];
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const isLoading = useSelector(state => state.common.isLoading);
    const navigate = useNavigate();

    useEffect(() => {
        handleCheckLogin();
    }, []);

    const handleCheckLogin = () => {
        if (token) {
            navigate("/dashboard");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let errors = {};
        setFormError({ ...form_error, errors });
        let isValid = true;
        let formArr = Object.keys(form).map(obj => ({ key: String(obj), value: form[obj] }));
        if (formArr && formArr.length) {
            formArr.forEach(obj => {
                if (Array.isArray(obj.value)) {
                    if (obj.value.length === 0 && requiredFiled.indexOf(obj.key) !== -1) {
                        errors[obj.key] = `This is a required field`;
                        setFormError({ ...form_error, errors });
                        isValid = false;
                    }
                } else {
                    if (obj.value === '' && requiredFiled.indexOf(obj.key) !== -1) {
                        errors[obj.key] = `This is a required field`;
                        setFormError({ ...form_error, errors });
                        isValid = false;
                    }
                }
            });
        }
        if (isValid) {
            dispatch(callLoading(true))
            dispatch(userLogin(form))
                .then(res => {
                    dispatch(callLoading(false))
                    if (!res.error) {
                        toast.success("Successfully logged in");
                        setForm({ userId: '', password: '' });
                        localStorage.setItem('_token', res.payload.token);
                        setFormError({});
                        navigate("/dashboard");
                    } else {
                        toast.error("Wrong credentials");
                    }
                });
        }
    }

    const handleInput = (e) => {
        const value = e.target.value
        const field = e.target.name;
        setForm({ ...form, [field]: value })
        if (value && form_error.errors && Object.entries(form_error.errors).length > 0 && Object.entries(form_error.errors).find(obj => obj[0] === field)) {
            let errors = {};
            Object.entries(form_error.errors).filter(obj => obj[0] !== field).map(obj => errors[obj[0]] = obj[1]);
            setFormError({ ...form_error, errors });
        }
        if (value === '' && requiredFiled.indexOf(field) !== -1) {
            let errors = {};
            errors[field] = `This is a required field`;
            if (form_error.errors && Object.entries(form_error.errors).length) {
                Object.entries(form_error.errors).map(obj => errors[obj[0]] = obj[1]);
            }
            setFormError({ ...form_error, errors });
        }
    }

    return (
        <div className='loginBoxOuter'>
            <div className='container'>
                <div className='loginBox'>
                    <div className='logo_login'>
                        <p className='welcomeText'>Welcome</p>
                    </div>
                    <Form>
                        <div className='row'>
                            <Form.Group className="mb-5" controlId="formBasicEmail" >
                                <Form.Label className='label_text'>User Name</Form.Label>
                                <Form.Control type="text" name="userId" value={form.userId} onChange={handleInput} />
                                {
                                    form_error['errors'] && form_error['errors']['userId'] &&
                                    <ErrorTextComponent>{form_error['errors']['userId']}</ErrorTextComponent>
                                }
                            </Form.Group>
                        </div>
                        <div className='row password_div'>
                            <Form.Group className="mb-5" controlId="formBasicPassword">
                                <Form.Label className='label_text'>Password</Form.Label>
                                <div className='password_box'>
                                    <Form.Control type="password" name="password" value={form.password} onChange={handleInput} />
                                    <Button variant="primary" type="submit">
                                        <img src={eye_icon} className="" loading="lazy" alt="" />
                                    </Button>
                                </div>
                                {
                                    form_error['errors'] && form_error['errors']['password'] &&
                                    <ErrorTextComponent padVertical={6}>{form_error['errors']['password']}</ErrorTextComponent>
                                }
                            </Form.Group>
                        </div>
                        <div className='row'>
                            <div className='buttn_row'>
                                <Link to='/Dashboard'>
                                    <Button disabled={isLoading ? true : false} variant="primary" onClick={handleSubmit} type="button" className='login'>
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login