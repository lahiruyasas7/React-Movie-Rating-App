import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
//import { Form } from "react-router-dom";
import { Button, Card, Col, FormFeedback, Input, Label, Row } from "reactstrap";
import * as yup from "yup";
import { registerDataType, registerUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .transform((value) => (!value ? null : value))
      // eslint-disable-next-line
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().optional(),
    address: yup.string().optional(),
    dateOfBirth: yup.string().optional(),
  })
  .required();

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const defaultValues = {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema), mode: "all" });

  const registerHandler = (data: registerDataType) => {
    console.log("registerData", data);
    if (data) {
      dispatch(registerUser(data));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-center my-3 items-center">
      <Card
        className="lg:w-1/2 p-4 bg-[#4287f5]"
        style={{ backgroundColor: "#829bc4" }}
      >
        <Row className="mb-2 text-center " lg={12}>
          <h4 className="text-xs md:text-xl">Register</h4>
        </Row>
        <form onSubmit={handleSubmit(registerHandler)}>
          <Row lg={12}>
            <Col className="m-2">
              <Label className="font-semibold">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Col>
                    <Input
                      id="loginEmail"
                      type="email"
                      placeholder="john@example.com"
                      invalid={!!errors.email}
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
                      <FormFeedback>Please enter password</FormFeedback>
                    </div>
                  </Col>
                )}
              />
            </Col>
          </Row>
          <Row lg={12}>
            <Col className="m-2">
              <Label className="font-semibold">First Name</Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Col>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="john"
                      invalid={!!errors.firstName}
                      {...field}
                    />
                    <FormFeedback>First Name is Required</FormFeedback>
                  </Col>
                )}
              />
            </Col>
          </Row>
          <Row lg={12}>
            <Col className="m-2">
              <Label className="font-semibold">Last Name</Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Col>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      invalid={!!errors.lastName}
                      {...field}
                    />
                    <FormFeedback>The last Name is required</FormFeedback>
                  </Col>
                )}
              />
            </Col>
          </Row>
          <Row lg={12}>
            <Col className="m-2">
              <Label className="font-semibold">Phone Number</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Col>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="+94xxxxxxxxx"
                      //invalid={!!errors.email}
                      {...field}
                    />
                  </Col>
                )}
              />
            </Col>
          </Row>
          <Row lg={12}>
            <Col className="m-2">
              <Label className="font-semibold">Address</Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Col>
                    <Input
                      id="phone"
                      type="text"
                      placeholder="123 Main Street, Anytown, CA 12345"
                      //invalid={!!errors.email}
                      {...field}
                    />
                  </Col>
                )}
              />
            </Col>
          </Row>
          <Row lg={12}>
            <Col className="m-2">
              <Label className="font-semibold">Date Of Birth</Label>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <Col>
                    <Input
                      id="dateOfBirth"
                      type="text"
                      placeholder="20xx/xx/xx"
                      //invalid={!!errors.email}
                      {...field}
                    />
                  </Col>
                )}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="">Register</Button>
            </Col>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;
