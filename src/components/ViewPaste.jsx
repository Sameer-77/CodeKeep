import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
    const { id } = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.find((p) => p._id === id);

    return (
        <div className="flex flex-col gap-4 items-center mt-5">
            <input
                type="text"
                className="p-3 w-[600px] rounded-2xl bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 shadow-md"
                placeholder="Enter Title"
                value={paste?.title || ''}
                disabled
            />
            <textarea
                className="p-3 w-[600px] h-[200px] rounded-2xl bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-300 shadow-md"
                placeholder="Enter Content"
                value={paste?.content || ''}
                disabled
            />
        </div>
    );
}

export default ViewPaste;
