import React, { useState } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values }) => {
    return (
        <div>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <Field type="text" name="email" placeholder="Email" />
                <Field type="password" name="password" placeholder="Password" />
                <label>
                    Terms of Service:
                    <Field type="checkbox" name="terms" placeholder="Terms of Service" />
                </label>
                <button>Submit</button>
            </Form>
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
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        terms: Yup.string().required()
    }),
    handleSubmit(values, { setStatus }) {
        axios
            .post("<https://reqres.in/api/users/>", values)
            .then(res => {
                setStatus(res.data);
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default FormickUserForm;
