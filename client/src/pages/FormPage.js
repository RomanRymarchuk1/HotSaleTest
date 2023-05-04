import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import postUser from "../api/postUser";

const FormPage = () => {
   const [errorMessage, setErrorMessage] = useState();
   const navigate = useNavigate(null);

   const initialValues = {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordRepeat: "",
   };

   const validationSchema = yup.object().shape({
      name: yup.string().required(),
      surname: yup.string().required(),
      email: yup.string().email("Invalid email").required(),
      password: yup.string().min(4, "Password must have at least 4 characters").required(),
      passwordRepeat: yup
         .string()
         .oneOf([yup.ref("password")], "Passwords must match")
         .required(),
   });

   const handleSubmit = async (user) => {
      const { status, message } = await postUser(JSON.stringify(user));

      status ? navigate("/done") : setErrorMessage(message);
   };

   return (
      <>
         <h1 className="text-center mt-4 ">Registration Form</h1>
         <p className="text-danger text-center my-3 text-uppercase ">{errorMessage}</p>
         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleSubmit, handleChange, touched, errors }) => (
               <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                     <Form.Label className="mx-3">Name</Form.Label>
                     <Form.Control
                        onChange={handleChange}
                        placeholder="Name..."
                        name="name"
                        label="Name"
                        isInvalid={!!errors.name}
                     />
                     <Form.Control.Feedback type="invalid">{touched.name && errors.name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSurname">
                     <Form.Label className="mx-3">Surname</Form.Label>
                     <Form.Control
                        onChange={handleChange}
                        placeholder="Surname..."
                        name="surname"
                        isInvalid={!!errors.surname}
                     />
                     <Form.Control.Feedback type="invalid">{touched.surname && errors.surname}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSurname">
                     <Form.Label className="mx-3">Email</Form.Label>
                     <Form.Control
                        onChange={handleChange}
                        placeholder="Email..."
                        name="email"
                        isInvalid={!!errors.email}
                     />
                     <Form.Control.Feedback type="invalid">{touched.email && errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSurname">
                     <Form.Label className="mx-3">Password</Form.Label>
                     <Form.Control
                        placeholder="Password..."
                        type="password"
                        name="password"
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                     />
                     <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSurname">
                     <Form.Label className="mx-3">Password repeat</Form.Label>

                     <Form.Control
                        placeholder="Password repeat..."
                        type="password"
                        name="passwordRepeat"
                        onChange={handleChange}
                        isInvalid={!!errors.passwordRepeat}
                     />
                     <Form.Control.Feedback type="invalid">
                        {touched.passwordRepeat && errors.passwordRepeat}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Button className="btn-success btn-block" type="submit">
                     Submit
                  </Button>
               </Form>
            )}
         </Formik>
      </>
   );
};

export default FormPage;
