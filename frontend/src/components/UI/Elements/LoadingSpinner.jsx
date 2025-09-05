export default function LoadingSpinner({ text, height }) {
  return (
    <div className={`min-h-${height ? height : "screen"} flex items-center justify-center`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-400 animate-pulse">{text ? text : "Loading..."}</p>
      </div>
    </div>
  );
}
