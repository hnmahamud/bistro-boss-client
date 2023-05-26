const LoadingSpinner = ({ fullScreen }) => {
  // Loading animation
  return (
    <>
      {fullScreen === true ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-4xl font-thin">L</p>
          <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin mt-2 border-blue-400" />
          <p className="text-4xl font-thin">ading....</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-192px)]">
          <p className="text-4xl font-thin">L</p>
          <div className="w-6 h-6 border-4 border-dashed rounded-full animate-spin mt-2 border-blue-400" />
          <p className="text-4xl font-thin">ading....</p>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
