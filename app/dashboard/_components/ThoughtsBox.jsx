import Image from "next/image";
import Lamp from "../../../assets/Sidebar/lamp-on.png";

const ThoughtsBox = () => {
    return (
      <div className=" relative py-4">
  <div className="bg-[#F5F5F5] px-4 mx-5 py-1 rounded-2xl w-[206px] relative">
    <div className="absolute -top-8  left-1/2 transform -translate-x-1/2 w-[66px] h-[66px] rounded-full flex items-center justify-center z-10 bg-gradient-radial from-yellow-200 via-yellow-50 to-transparent bg-[#F5F5F5]">
      <Image
        src={Lamp}
        alt="Lamp"
        className="w-[24px] h-[24px]"
      />
    </div>
    <h3 className="text-[14px] font-medium flex justify-center mt-8 text-black">Thoughts Time</h3>
    <p className="flex justify-center text-gray-500 text-[12px] mt-2">
      We don’t have any notice for 
    </p>
    <p className="flex justify-center text-gray-500 text-[12px]">
    you, till then you can share 
    </p>
    <p className="flex justify-center text-gray-500 text-[12px]">
    your thoughts with your 
    </p>
    <p className="flex justify-center text-gray-500 text-[12px] mb-1">
    peers. 
    </p>
    <div className="flex justify-center my-3">
    <button className="mt-1 bg-white text-black px-4 py-1 rounded-lg text-[14px] font-semibold">
      Write a message
    </button>
    </div>
  </div>
</div>
    );
  };
  
  export default ThoughtsBox;
  