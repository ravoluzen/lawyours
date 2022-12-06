import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "scenes/navbar";
import PostWidget from "scenes/widgets/PostWidget";

const PostDetails = () => {
    const [post, setPost] = useState();
    const [buttonDisable, setButtonDisable] = useState(false)
    const userId = useSelector((state) => state.user._id);
    const token = useSelector((state) => state.token);
    const { postId } = useParams();
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const getPost = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_HOST}/posts/${postId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              });
              const data = await response.json();
              setPost(data);   
              setButtonDisable(true)     
        } catch (error) {
            console.log(error.message)
        }


      };

    
    useEffect(() => {
        console.log(post);

        getPost();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!post) return <h1>Loading...</h1>;

    
  return (
    <Box>
        <NavBar connection={userId}/>
        <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="2rem"
            justifyContent="center"
        >

            <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
                <FlexBetween sx={{flexDirection: "column", p:"1rem", width: "100%"}}>
                    <Typography variant="h2" sx={{color: primary, fontWeight: "500"}}>
                        Comments
                    </Typography>
                    {post.comments.length > 0 ? 
                        (post.comments.map((comment, i) => (
                            <Box key={`${comment.name}-${i}`} width="100%">
                                <Divider />
                                <FlexBetween 
                                    sx={{ 
                                        flexDirection: "column", 
                                        alignItems: "flex-start", 
                                        m: "0.5rem" 
                                    }}>
                                    <FlexBetween>
                                        <UserImage image={comment.user.picturePath} size="55px" />
                                        <Typography 
                                            sx={{ 
                                                width: "100%", 
                                                fontSize: "1.25rem", 
                                                color: primary, 
                                                m:"0.5rem", 
                                                p:"0.5rem" 
                                            }}>
                                            {comment.user.firstName} {comment.user.lastName}
                                        </Typography>
                                    </FlexBetween>

                                    <Typography 
                                        sx={{ 
                                            width: "100%", 
                                            fontSize: "1rem", 
                                            color: main, 
                                            mt:"0.5rem" 
                                        }}>
                                        {comment.comment}
                                    </Typography>
                                </FlexBetween>
                                <Divider />
                            </Box>         
                            ))
                        ):(
                            <Box width="100%">
                                <Divider />
                                <Typography textAlign="center">No Comments</Typography>
                            </Box>
                        )
                    }
                </FlexBetween>
            </Box>
            <Box flexBasis={isNonMobileScreens ? "40%" : undefined}>
                <PostWidget 
                    key={post._id}
                    postId={post._id}
                    postUserId={post.userId}
                    name={`${post.firstName} ${post.lastName}`}
                    userType={post.userType}
                    description={post.description}
                    legalDomain={post.legalDomain}
                    location={post.location}
                    picturePath={post.picturePath}
                    userPicturePath={post.userPicturePath}
                    interests={post.interests}
                    comments={post.comments}
                    buttonDisable={buttonDisable}
                />
            </Box>
            <Box flexBasis={isNonMobileScreens ? "30%" : undefined}>
                <FlexBetween sx={{flexDirection: "column"}}>

                    {post.interests.length > 0 ? (
                        post.interests.map((interest, i) => (
                            <Box key={`${interest.user.firstName}-${i}`} width="100%" p="1rem">
                                <Typography 
                                    variant="h2" 
                                    sx={{
                                        textAlign: "center", 
                                        color: primary, 
                                        fontWeight: "500"
                                    }}
                                >
                                    Interests
                                </Typography>
                                <Divider sx={{ mb: "0.5rem"}}/>
                                <Friend 
                                    connectionId={interest.user.userId}
                                    name={`${interest.user.firstName} ${interest.user.lastName}`}
                                    subtitle={interest.user.userType}
                                    userPicturePath={interest.user.picturePath}
                                />
                                <Typography sx={{ mt:"0.5rem", color: primary, fontWeight: "500" }}>
                                    Location: {interest.user.location}
                                </Typography>
                                <Divider sx={{ mt:"1rem"}}/>
                            </Box>
                        ))
                    ) : (
                        <Box width="100%">
                            <Divider />
                            <Typography textAlign="center">No Comments</Typography>
                        </Box> 
                        )
                }
                </FlexBetween>
            </Box>
        </Box>
    </Box>


  )
}

export default PostDetails;