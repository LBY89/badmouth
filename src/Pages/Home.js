
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
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
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const ButtonStyles = {
  bgColor:{
      backgroudColor: '#f9a825'
  }
}

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
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
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

const Home = ({user, handleLogout, complaints, setComplaints }) => {
    //console.log('complaints', complaints);
    const [homeComplaints, setHomeComplaints] = useState([])
    console.log('homeComplaints', homeComplaints);
    
    useEffect(() => {
      complaintService
      .getAll()
      .then(initialComplaints => {
        console.log('promise fulfilled')
        setHomeComplaints(initialComplaints)
      })
      
    }, [])
    
    const filterComplaints = (e) => {
      //console.log('e for search input', e.target.value);
      const filter = e.target.value
      const newComplaints = homeComplaints.filter(complaint => complaint.content.includes(filter))
      setHomeComplaints(newComplaints)
      
    }
    return(
        <>
            <AppBar position="sticky">
            { user === null ?
                <StyledToolbar>
                <Search onChange={filterComplaints}>
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
                search box 
                sign in and up
                {user.firstname} logged in <button onClick={handleLogout}>loggout</button>
                
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

                <Item flex={4}>
                {complaints.map(complaint => 
                    <p key={complaint.id}>
                        <Button component={Link} to={`/complaints/${complaint.id}`} onClick={() => 
                            localStorage.setItem('complaintStored', JSON.stringify(complaint))}>
                            {complaint.content}
                        </Button>
                    </p>)}
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


}
export default Home