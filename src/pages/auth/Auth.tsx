import {
  Card,
  Row,
  Button,
  Col,
  Label,
  Input,
  Form,
  FormFeedback,
  NavLink,
} from "reactstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
//import { dispatch } from "../../utils/common-hooks";
import { loginListen } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  interface LoginDataType {
    password: string;
    loginEmail: string;
  }
  const defaultValues = {
    password: "",
    loginEmail: "",
  };

  const dispatch = useDispatch();

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

  const loginHandle = (data: LoginDataType) => {
    const payload = {
      email: data.loginEmail,
      password: data.password,
    };
    if (data) {
      dispatch(loginListen(payload, history));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center my-3 items-center">
      <Card className="lg:w-1/2 p-4">
        <Row className="mb-2 text-center " lg={12}>
          <h4 className="text-xs md:text-xl">
            Welcome! You Can Login By registering
          </h4>
        </Row>
        <Form onSubmit={handleSubmit(loginHandle)}>
          <Row lg={12}>
            <Col className="m-2">
              <Label className="font-semibold">User Name</Label>
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
            </Col>
          </Row>
          <Row className="mt-" lg={12}>
            <Col className="m-2">
              <Label className="font-semibold">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Col>
                    <div className="relative">
                      <Input
                        id="password"
                        className="input-group-merge"
                        type={showPassword ? "text" : "password"}
                        invalid={!!errors.password}
                        {...field}
                      />

                      <span
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </span>
                    </div>
                    <FormFeedback>Please enter password</FormFeedback>
                  </Col>
                )}
              />
            </Col>
          </Row>
          <div className="text-blue-600 my-3">
            <NavLink active href="/register">
              Click here to Register for free
            </NavLink>
          </div>
          <Row className="mt-2">
            <Col>
              <Button className="w-28">Login</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Auth;
