import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserDetails } from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { Controller, useForm } from "react-hook-form";
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";
import Avatar from "react-avatar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createImageObjectURL } from "../../utils/custom-ustils";

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
  email?: string;
  profileImage?: File | null;
}

const schema = yup
  .object()
  .shape({
    firstName: yup.string().required("First Name is required"),

    //email: yup.string().email("Invalid email").required("Email is required"),
    email: yup.string().when("$isGoogleUser", {
      is: false,
      then: (schema) =>
        schema.required("Email is required").email("Invalid email"),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
  .required();

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData>();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

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
  console.log("userDetails", userDetails);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }, // <-- add isDirty here
  } = useForm<UserProfileFormData>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(schema),
    context: { isGoogleUser: !!userDetails?.googleId },
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

  const onSubmit = (data: UserProfileFormData) => {
    const userId = userData?.user?.userId;
    data.profileImage = uploadedImage;
    if (userDetails?.googleId) delete data.email;
    if (data && userId) {
      dispatch(updateUserDetails(userId, data));
    }
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

  //post image handler
  const profileImageHandler = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setUploadedImage(file);
    }
  };
  console.log("uploadedImage", uploadedImage);
  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen">
      <Row>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={profileImageHandler}
          id="post-upload"
          style={{ display: "none" }}
        />
        <label
          htmlFor="post-upload"
          className={`custom-file-upload${
            userDetails?.googleId ? " pointer-events-none " : ""
          }`}
        >
          <Avatar
            src={
              createImageObjectURL(uploadedImage) ??
              (userDetails?.profileImageUrl || undefined)
            }
            name={`${userDetails?.firstName || ""} ${
              userDetails?.lastName || ""
            }`}
            size="120"
            round={true}
            className="cursor-pointer"
          />
        </label>
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

            <Label className="text-white mt-3">Last Name</Label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />

            <Label className="text-white mt-3">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    disabled={userDetails?.googleId}
                    invalid={!!errors.email}
                  />
                  <FormFeedback>Email cannot be blank</FormFeedback>
                </>
              )}
            />

            <Label className="text-white mt-3">Phone</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} />}
            />

            <Label className="text-white mt-3">Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => <Input {...field} />}
            />

            <Label className="text-white mt-3">Date of Birth</Label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />

            <Button className="mt-4" type="submit" disabled={!isDirty}>
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
