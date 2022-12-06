import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const FeedWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);
    const REACT_APP_HOST = process.env.REACT_APP_HOST;

    //api call for fetching all posts
    const getPosts = async () => {
        const response = await fetch(`${REACT_APP_HOST}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    const getUserPosts = async () => {
        const response = await fetch(`${REACT_APP_HOST}/posts/${userId}/posts`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };

    useEffect(() => {
        if(isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []);

    return (
        <>
            {posts.map((
                {
                    _id,
                    userId,
                    firstName,
                    lastName,
                    userType,
                    description,
                    legalDomain,
                    location,
                    picturePath,
                    userPicturePath,
                    interests,
                    comments,
                }
            ) => (
                <PostWidget 
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    userType={userType}
                    description={description}
                    legalDomain={legalDomain}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    interests={interests}
                    comments={comments}
                />
            )
            )}
        </>
    )
    
}

export default FeedWidget;