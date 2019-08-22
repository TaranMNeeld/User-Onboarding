import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import "./Form.css";

const UserForm = ({ errors, touched, values, status }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div>
            <Form className="form">
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type="text" name="name" placeholder="Name" className="form-input"/>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="text" name="email" placeholder="Email" className="form-input"/>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" className="form-input"/>
                <label>
                    Terms of Service:
                    {touched.terms && errors.terms && <p>{errors.terms}</p>}
                    <Field type="checkbox" name="terms" placeholder="Terms of Service" checked={values.terms} className="form-input"/>
                </label>
                <button type="submit" className="form-input">Submit</button>
            </Form>
            <div className="user-container">
            {users.map(user => {
                return (
                    <ul key={user.id} className="user-card">
                        <li>{user.name}</li>
                        <li>{user.email}</li>
                        <li>{user.password}</li>
                    </ul>
                )
            })}
            </div>
        </div >
    );
};

const FormickUserForm = withFormik({

    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().max(10, "Name connot be more than 10 characters!").required("Name is required!"),
        email: Yup.string().email("Must be a valid email!").required("Email is required!"),
        password: Yup.string().min(8, "Password must be atleast 8 characters!").required("Password is required!"),
        terms: Yup.boolean().required("Terms of Service required!")
    }),
    handleSubmit(values, { setStatus }) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default FormickUserForm;
