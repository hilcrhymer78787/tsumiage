import React from 'react';
import LoginLayout from '@/layouts/login';
import CreateUser from "@/components/user/CreateUser";
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