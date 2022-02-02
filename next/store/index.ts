import { createStore } from "redux";
import React, { useState, useEffect } from 'react';
import { Provider } from "react-redux";
import Navigation from "../components/Navigation";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import Button from '@material-ui/core/Button';
import { api } from '../plugins/axios';
import axios from 'axios'
import { apiUserBearerAuthenticationResponseType } from "../types/api/user/bearerAuthentication/response"

const initialState = {
    loginInfo: null,
    count: 1,
    post: 100,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setLoginInfo':
            return { ...state, loginInfo: action.value, };
        case 'setCount':
            return { ...state, count: action.value, };
        case 'setPost':
            return { ...state, post: action.value, };
        default:
            return state;
    }
};

const store = createStore(reducer);
export default store;