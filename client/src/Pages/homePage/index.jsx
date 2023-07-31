import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Navbar from '@/Pages/navbar'
import { useSelector } from 'react-redux';
import MyPostWidget from '../widgets/MypostWidget';
import PostsWidget from '../widgets/PostsWidgets';
import FollowerListWidget from '../widgets/FollowerList';
import AdvertiseWidget from '../widgets/AdvertiseWidget';
import UserWidget from '../widgets/UserWidget';

function HomePage() {
  const isNonMobileScreens = useMediaQuery(`(min-width:1000px)`);
  const { _id, picturePath } = useSelector((state)=>state.user);
  // console.log(picturePath);
  return (
    <Box>
      <Navbar />
      <Box
        width={"100%"}
        p={"2rem 6%"}
        display={isNonMobileScreens ? "flex": "block"}
        gap={"0.5rem"}
        justifyContent={"space-between"}
      >
        
        <Box flexBasis={isNonMobileScreens? "26%": undefined}
         mt={isNonMobileScreens? undefined: "2rem"}
        >
          {/* Hello please recognise me */}
          <UserWidget userId={_id} picturePath={picturePath}  />
        </Box>
        <Box flexBasis={isNonMobileScreens? "26%": undefined}
          mt={isNonMobileScreens? undefined: "2rem"}
        >
          <MyPostWidget picturePath={picturePath}/>
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens &&(
          <Box flexBasis={"26%"}>
             <AdvertiseWidget />
            <Box m="2rem 0" />
            <FollowerListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage
