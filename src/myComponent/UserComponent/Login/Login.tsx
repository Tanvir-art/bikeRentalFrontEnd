import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../redux/api/api";
import { useAppDispatch } from "../../../redux/hooks";
import { loginUser as loginUserAction } from "../../../redux/features/loginSlice";
import { toast } from "react-toastify";


type LoginData = {
    email: string,
    password: string
}

const Login = () => {
    const [loginValue, setLoginValue] = useState<LoginData>({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [loginUser] = useLoginUserMutation();
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginValue((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await loginUser(loginValue);
        console.log(response?.data?.token);
        if ('data' in response) {
            // console.log(data)
            // Assuming `response.data` has your desired user data
            const userData = {
                ...response?.data?.data,
                token: response?.data?.token
            }
            console.log('Login successful:', userData);
            dispatch(loginUserAction(userData));
            localStorage.setItem('user', JSON.stringify(userData));
            if (response?.data?.data?.role === "admin") {
                navigate("/admin/profile");
            } else {
                navigate("/");
            }
            toast('Login Successful');
        } else {
            // Handle error case (response.error)
            toast('Login Unsuccessful');
            console.error('Login failed:', response.error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-700">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={loginValue.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginValue.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Did Not Signup?{" "}
                    <Link to="/signup" className="text-blue-700 hover:underline">
                        Signup
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login;
