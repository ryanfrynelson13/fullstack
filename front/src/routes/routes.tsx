import App from "../App"
import LoginPage from "../pages/auth/login/LoginPage"
import SignupPage from "../pages/auth/signup/SignupPage"
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
            },
            {
                path: 'signup',
                element: <SignupPage />
            }
        ]
    }
]

export default routes