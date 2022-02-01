import React from "react";
import { Provider } from "react-redux";
import Navigation from "/components/Navigation";
import '../styles/reset.css'
import '../styles/frame.scss'
import '../styles/globals.scss'
import store from "/store/index";

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Provider store={store}>
                <header>
                    header
                </header>
                <main>
                    <Component {...pageProps} />
                </main>
                <Navigation />
            </Provider>
        </div>
    )
}

export default MyApp
