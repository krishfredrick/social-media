import { useMemo, useState } from "react";
// import Navbar from "./componets/Navbar/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@/Pages/loginPage";
import ProfilePage from "@/Pages/profilePage";
import HomePage from "@/Pages/homePage";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

function App() {
  const mode = useSelector((state)=> state.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state)=>state.token)) 
  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/home" element={isAuth? <HomePage />: <Navigate/>  } />
          <Route path="/profile/:userId" element={isAuth? <ProfilePage />: <Navigate/>  } />
          {/* <Route path="/profile/:userId" element={<ProfilePage />} /> */}
        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
