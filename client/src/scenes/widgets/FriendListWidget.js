import { useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const connections = useSelector((state) => state.user.connections);

    const getFriends = async () => {
        const response = await fetch(
            `REACT_APP_HOST/users/${userId}/connections`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ connections: data }));
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                varaint="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {connections.map((connection) => (
                    <Friend 
                        key={connection._id}
                        connectionId={connection._id}
                        name={`${connection.firstName} ${connection.lastName}`}
                        subtitle={connection.userType}
                        userPicturePath={connection.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )
}

export default FriendListWidget;