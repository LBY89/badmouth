//import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import * as React from 'react';
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 0,
        borderRadius: 1,
        fontSize: '0.875rem',
        fontWeight: '700',
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const Landing = () => {

    return(
        <div style={{ width: '100%', height: '100%' }}>
        <Box
            sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            }}
        >
            <Item>some text</Item>

            <Item sx={{ gridColumn: '1', gridRow: '1 / 3' }}>
                <img src="../gossip.png" alt="badmouth log" width="300" height="250" />
            </Item>
            <Item 
                sx={{
                
                    margin: 'auto'
                }}
                >
                <Button component={Link} to="/signin">
                    Sign in
                </Button>
                <Button component={Link} to="/signup">
                    Sign up
                </Button>
                <Button component={Link} to="/home">
                    Just checking
                </Button>
            </Item>
        </Box>
        </div>
    )
}

export default Landing 