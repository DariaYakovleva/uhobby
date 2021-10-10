import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from "../Template/Template";

import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';

import Recommendation from './recommendation';
import { YouHobbies } from "./your_hobbies";

import { ConfigProvider, AdaptivityProvider, AppRoot } from "@vkontakte/vkui";

const App = () => {
    const [hobbies, setHobbies] = React.useState([]);
    const [cookies, setCookie] = useCookies(['user_id']);
    let user_id = ""
    if ("user_id" in cookies) {
        user_id = cookies.user_id
    } else {
        user_id = Math.random().toString(36).substring(2, 15)
        setCookie('user_id', user_id);
    }

    return <AppRoot mode="partial">
        <Template projectName="UHOBBY" link="https://www.ykvlv.ai/uhobby">
            <YouHobbies setHobbies={setHobbies}/>
            <Recommendation hobbies={hobbies} user_id={user_id}/>
        </Template>
    </AppRoot>
}

ReactDOM.render(
    <CookiesProvider>
    <ConfigProvider>
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>,
    </CookiesProvider>,
  document.getElementById('root')
);
