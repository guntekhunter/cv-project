import Image from "next/image";
import Navbar from "./component/global/Navbar";
import Biodata from "./component/card/Biodata";
import FileDisplay from "./component/card/FileDisplay";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center min-h-screen py-[5%]">
      <div className='bg-white w-[90%] rounded-[10px] p-[3rem] border-color-[#F6F6F6] border-[1px] text-[#777777]'>
        <div className="flex space-x-[2rem]">
          <div className="w-[50%]">
            <Biodata />
          </div>
          <div className="w-[50%]">
            <FileDisplay />
          </div>
        </div>
      </div>
    </div >
  );
}
