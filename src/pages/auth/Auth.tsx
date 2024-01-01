import React from "react";
import {
  Card,
  Row,
  Button,
  Col,
  Label,
  Input,
  Form,
  FormFeedback,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";

const Auth = () => {
  const defaultValues = {
    password: "",
    loginEmail: "",
  };

  const schema = yup
    .object()
    .shape({
      loginEmail: yup
        .string()
        .transform((value) => (!value ? null : value))
        // eslint-disable-next-line
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .required(),
      password: yup.string().required(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema), mode: "all" });

  const loginHandle = () => {
    console.log("hello");
  };

  return (
    <div className="flex justify-center my-3 items-center">
      <Card className="w-1/2 p-2">
        <Row className="mb-2">
          <h4>Welcome! You Can Login By registering</h4>
        </Row>
        <Form>
          <Col className="m-2 justify-start">
            <Label>User Name</Label>
            <Controller
              name="loginEmail"
              control={control}
              render={({ field }) => (
                <Col>
                  <Input
                    id="loginEmail"
                    type="email"
                    placeholder="john@example.com"
                    invalid={!!errors.loginEmail}
                    {...field}
                  />
                  <FormFeedback>
                    The email address you provided is not valid. Please make
                    sure you use a valid email format (e.g., name@example.com)
                  </FormFeedback>
                </Col>
              )}
            />
            <Label>Password</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Col>
                  <Input
                    id="password"
                    className="input-group-merge"
                    invalid={!!errors.password}
                    {...field}
                  />
                  <FormFeedback>Please enter password</FormFeedback>
                </Col>
              )}
            />
          </Col>
          <Row>
            <Col>
              <Button className="">Login</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Auth;
