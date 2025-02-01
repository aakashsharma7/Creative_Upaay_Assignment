"use client"
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import { toast } from "react-toastify";

const defaultData = { name: "", username: "", password: "" };

const Register = () => {
    const [data, setData] = useState(defaultData);
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    
    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!data.username || !data.password || !data.name) {
            alert("Please fill all mandatory paramters");
            return;
        }
        
        try {
            const response = await fetch('/api/users/register',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            setData(defaultData);
            
            if (response.status === 200) {
                router.push('/login');
            }
        } catch (error) {
            toast.error("Invalid credentials")   
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white shadow-xl px-16 pt-8 pb-12 mb-4 rounded-2xl">
                <h1 className="text-3xl mb-4 text-center">Register</h1>
                <form className="space-y-4">
                    <Input 
                        label="Name"
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={onValueChange}
                    />
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
                        onClick={(e) => onRegister(e)}
                        disabled={loading} 
                    >
                        {loading ? "Registering..." : "Submit"}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
    
}

export default Register;