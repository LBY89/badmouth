//import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Landing = () => {
    return(
        <div>
           we all could have a bad day with a meal at a restaurant or with some products I purchased. 
           Instead of paid money and complain to your spouse or friend, why not tell more and help improve?
           make your bad day experience, count.

           <div><img src="../badmouth.jpg" alt="badmouth log" width="300" height="300"/></div>

            <div>
                <Button component={Link} to="/signin">
                    Sign in
                </Button>
                <Button component={Link} to="/signup">
                    Sign up
                </Button>
            </div> 
            <div>
            <Button component={Link} to="/home">
                    Just checking
            </Button>
            </div>
           
        </div>
    )
}

export default Landing 