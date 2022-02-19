import React, { useState, useEffect } from 'react';
import LoginLayout from '@/layouts/login';
import CreateUser from "@/components/CreateUser";
Login.getLayout = function getLayout(page) {
    return (
        <LoginLayout>{page}</LoginLayout>
    );
};
function Login() {
    return (
        <>
            <CreateUser onCloseMyself={()=>{}} loginInfo={null} />
        </>
    );
}
export default Login;