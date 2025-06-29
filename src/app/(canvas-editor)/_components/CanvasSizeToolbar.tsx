import { FaMobileAlt, FaTabletAlt, FaImage, FaUserCircle, FaDesktop, FaTv, FaSquare, FaFileAlt, FaRegWindowMaximize } from 'react-icons/fa';

interface PropsType {
    onSizeChange: (platform: 'mobile' | 'tablet' | 'thumbnail' | 'profile' | 'desktop' | 'wideScreen' | 'cardNews' | 'poster' | 'banner') => void;
    sizeDescriptions: {
        [key in 'mobile' | 'tablet' | 'thumbnail' | 'profile' | 'desktop' | 'wideScreen' | 'cardNews' | 'poster' | 'banner']: string;
    };

}

export default function CanvasSizeToolbar({ onSizeChange, sizeDescriptions }: PropsType) {
    return (
        <div className="absolute top-4 left-4 space-y-2 z-[10000000000000]">
            <div className="space-y-2">
                {['mobile', 'tablet', 'thumbnail', 'profile', 'desktop', 'wideScreen', 'cardNews', 'poster', 'banner'].map((platform) => (
                    <button
                        key={platform}
                        onClick={() => onSizeChange(platform as 'mobile' | 'tablet' | 'thumbnail' | 'profile' | 'desktop' | 'wideScreen' | 'cardNews' | 'poster' | 'banner')}
                        className="bg-gray-500 text-white px-4 py-2 rounded flex items-center justify-center"
                        title={sizeDescriptions[platform as 'mobile' | 'tablet' | 'thumbnail' | 'profile' | 'desktop' | 'wideScreen' | 'cardNews' | 'poster' | 'banner']}
                    >
                        {platform === 'mobile' && <FaMobileAlt />}
                        {platform === 'tablet' && <FaTabletAlt />}
                        {platform === 'thumbnail' && <FaImage />}
                        {platform === 'profile' && <FaUserCircle />}
                        {platform === 'desktop' && <FaDesktop />}
                        {platform === 'wideScreen' && <FaTv />}
                        {platform === 'cardNews' && <FaSquare />}
                        {platform === 'poster' && <FaFileAlt />}
                        {platform === 'banner' && <FaRegWindowMaximize />}
                    </button>
                ))}
            </div>
        </div>
    )
}