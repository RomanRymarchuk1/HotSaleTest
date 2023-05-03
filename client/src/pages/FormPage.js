import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import postUser from "../api/postUser";

const FormPage = () => {
   const navigate = useNavigate();

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
      const { status } = await postUser(JSON.stringify(user));

      if (status) {
         navigate("/done");
      }
   };

   return (
      <>
         <h1 className="text-center">Form</h1>
         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ handleSubmit, handleChange, touched, errors }) => (
               <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                     <Form.Label>Name</Form.Label>
                     <Form.Control
                        onChange={handleChange}
                        placeholder="Name"
                        name="name"
                        label="Name"
                        isInvalid={!!errors.name}
                     />
                     <Form.Control.Feedback type="invalid">{touched.name && errors.name}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSurname">
                     <Form.Label>Surname</Form.Label>
                     <Form.Control
                        onChange={handleChange}
                        placeholder="Surname"
                        name="surname"
                        isInvalid={!!errors.surname}
                     />
                     <Form.Control.Feedback type="invalid">{touched.surname && errors.surname}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSurname">
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        onChange={handleChange}
                        placeholder="Email"
                        name="email"
                        isInvalid={!!errors.email}
                     />
                     <Form.Control.Feedback type="invalid">{touched.email && errors.email}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSurname">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                     />
                     <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSurname">
                     <Form.Label>Password repeat</Form.Label>

                     <Form.Control
                        placeholder="Password repeat"
                        type="password"
                        name="passwordRepeat"
                        onChange={handleChange}
                        isInvalid={!!errors.passwordRepeat}
                     />
                     <Form.Control.Feedback type="invalid">
                        {touched.passwordRepeat && errors.passwordRepeat}
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Button className="btn-success" type="submit">
                     Submit
                  </Button>
               </Form>
            )}
         </Formik>
      </>
   );
};

export default FormPage;
