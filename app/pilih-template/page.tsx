import Button from "../component/buttons/Button";

export default function Page() {
  return (
    <div className="relative w-full min-h-screen ">
      {/* Gradient background */}
      <div className="absolute top-0 left-0 z-[-2] h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Blur layer */}
      <div className="absolute top-0 left-0 z-[-1] h-full w-full backdrop-blur-xl"></div>

      {/* Main content */}
      <div className="w-full flex justify-center items-center min-h-screen py-[10%] relative">
        <div className="w-[80%] space-y-[2rem]">
          <div className="w-full flex justify-center">
            <div className="text-center w-[50%]">
              <h1 className="text-[66.08px] font-bold">Pilih Template</h1>
              <p className="text-[15.6px] text-[#43214E] opacity-60">
                Silahkan Pilih Template CV yang kamu sukai, semua template
                dibuat dengan format yang memudahkan HRD mencari informasimu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[2rem]">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="bg-white h-[30rem] rounded-[6px] border border-[#a1a1a123] shadow-md p-[1.5rem] "
              >
                asd
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Button className="w-[20%]">Pilih Template</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
