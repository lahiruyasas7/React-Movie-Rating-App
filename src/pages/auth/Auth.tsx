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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-zinc-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-300">
            Login to explore trending movies and TV shows.
          </p>
        </div>

        <Form onSubmit={handleSubmit(loginHandle)}>
          <div className="mb-5">
            <Label className="block text-gray-200 font-medium mb-1">
              Email
            </Label>
            <Controller
              name="loginEmail"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    id="loginEmail"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 rounded-xl bg-gray-800 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    invalid={!!errors.loginEmail}
                    {...field}
                  />
                  {errors.loginEmail && (
                    <p className="mt-1 text-sm text-red-400">
                      Please enter a valid email address.
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="mb-5">
            <Label className="block text-gray-200 font-medium mb-1">
              Password
            </Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-2 rounded-xl bg-gray-800 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      invalid={!!errors.password}
                      {...field}
                    />
                    <span
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      Password is required.
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="text-sm text-center text-indigo-400 mb-6">
            Don't have an account?{" "}
            <NavLink
              href="/register"
              className="underline hover:text-indigo-300"
            >
              Register for free
            </NavLink>
          </div>

          <div className="flex justify-center">
            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2 rounded-xl transition duration-300 w-full max-w-[150px]">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
