import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const pastes = useSelector((state) => state.paste.pastes);
    const dispatch = useDispatch();

    const filteredData = pastes.filter(
        (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    function handleShare(paste) {
        const shareUrl = `${window.location.origin}/pastes/${paste._id}`;

        if (navigator.share) {
            navigator.share({
                title: paste.title,
                text: 'Check out this paste:',
                url: shareUrl,
            })
                .then(() => toast.success("Shared successfully!"))
                .catch((error) => toast.error("Failed to share: " + error.message));
        } else {
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
        }
    }

    return (
        <div className="min-h-screen bg-[#1e1e1e] p-5">
            {/* Search Input */}
            <div className="flex justify-center">
                <input
                    type="text"
                    className="p-3 w-full max-w-lg rounded-xl bg-gradient-to-r from-[#3e4249] to-[#2a2f36] shadow-md focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300 text-white"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Pastes List */}
            <div className="flex flex-col gap-5 mt-5 items-center">
                {filteredData.length > 0 ? (
                    filteredData.map((paste) => (
                        <div
                            key={paste?._id}
                            className="w-full max-w-3xl bg-[#2a2f36] p-4 rounded-lg border border-gray-600 shadow-md transition-all hover:shadow-xl"
                        >
                            <div className="text-xl font-bold text-white">{paste.title}</div>
                            <div className="text-gray-400 mt-2 p-2 bg-[#3e4249] rounded-lg">{paste.content}</div>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 mt-3 justify-center">
                                <a href={`/?pasteId=${paste?._id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                    Edit
                                </a>
                                <a href={`/pastes/${paste?._id}`} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                                    View
                                </a>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(paste?.content);
                                        toast.success("Copied to clipboard");
                                    }}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                                >
                                    Copy
                                </button>
                                <button
                                    onClick={() => handleDelete(paste?._id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleShare(paste)}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    Share
                                </button>
                            </div>

                            <div className="text-sm text-gray-400 mt-3">{paste.createdAt}</div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center">No pastes found...</p>
                )}
            </div>
        </div>
    );
};

export default Paste;
