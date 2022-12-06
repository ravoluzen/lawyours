import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    Select,
    MenuItem
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

/* SCHEMA VALIDATION WITH YUP */
// basically specifies what field accepts what type of input
// and validates if the value entered matches input type of the field
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    userType: yup.string().required("required"),
    picture: yup.string(),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    userType: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};

const testValues = {
    email: "test@test.com", 
    password: "testuser",
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    const REACT_APP_HOST = process.env.REACT_APP_HOST;

    const register = async (values, onSubmitProps) => {
        //
        const formData = new FormData();
        for(let value in values) {
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name);

        console.log(values);
        console.log(onSubmitProps)

        const savedUserResponse = await fetch(
            `${REACT_APP_HOST}/auth/register`,
            {
                method: "POST",
                body: formData,
            },
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if(savedUser) {
            setPageType("login");
        }
    };

    const login = async (values) => {
        const loggedInResponse = await fetch(
            `${REACT_APP_HOST}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(values),
            },
        );
        const loggedIn = await loggedInResponse.json();
        if(loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    }

    const handleTestLogin = async () => {
        await login(testValues);
        console.log("hit", testValues);
    }


    const handleFormSubmit = async (values, onSubmitProps) => {
        onSubmitProps.resetForm();
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);
        console.log("submitProps", onSubmitProps);

    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.lastName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 4"}}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2"}}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.lastName)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 2"}}
                                />
                                <TextField
                                    select
                                    label="User Type"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.userType}
                                    name="userType"
                                    error={Boolean(touched.userType) && Boolean(errors.lastName)}
                                    helperText={touched.userType && errors.userType}
                                    sx={{ gridColumn: "span 4"}}
                                >
                                    <MenuItem value="Client">Client</MenuItem>
                                    <MenuItem value="Lawyer">Lawyer</MenuItem>
                                </TextField>
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "$:hover": {cursor: "pointer"} }}
                                        >
                                            <input {...getInputProps()} 
                                            />
                                            {!values.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>

                                </Box>
                            </>
                        )}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.lastName)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4"}}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.lastName)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4"}}
                        />
                    </Box>

                    {/* BUTTON */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                mt: "2rem",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { backgroundColor: palette.primary.dark }
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => {
                                handleTestLogin()
                                
                            }}
                            sx={{
                                m: "1rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { backgroundColor: palette.primary.dark }
                            }}
                        >
                            Join as test user.
                        </Button>
                        <FlexBetween sx={{ width: "100%" }}>
                            <Typography
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: palette.primary.light,
                                    },
                                }}
                            >
                                {isLogin 
                                ? "Not a member? Sign Up here."
                                : "Already a member? Hop in here!"}
                            </Typography>

                        </FlexBetween>
                    </Box>
                </form>
            )}

        </Formik>

    )
    

}

export default Form;