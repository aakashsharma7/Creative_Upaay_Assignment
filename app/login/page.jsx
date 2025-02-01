"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import { toast } from "react-toastify";

const defaultData = { username: "", password: "" };

const Login = () => {
    const [data, setData] = useState(defaultData);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onLogin = async (e) => {
        e.preventDefault();

        if (!data.username || !data.password) {
            toast.info("Please fill all mandatory parameters");
            return;
        }

        setLoading(true); 

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setData(defaultData);
                router.push('/dashboard');
            } else {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center ">
            <div className="bg-white shadow-xl px-16 pt-8 pb-12 mb-4 rounded-2xl">
                <h1 className="text-3xl mb-4 text-center">Login</h1>
                <form className="space-y-4">
                    <Input
                        label="Username"
                        id="username"
                        type="text"
                        value={data.username}
                        onChange={onValueChange}
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={onValueChange}
                    />
                    <button
                        className={`${
                            loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
                        } text-white font-bold py-2 px-4 rounded-full w-full`}
                        onClick={onLogin}
                        disabled={loading} 
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
