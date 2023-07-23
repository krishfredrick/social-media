import Follower from "@/components/Follower";
import WidgetWrapper from "@/components/WidgetWrapper";
import { setFollower } from "@/redux-store";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const FollowerListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const followers = useSelector((state) => state.user.followers);

  const getfollowers = async () => {
    const response = await fetch(
      `http://localhost:4000/users/${userId}/follower`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFollower({ followers: data }));
  };

  useEffect(() => {
    getfollowers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        follower List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {followers.map((follower) => (
          <Follower
            key={follower._id}
            followerId={follower._id}
            name={`${follower.firstName} ${follower.lastName}`}
            subtitle={follower.occupation}
            userPicturePath={follower.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FollowerListWidget;