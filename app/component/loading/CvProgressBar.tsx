export default function CvProgressBar({ step }: { step: number }) {
  const totalSteps = 6;

  return (
    <div className="w-full py-6 flex justify-center px-2">
      <div className="flex items-center flex-wrap justify-center pb-[2rem]c">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < step;
          const isActive = stepNumber === step;

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`rounded-full flex items-center justify-center text-xs sm:text-sm font-medium
                  ${isCompleted ? "bg-secondary text-white" : ""}
                  ${isActive ? "bg-accent text-white" : ""}
                  ${!isCompleted && !isActive ? "bg-gray-200 text-gray-600" : ""}
                  h-6 w-6 sm:h-8 sm:w-8
                `}
              >
                {stepNumber}
              </div>

              {/* Connector Line */}
              {stepNumber < totalSteps && (
                <div
                  className={`h-1 mx-1 sm:mx-2
                    ${isCompleted ? "bg-emerald-500" : "bg-gray-300"}
                    w-8 sm:w-12
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
