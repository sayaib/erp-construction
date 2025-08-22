import React from "react";
import { Grid, Box, Paper, Typography } from "@mui/material";
import "./style.css";

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={3} padding={3}>
        {/* Box 1 */}

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper elevation={3} className="grid-status">
            <Typography variant="h5">Total BOQ</Typography>
            <Typography variant="h4" mt={2}>
              90
            </Typography>
          </Paper>
        </Grid>

        {/* Box 2 */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper elevation={3} className="grid-status">
            <Typography variant="h5">Raised BOQ in DEC</Typography>
            <Typography variant="h4" mt={2}>
              20
            </Typography>
          </Paper>
        </Grid>

        {/* Box 3 */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper elevation={3} className="grid-status">
            <Typography variant="h5">Approved BOQ</Typography>
            <Typography variant="h4" mt={2}>
              3
            </Typography>
          </Paper>
        </Grid>

        {/* Box 4 */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper elevation={3} className="grid-status">
            <Typography variant="h5">Pending BOQ</Typography>
            <Typography variant="h4" mt={2}>
              4
            </Typography>
          </Paper>
        </Grid>

        {/* Box 5 */}
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <Paper elevation={3} className="grid-status">
            <Typography variant="h5">Rejected BOQ</Typography>
            <Typography variant="h4" mt={2}>
              6
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
