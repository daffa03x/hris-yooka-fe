'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

const Error403 = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };
  return (
        <div className="container">
            <div className="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
                <div className="-intro-x lg:mr-20">
                    <Image alt="Midone - HTML Admin Template" className="h-48 lg:h-auto" src="/images/error-illustration.svg" width={300} height={300}/>
                </div>
                <div className="text-white mt-10 lg:mt-0">
                    <div className="intro-x text-8xl font-medium">403</div>
                    <div className="intro-x text-xl lg:text-3xl font-medium mt-5">Oops. Kamu tidak memiliki akses.</div>
                    <div className="intro-x text-lg mt-3">Anda tidak memiliki akses ke halaman ini.</div>
                    <button onClick={() => handleBack()} className="intro-x btn py-3 px-4 text-white border-white dark:border-darkmode-400 dark:text-slate-200 mt-10">Kembali</button>
                </div>
            </div>
        </div>
  )
}

export default Error403;