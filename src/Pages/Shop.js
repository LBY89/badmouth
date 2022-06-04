import { Link } from 'react-router-dom'

import Button from '@mui/material/Button';
import { Box, Stack } from "@mui/material";

const Shop =()=> {
    return(
        <div>
            <Box bgcolor={"background.default"} color={"text.primary"}>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                    >
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
                </Stack>
            </Box>
            Shop
        </div>
    )
}

export default Shop 