import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ connectionId, name, subtitle, userPicturePath }) => {
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const connections = useSelector((state) => state.user.connections);
    const REACT_APP_HOST = process.env.REACT_APP_HOST;

    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = connections.find((connection) => connection._id === connectionId);

    const patchFriend = async () => {
        const response = await fetch(`${REACT_APP_HOST}/users/${_id}/${connectionId}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        dispatch(setFriends({ connections: data }));
    };

    return (
        <FlexBetween>
            <FlexBetween>
                <UserImage image={userPicturePath} size="55px" />
                <Box
                    ml="0.5rem"
                    onClick={() => {
                        navigate(`/profile/${connectionId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {!(connectionId === _id) && (
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{ backgroundColor: primaryLight, p: "0.6rem"}}
                >
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryDark }} /> 
                    ) : (
                        <PersonAddOutlined sx={{ color: primaryDark }} /> 
                    )}
                </IconButton>
            )}
        </FlexBetween>
    )
}

export default Friend;