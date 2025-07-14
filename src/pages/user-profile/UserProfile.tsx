import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import Avatar from "react-avatar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface UserData {
  accessToken: string;
  user: {
    email: string;
    userId: string;
  };
}

interface UserProfileFormData {
  firstName: string;
  lastName?: string;
  address?: string;
  dateOfBirth?: string;
  phone?: string;
  email: string;
}

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First Name is required"),

    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData>();

  const dispatch = useDispatch();

  const { userDetails } = useSelector((state: RootState) => state.reducer);

  const [defaultFormValues] = useState({
    firstName: userDetails?.firstName || "",
    lastName: userDetails?.lastName || "",
    address: userDetails?.address || "",
    phone: userDetails?.phone || "",
    dateOfBirth: userDetails?.dateOfBirth || "",
    email: userDetails?.email || "",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfileFormData>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUserData(user);
  }, []);
  useEffect(() => {
    if (userData?.user?.userId) {
      dispatch(getUserDetails(userData.user.userId));
    }
  }, [userData]);
  console.log("userDetails", userDetails);

  const onSubmit = (data: UserProfileFormData) => {
    console.log("Form Submitted:", data);
    // dispatch(updateUserDetails(data)); // Implement this action
  };

  useEffect(() => {
    if (userDetails) {
      reset({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        phone: userDetails.phone || "",
        address: userDetails.address || "",
        dateOfBirth: userDetails.dateOfBirth?.replace(/\//g, "-") || "",
        email: userDetails.email || "",
      });
    }
  }, [userDetails, reset]);
  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen">
      <Row>
        <Avatar
          name="Foo Bar"
          size="100"
          round={true}
          className="cursor-pointer"
        />
      </Row>
      <Row className="w-1/2 mt-4">
        <Col className="w-full" sm="12" md="12" lg="12">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label className="text-white">First Name</Label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <>
                  <Input {...field} invalid={!!errors.firstName} />{" "}
                  <FormFeedback>First Name cannot be blank</FormFeedback>
                </>
              )}
            />

            <Label className="text-white">Last Name</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />

            <Label className="text-white">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />

            <Label className="text-white">Phone</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} />}
            />

            <Label className="text-white">Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => <Input {...field} />}
            />

            <Label className="text-white">Date of Birth</Label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />

            <Button className="mt-4" type="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
