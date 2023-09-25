import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import styles from "./CSS/Form.module.css";
import formStyles from "./CSS/Form.module.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#D32F2F",
        },
    },
});

const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue(initialValue);
    };

    return {
        value,
        onChange: handleChange,
        reset,
    };
};

const useFormCheckbox = (initialValue) => {
    const [checked, setChecked] = useState(initialValue);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    const reset = () => {
        setChecked(initialValue);
    };

    return {
        checked,
        onChange: handleChange,
        reset,
    };
};

const isNameValid = (name) => {
    const nameRegex = /^[A-Za-z]+( [A-Za-z]+){1,2}$/;
    return nameRegex.test(name);
};

const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

const Form = ({ visitors, setVisitors }) => {
    const name = useFormInput("");
    const email = useFormInput("");
    const department = useFormInput("");
    const agree = useFormCheckbox(false);
    const [warning, setWarning] = useState({});

    const handleWarning = (msg, inputName) => {
        setWarning((obj) => ({ ...obj, [inputName]: msg }));
        setTimeout(() => {
            setWarning((obj) => ({ ...obj, [inputName]: "" }));
        }, 4000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Full name must have at least one space or maximum two spaces. 
        if (!isNameValid(name.value)) {
            handleWarning("Full name must contain first name and last name sepated by space (characters only).", "name");
            return;
        }

        if (!isEmailValid(email.value)) {
            handleWarning("Invalid email format", "email");
            return;
        }

        if (visitors.some((visitor) => visitor.email === email.value)) {
            handleWarning("This email is already exists in the table", "email");
            return;
        }

        const newVisitor = {
            name: name.value,
            email: email.value,
            department: department.value,
            selected: false,
        };
        setVisitors([...visitors, newVisitor]);
        name.reset();
        email.reset();
        department.reset();
        agree.reset();
    };

    const handleReset = () => {
        name.reset();
        email.reset();
        department.reset();
        agree.reset();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.formContainer}>
                <p className={formStyles.formTitle}>
                    <b>Add new visitor</b>
                </p>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal" >
                        <TextField
                            fullWidth
                            label="Full name"
                            id="name"
                            value={name.value}
                            onChange={name.onChange}
                            required
                        />
                        <FormHelperText>{warning.name}</FormHelperText>
                    </FormControl>
                    <FormControl sx={{ width: "100%" }} margin="normal" >
                        <TextField
                            id="email"
                            label="Email address"
                            type="email"
                            value={email.value}
                            onChange={email.onChange}
                            required
                        />
                        <FormHelperText>{warning.email}</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="department-label">Department</InputLabel>
                        <Select
                            id="department"
                            label="Department"
                            value={department.value}
                            onChange={department.onChange}
                            required
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="Marketing">Marketing</MenuItem>
                            <MenuItem value="IT">IT</MenuItem>
                            <MenuItem value="Sales">Sales</MenuItem>
                            <MenuItem value="Management">Management</MenuItem>
                        </Select>
                    </FormControl>
                    <br /><br />
                    <FormGroup>
                        <FormControlLabel
                            required
                            control={
                                <Checkbox
                                    id="agree"
                                    checked={agree.checked}
                                    onChange={agree.onChange}
                                />
                            }
                            label="I agree to be added to the table"
                        />
                    </FormGroup>
                    <br />
                    <Button variant="outlined" onClick={handleReset} className={styles.resetButton}>
                        Reset
                    </Button>
                    <Button variant="contained" type="submit" color="primary" className={styles.submitButton}>
                        Add new visitor
                    </Button>
                </form>
            </Box>
        </ThemeProvider>
    );
};

export default Form;
