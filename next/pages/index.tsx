import React from "react";
import Router from "next/router";
import { useMount } from "react-use";
export default function Index () {
    useMount(() => Router.push("/task"));
    return (
        <></>
    );
}