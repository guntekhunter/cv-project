// components/LoadingScreen.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-90">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-500"></div>
    </div>
  );
}
