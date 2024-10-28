const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div
                className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-2"></div>
            <p className="text-gray-500 text-sm">Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
