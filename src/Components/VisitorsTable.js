import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    ThemeProvider,
    createTheme,
} from "@mui/material";
import styles from "./CSS/VisitorsTable.module.css";

const theme = createTheme({
    palette: {
        primary: {
            main: "#D32F2F",
        },
    },
});

const VisitorsTable = ({ visitors, setVisitors }) => {
    const [selectAll, setSelectAll] = useState(false);
    const [showWarning, setShowWarning] = useState(false);

    const handleSelectAllChange = (e) => {
        setSelectAll(e.target.checked);
        setVisitors(
            visitors.map((visitor) => ({
                ...visitor,
                selected: e.target.checked,
            }))
        );
    };

    const handleVisitorChange = (e, index) => {
        setVisitors(
            visitors.map((visitor, i) =>
                i === index ? { ...visitor, selected: e.target.checked } : visitor
            )
        );
    };

    const handleRemove = () => {
        const selectedVisitors = visitors.filter((visitor) => visitor.selected);

        if (selectedVisitors.length === 0) {
            setShowWarning(true);
            setTimeout(() => {
                setShowWarning(false);
            }, 4000);
        } else {
            setVisitors(visitors.filter((visitor) => !visitor.selected));
            setSelectAll(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className={styles.tableContainer}>
                <br />
                <br />
                <Typography variant="h4" className={styles.visitorManagement}>
                    Visitor management
                </Typography>
                <br />
                <Box className={styles.tableBox}>
                    {visitors.length > 0 && (
                        <Button
                            variant="contained"
                            onClick={handleRemove}
                            className={styles.removeButton}
                        >
                            Remove
                        </Button>
                    )}
                    <br />
                    {showWarning && (
                        <span className={styles.warning}>
                            No visitor selected.
                        </span>
                    )}
                    {!showWarning && (
                        <span className={styles.NoWarningPlaceHolder}>
                            5
                        </span>
                    )}
                    {visitors.length === 0 && (
                        <div className={styles.placeholderDiv}></div>
                    )}
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {visitors.length > 0 && (
                                            <Checkbox
                                                id="selectAllCheckBox"
                                                checked={selectAll}
                                                onChange={handleSelectAllChange}
                                            />
                                        )}
                                        <b>Visitor</b>
                                    </TableCell>
                                    <TableCell>
                                        <b>Email</b>
                                    </TableCell>
                                    <TableCell>
                                        <b>Department</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {visitors.map((visitor, index) => (
                                    <TableRow key={index}>
                                        {visitors.length > 0 && (
                                            <TableCell>
                                                <Checkbox
                                                    checked={visitor.selected}
                                                    onChange={(e) => handleVisitorChange(e, index)}
                                                />{visitor.name}
                                            </TableCell>
                                        )}
                                        <TableCell>{visitor.email}</TableCell>
                                        <TableCell>
                                            <div className={styles.departmentHeader}>
                                                {visitor.department}
                                            </div>{" "}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default VisitorsTable;
