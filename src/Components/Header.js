import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./CSS/Header.module.css";

const Header = () => {
  return (
    <Box className={styles.header}>
      <Typography variant="h6" className={styles.title}>Application</Typography>
    </Box>
  );
};

export default Header;
