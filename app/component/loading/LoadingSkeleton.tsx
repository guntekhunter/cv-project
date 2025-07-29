// components/LoadingScreen.tsx
export default function LoadingSkeleton(props: any) {
  console.log(props.loadingStep, "ini stepnya");
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-90">
      {props.loadingStep && (
        <div className="mt-4 md:w-[30%]">
          <p className="text-sm text-accent mb-1">{props.loadingStep}</p>
          <div className="w-full bg-accent rounded-full h-2">
            <div
              className="bg-green-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${props.chunkProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
