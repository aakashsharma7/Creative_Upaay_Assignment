import Image from 'next/image'
import React from 'react'
import Edit from "../../../assets/SubHeader/arrow-square-up.png"
import Link from "../../../assets/SubHeader/link.png"
import Add from "../../../assets/SubHeader/add-square.png"
import User1 from "../../../assets/SubHeader/user1.png"
import User2 from "../../../assets/SubHeader/user2.png"
import User3 from "../../../assets/SubHeader/user3.png"
import User4 from "../../../assets/SubHeader/user4.png"

const SubHeader = () => {
  return (
    <div>
    <div className='flex justify-between mt-2 mb-5 '>
        <div className='flex justify-evenly '>
            <h1 className='text-black font-bold text-[46px]'>Mobile App</h1>
            <Image
            src={Edit}
            alt='Edit'
            className='w-[30px] h-[30px] mt-7 ml-3'
            />
            <Image
            src={Link}
            alt='Link'
            className='w-[30px] h-[30px] mt-7 ml-4'
            />
        </div>
        <div className='flex justify-evenly'>
            <Image
            src={Add}
            alt='Add'
            className='w-[18px] h-[18px] mt-7'
            />
            <p className='text-[#5030E5] text-[16px] mt-6 ml-2 mr-5 font-semibold cursor-pointer'>Invite</p>
             <div className="flex -space-x-3 mt-5">
                  <Image className="inline-block h-[38px] w-[38px] rounded-full ring-2 ring-slate-100"
                  src={User1}
                  width={38}
                  alt="user image"></Image>
                  <Image className="inline-block h-[38px] w-[38px] rounded-full ring-2 ring-slate-100"
                  src={User2}
                  alt="user image"></Image>
                  <Image className="inline-block h-[38px] w-[38px] rounded-full ring-2 ring-slate-100"
                  src={User3}
                  alt="user image"></Image>
                  <Image className="inline-block h-[38px] w-[38px] rounded-full ring-2 ring-slate-100"
                  src={User4}
                  alt="user image"></Image>
                  <div className="flex items-center justify-center h-[38px] w-[38px] rounded-full ring-2 ring-slate-100 object-cover bg-[#F4D7DA] text-[#D25B68] text-[15px] font-semibold">+2</div>
                </div>
        </div>
      </div>

    </div>
  )
}

export default SubHeader