// import Connection from '@/database/config';
// import User from '@/models/user';
// import bcryptjs from 'bcryptjs';
// import { NextRequest, NextResponse } from 'next/server';

// Connection();

// export const POST = async (NextRequest) => {
//     try {
//         const body = await NextRequest.json();
//         const { name, username, password } = body;

//         if (!name || !username || !password) {
//             return new Response("Name, Username and Password is required", { status: 401 });
//         }

//         const user = await User.findOne({ username });
//         if (user) {
//             return new Response("Username already exist", { status: 400 });
//         }

//         const salt = await bcryptjs.genSalt(12);
//         const hashedPassword = await bcryptjs.hash(password, salt);

//         const newUser = new User({
//             name,
//             username,
//             password: hashedPassword,
//         })

//         await newUser.save();
        
//         return new Response("User saved successfully", { status: 200 });
//     } catch (error) {
//         console.log(error);
//     }
// }




import Connection from '@/database/config';
import User from '@/models/user';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

Connection();

export const POST = async (NextRequest) => {
    try {
        const body = await NextRequest.json();
        const { name, username, password } = body;

        if (!name || !username || !password) {
            return NextResponse.json({ message: "Name, Username, and Password are required" }, { status: 400 });
        }

        const user = await User.findOne({ username });
        if (user) {
            return NextResponse.json({ message: "Username already exists" }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            username,
            password: hashedPassword,
        });

        await newUser.save();
        
        return NextResponse.json({ message: "User saved successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
};
