import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "scenes/navbar";
import CreatePost from "scenes/widgets/CreatePost";
import FeedWidget from "scenes/widgets/FeedWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import UserWidget from "scenes/widgets/UserWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar connectionId={_id}/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "25%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "40%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
        >
        <CreatePost picturePath={picturePath}/>
        <FeedWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="25%">
            <FriendListWidget userId={_id} picturePath={picturePath} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage;