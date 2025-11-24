import Image from "next/image";
import React from "react";

const Login = ({ children }) => {
  return (
    <div className="login">
      <div className="container sm:px-10">
        <div className="block xl:grid grid-cols-2 gap-4">
          <div className="hidden xl:flex flex-col min-h-screen">
            <div className="-intro-x flex items-center pt-5">
              <Image
                  width={50}
                  height={50}
                  alt="Midone - HTML Admin Template"
                  className="w-32 h-32"
                  src="/logo_yooka.png" // Path yang benar untuk Next.js Image component
              />
              {/* <span className="text-white text-lg ml-3"> HRIS</span> */}
            </div>
            <div className="my-auto">
              <Image width={300} height={300} alt="Midone - HTML Admin Template" className="-intro-x w-1/2 -mt-16" src="../../../images/illustration.svg" />
              <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                Selamat Datang
                <br />
                PT Yooka Arana Niaga
              </div>
              <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">Kelola Semua Data Terkait Kepegawaian</div>
            </div>
          </div>
          <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
