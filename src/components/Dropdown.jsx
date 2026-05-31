import React, { useCallback, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";

export default function Dropdown({ trigger, children, id, ariaLabel }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const triggerRef = useRef(null);
  const isOpen = Boolean(anchorEl);

  const toggle = useCallback(() => {
    setAnchorEl((prev) => (prev ? null : triggerRef.current));
  }, []);

  const close = useCallback(() => {
    setAnchorEl(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      {trigger({ isOpen, toggle, triggerRef })}
      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={close}
        aria-label={ariaLabel}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        TransitionProps={{
          onEntered: (node) => node.querySelector("input")?.focus(),
        }}
        PaperProps={{
          sx: {
            width: "min(520px, calc(100vw - 64px))",
            borderRadius: "14px",
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ p: "0.7rem" }}>
          {children({ close })}
        </Box>
      </Popover>
    </Box>
  );
}
