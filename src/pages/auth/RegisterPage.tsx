import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
//import { Form } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  FormFeedback,
  Input,
  Label,
  Row,
  NavLink,
  Spinner,
} from "reactstrap";
import * as yup from "yup";
import { registerDataType, registerUser } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { RootState } from "../../redux/reducers";

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

  const { loader } = useSelector((state: RootState) => state.reducer);
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-900 via-gray-900 to-black px-4">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-300">
            Sign up to stay updated with the latest and trending movies & TV
            shows.
          </p>
        </div>

        <form onSubmit={handleSubmit(registerHandler)} className="grid gap-4">
          {/* Email */}
          <div>
            <Label className="block text-gray-200 mb-1">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 rounded-xl bg-gray-800 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    invalid={!!errors.email}
                    {...field}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">
                      Please provide a valid email.
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Password */}
          <div>
            <Label className="block text-gray-200 mb-1">Password</Label>
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
                      text-black
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
                    <p className="text-sm text-red-400 mt-1">
                      Password is required.
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* First Name */}
          <div>
            <Label className="block text-gray-200 mb-1">First Name</Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-2 rounded-xl bg-gray-800 text-black border border-gray-600"
                    invalid={!!errors.firstName}
                    {...field}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-400 mt-1">
                      First name is required.
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Last Name */}
          <div>
            <Label className="block text-gray-200 mb-1">Last Name</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-2 rounded-xl bg-gray-800 text-black border border-gray-600"
                    invalid={!!errors.lastName}
                    {...field}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-400 mt-1">
                      Last name is required.
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* Phone */}
          <div>
            <Label className="block text-gray-200 mb-1">Phone Number</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  id="phone"
                  type="text"
                  placeholder="+94xxxxxxxxx"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-black border border-gray-600"
                  {...field}
                />
              )}
            />
          </div>

          {/* Address */}
          <div>
            <Label className="block text-gray-200 mb-1">Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main Street, Anytown"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-black border border-gray-600"
                  {...field}
                />
              )}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <Label className="block text-gray-200 mb-1">Date of Birth</Label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <Input
                  id="dateOfBirth"
                  type="date"
                  className="w-full px-4 py-2 rounded-xl bg-gray-800 text-black border border-gray-600"
                  {...field}
                />
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-black font-semibold rounded-xl transition duration-300">
               {loader ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>

          <div className="text-sm text-center text-indigo-400 mt-4">
            Already have an account?{" "}
            <NavLink href="/auth" className="underline hover:text-indigo-300">
              Go back to login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
