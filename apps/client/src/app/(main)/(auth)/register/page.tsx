import { RegisterForm } from "@/components/auth/register-form";

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-96px)]">
      {/* Background effects */}
      <div className="absolute w-[403px] h-[403px] left-[85px] top-[75px] bg-gradient-to-br from-[#09B96D] to-[#007EA7] opacity-15 blur-[150px] rounded-md"></div>
      <div className="absolute w-[133px] h-[392px] left-[661px] top-[551px] bg-[#10B4FF] opacity-20 blur-[100px]"></div>
      <div className="absolute w-[133px] h-[392px] left-[-69px] top-[264px] bg-[#09B96D] opacity-15 blur-[100px]"></div>
      <div className="absolute w-[403px] h-[403px] left-[85px] top-[620px] bg-gradient-to-br from-[#09B96D] to-[#007EA7] opacity-15 blur-[150px] rounded-md"></div>

      <div className="flex min-h-[calc(100vh-96px)] p-4">
        {/* Login Form */}
        <div className="lg:w-1/2 w-full flex justify-center pt-4 z-10 px-8">
          <RegisterForm />
        </div>

        <div className="hidden lg:w-1/2 rounded-sm lg:flex flex-col bg-gradient-to-b from-[#09B96D] to-[#007EA7] p-12 pr-0 text-white">
          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-light">Welcome to</h2>
            <h1 className="text-3xl font-bold">Contract Management System</h1>
            <p className="text-lg">
              Manage, track, and streamline your contracts with ease.
              <br />
              Let's get you started!
            </p>
          </div>
          <img src="/dashboard.png" alt="Dashboard preview" className="self-end max-h-[70vh] 2xl:max-h-[50vh] w-full" />
        </div>
      </div>
    </section>
  )
}

