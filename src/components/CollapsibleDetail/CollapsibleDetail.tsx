import React, { useState, useCallback, useEffect } from 'react';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import { Box, Collapse, IconButton, Paper, Stack, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';

interface IProps {
  isOpen: boolean;
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  onDetail: () => void;
  onClose: () => void;
  disabledUpButton?: boolean;
  disabledDownButton?: boolean;
  marginTop?: number;
  marginBottom?: number;
}

// 75%
const DEFAULT_MAX_WIDTH = (document.body.offsetWidth / 4) * 3;
// 20%
const DEFAULT_MIN_WIDTH = document.body.offsetWidth / 2;
// 50%
const DEFAULT_WIDTH = document.body.offsetWidth / 2;

const DEFAULT_MARGIN_TOP = -5;
const DEFAULT_MARGIN_BOTTOM = -5;

const CollapseDetail = ({
  isOpen,
  children,
  onClose,
  onDetail,
  minWidth = DEFAULT_MIN_WIDTH,
  maxWidth = DEFAULT_MAX_WIDTH,
  defaultWidth = DEFAULT_WIDTH,
  marginTop = DEFAULT_MARGIN_TOP,
  marginBottom = DEFAULT_MARGIN_BOTTOM,
}: IProps) => {
  const [drawerWidth, setDrawerWidth] = useState(defaultWidth);
  const [drawerMaxWidth, setDrawerMaxWidth] = useState(maxWidth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    isOpen && onClose();
  }, [location.pathname]);

  const handleMouseDown = () => {
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('mousemove', handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const newWidth = document.body.offsetWidth - e.clientX;

      if (newWidth > minWidth && newWidth < drawerMaxWidth) {
        setDrawerWidth(newWidth);
      }
    },
    [drawerMaxWidth]
  );

  const handleResize = useCallback(() => {
    isOpen && onClose();

    const newMaxWidth = (document.body.offsetWidth / 4) * 3;
    const newWidth = document.body.offsetWidth / 2;

    setDrawerMaxWidth(newMaxWidth);
    setDrawerWidth(newWidth);
  }, [drawerWidth]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement<any>(child, { drawerWidth });
    }
    return child;
  });

  return (
    <Collapse sx={{ zIndex: 10, pl: 2, mt: marginTop, mb: marginBottom, height: `calc(80vh - ${isMobile ? 56 : 64}px)` }} orientation="horizontal" in={isOpen}>
      <Paper sx={{ width: drawerWidth, height: '100%' }} elevation={5}>
        <Stack direction={'row'} height="100%">
          <div
            onMouseDown={() => handleMouseDown()}
            style={{
              width: '5px',
              cursor: 'ew-resize',
            }}
          />
          <Box flexGrow={1} overflow="auto">
            <Stack px={1} pt={2} pb={0.5} direction={'row'} spacing={1}>
              <IconButton onClick={() => onClose()} size="small" color="inherit">
                <ArrowForwardIcon fontSize="inherit" />
              </IconButton>
              <IconButton onClick={onDetail} size="small" color="inherit">
                <OpenInFullOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Stack>
            <Box p={1}>{childrenWithProps}</Box>
          </Box>
        </Stack>
      </Paper>
    </Collapse>
  );
};

export default CollapseDetail;
