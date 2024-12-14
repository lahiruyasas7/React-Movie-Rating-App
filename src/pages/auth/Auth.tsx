
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
      <Card className="lg:w-1/2 p-4">
        <Row className="mb-2 text-center " lg={12}>
          <h4 className="text-xs md:text-xl">Welcome! You Can Login By registering</h4>
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
          </Row>
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
