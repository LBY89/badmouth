import { Link } from 'react-router-dom'

import Button from '@mui/material/Button';

const Shop =()=> {
    return(
        <div>
            <div>
                <Button component={Link} to="/restaurants">
                    restaurant
                </Button>
                <Button component={Link} to="/shops">
                    shops
                </Button>
                <Button component={Link} to="/home">
                    home
                </Button>
                <Button component={Link} to="/shops">
                    xxx
                </Button>
            </div> 
            Shop
        </div>
    )
}

export default Shop 