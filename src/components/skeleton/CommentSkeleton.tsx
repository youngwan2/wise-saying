export default function CommentSkeleton() {
    return (
        <div className="w-full mx-auto bg-[rgba(255,255,255,0.1)] rounded-lg p-4 space-y-2 my-3">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse"></div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5 animate-pulse"></div>
            </div>
        </div>
    )
}