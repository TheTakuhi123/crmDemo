import { FC } from "react";
import { Box, Tooltip } from "@mui/material";
import raynetLogo from '../../assets/raynetLogo.png';

const RaynetLogo: FC = () => {
    return (
        <Box
            component="a"
            href="https://raynet.cz/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.2)',
                }
            }}
        >
            <Tooltip title="Přejít na raynet.cz">
                <Box
                    component="img"
                    src={raynetLogo}
                    alt="Raynet Logo"
                    sx={{
                        height: 40,
                        width: 'auto',
                        cursor: 'pointer'
                    }}
                />
            </Tooltip>

        </Box>
    );
};

export default RaynetLogo;
