import React, {useState} from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ errors, touched, values }) => {

    const [users, setUsers] = useState([]);

    return (
        <div>
            <Form>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field type="text" name="name" placeholder="Name" />
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type="text" name="email" placeholder="Email" />
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />
                <label>
                    {touched.terms && errors.terms && <p>{errors.terms}</p>}
                    Terms of Service:
                    <Field type="checkbox" name="terms" placeholder="Terms of Service" checked={values.terms}/>
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
        name: Yup.string().max(10, "Name connot be more than 10 characters!").required("Name is required!"),
        email: Yup.string().email("Must be a valid email!").required("Email is required!"),
        password: Yup.string().min(8, "Password must be atleast 8 characters!").required("Password is required!"),
        terms: Yup.string().required()
    }),
    handleSubmit(values) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default FormickUserForm;
