import App from "../App"
import LoginPage from "../pages/auth/login/LoginPage"
import LandingPage from "../pages/landing/LandingPage"

const routes = [
    {
        path: '',
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    }
]

export default routes