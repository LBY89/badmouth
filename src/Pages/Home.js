
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button';


const Home = () => {
  
    return(
        <div>
            <div>
                <Button component={Link} to="/restaurants">
                    restaurant
                </Button>
                <Button component={Link} to="/shops">
                    shops
                </Button>
                <Button component={Link} to="/shops">
                    xxx
                </Button>
                <Button component={Link} to="/shops">
                    xxx
                </Button>
            </div> 
        </div>
    )


}
export default Home