

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { Box, TextField, Stack, Grid, Paper } from "@mui/material";
import {
    AppBar,
    styled,
    Toolbar,
    InputBase
  } from "@mui/material";
import PropTypes from 'prop-types';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import complaintService from '../services/complaints'
//import {  Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@mui/material'
import ComplaintCard from '../Components/ComplaintCard'

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));


const ButtonStyles = {
  bgColor: {
    backgroudColor: "#f9a825",
  },
};



const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});



function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

const Home = ({user, handleLogout, complaints, setComplaints }) => {
  // to solve newly added complaint not clickable, receive setComplaints from 
  // App parent 
  
  const [filter, setFilter] = useState("");
  

  const handleSearchBarInput = (e) => {
    setFilter(e.target.value);
  };
    
  const matchFilter = complaints.filter((complaint) => complaint.content.toLowerCase().includes(filter.toLowerCase()) || 
  complaint.title.toLowerCase().includes(filter.toLowerCase()))
  
  const filteredComplaints = !filter
  ? complaints
  : matchFilter
  
  return(
      <>
          <AppBar position="sticky">
          { user === null ?
              <StyledToolbar>
              <Search onChange={handleSearchBarInput}>
                <InputBase placeholder="search..."/>
              </Search>
              <Button
              style={ButtonStyles.bgColor}
              variant="fab"
              component={Link} to={'/signin'}
              >
              sign in</Button>
              <Button
              style={ButtonStyles.bgColor}
              variant="fab"
              component={Link} to={'/signup'}
              >sign up</Button>
              </StyledToolbar>

              :

               <StyledToolbar>
                <Search onChange={handleSearchBarInput}>
                  <InputBase placeholder="search..." />
                </Search>
                {user.firstname} logged in{" "}
                <Button
                  onClick={handleLogout}
                  style={ButtonStyles.bgcolor}
                  variant="fab"
                  component={Link}
                  to={"/home"}
                >
                  log out
                </Button>
              </StyledToolbar>
          }
          </AppBar>
          
          <Box
              sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'row',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              }}
              >
              <Grid container spacing={3}>
              {filteredComplaints.map(complaint => 
                  <Grid item key={complaint.id}>
                    <ComplaintCard complaint={complaint}/>
                      {/* <Button component={Link} to={`/complaints/${complaint.id}`} onClick={() => 
                          localStorage.setItem('complaintStored', JSON.stringify(complaint))}>
                          {complaint.content}
                      </Button> */}
                  </Grid>)}
              </Grid>
              <Item>
              <Stack>
              </Stack>
              </Item>
              <Item flex={1}> 
              <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={1}
                  >
              <Button 
                  startIcon={<LocalDiningIcon/>} 
                  color="secondary"
                  >
                  restaurant
              </Button>
              <Button 
                  startIcon={<ShoppingBasketIcon/>}
                  color='otherColor'
                  >
                  shops
              </Button>
              </Stack>
              </Item>
          </Box>
      </>
  )
};

export default Home;
