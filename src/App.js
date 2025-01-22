import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useMsal } from '@azure/msal-react';

const loginRequest = {
    scopes: ["User.Read", "openid", "offline_access"], // Adjust based on your app's required scopes
};

function App() {
    const { instance, accounts } = useMsal();

    const login = async () => {
        try {
            const loginResponse = await instance.loginPopup(loginRequest);
            console.log("Login successful: ", loginResponse);
        } catch (error) {
            console.error("Login failed: ", error);
        }
    };

    const getToken = async () => {
        try {
            const tokenResponse = await instance.acquireTokenSilent({
                account: accounts[0],
                ...loginRequest,
            });
            console.log("Token acquired: ", tokenResponse.accessToken);
        } catch (error) {
            console.error("Token acquisition failed: ", error);
        }
    };

    const logout = () => {
        instance.logoutPopup();
    };

    return (
        <div>
            <h1>React PWA with Azure Entra ID</h1>
            {!accounts.length ? (
                <button onClick={login}>Login</button>
            ) : (
                <>
                    <button onClick={getToken}>Get Token</button>
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </div>
    );
}

export default App;
