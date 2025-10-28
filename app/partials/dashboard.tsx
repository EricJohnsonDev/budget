import { Box } from "@mui/material";
import * as React from "react";

interface Props {
  visible: boolean;
}

export default function Dashboard({ visible }: Props) {
  if (visible) {
    return (
      <Box data-testid="dashboardOuterBox">I'm a dashboard component!</Box>
    );
  }
}
