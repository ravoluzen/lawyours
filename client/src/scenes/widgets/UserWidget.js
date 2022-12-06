import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    Edit,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, TextField} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const visitorId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const data = await response.json();
        setUser(data);
    };
    console.log("visitorId", visitorId);
    console.log("userId", userId);

    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        email,
        location,
        userType,
        viewedProfile,
        connections,
    } = user;

    return (
        <WidgetWrapper>
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {connections.length} connections
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{userType}</Typography>
                </Box>
            </Box>

            <Box>
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}
                    >
                        Email: {email}
                    </Typography>
                </FlexBetween>
            </Box>

            <Box>
                <Typography
                    fontSize="1rem"
                    color={main}
                    fontWeight="500"
                    mb="1rem" 
                >
                    Social Profiles
                </Typography>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <Box>
                            <Typography color={main} fontWeight="500">
                                Twitter
                            </Typography>
                            <Typography color={medium}>
                                Social Network
                            </Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <Box>
                            <Typography color={main} fontWeight="500">
                                LinkedIn
                            </Typography>
                            <Typography color={medium}>
                                Network Platform
                            </Typography>
                        </Box>
                        {/*(visitorId === userId) && (
                            <TextField />
                        )*/}
                    </FlexBetween>
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>
        </WidgetWrapper>
    )
}

export default UserWidget;