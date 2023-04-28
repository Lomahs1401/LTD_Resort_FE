import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AuthUser() {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('access_token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const userDetail = JSON.parse(userString);
        return userDetail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, tokenzz) => {
        sessionStorage.setItem('access_token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));

        setToken(token);
        setUser(user);
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login')
        message.success(`Logout successful!`);
    }

    const http = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers: {
            "Content-Type": "application/json"
        }
    })

    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        logout,
        http,
    }
}