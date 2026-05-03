import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from './Success';



const initialData = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Lütfen geçerli bir email adresi giriniz.",
  password: "Şifre en az 8 karakter olmalı; büyük-küçük harf, rakam ve özel karakter içermelidir.",
};

export default function Login() {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    terms: false,
  });
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  
  const validatePassword = (password) => {
    return String(password).match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
  };


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    const finalValue = type === "checkbox" ? checked : value;

    setForm({ ...form, [name]: finalValue });

    let hasError = false;
    if (name === "email") hasError = !validateEmail(finalValue);
    if (name === "password") hasError = !validatePassword(finalValue);
    if (name === "terms") hasError = !finalValue;

    setErrors((prev) => ({ ...prev, [name]: hasError }));
  };

  useEffect(() => {
    const isFormValid =
      validateEmail(form.email) && 
      validatePassword(form.password) && 
      form.terms;
    
    setIsValid(isFormValid);
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      navigate("/Success");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          invalid={errors.email}
        />
        {errors.email &&
        <FormFeedback>{errorMessages.email}</FormFeedback> }
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          invalid={errors.password}
        />
        {errors.password &&
        <FormFeedback>{errorMessages.password}</FormFeedback> }
      </FormGroup>

      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          type="checkbox"
          checked={form.terms}
          onChange={handleChange}
          invalid={errors.terms}
        />
        <Label check for="terms">Şartları kabul ediyorum</Label>
      </FormGroup>

      <Button disabled={!isValid} color="primary">
        Submit
      </Button>
    </Form>
  );
}