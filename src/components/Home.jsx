import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const existingPaste = pastes.find(paste => paste._id === pasteId);
            if (existingPaste) {
                setTitle(existingPaste.title);
                setValue(existingPaste.content);
            }
        }
    }, [pasteId, pastes]);

    function createPaste() {
        if (!title.trim() || !value.trim()) {
            toast.error("Title and content cannot be empty!");
            return;
        }

        const paste = {
            title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toLocaleString(), // Formats the date in readable format
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
            setTimeout(() => navigate('/', { replace: true }), 100);
        } else {
            dispatch(addToPastes(paste));
            setTitle('');
            setValue('');
        }
    }

    return (
        <div className='flex flex-col gap-4 items-center mt-5 px-4'>
            {/* Logo Image */}
            <img
                src="https://media1.thehungryjpeg.com/thumbs/800_3656449_67zia1zy6datiwxo1hjh9dlv6ldctr7pg218elfs.jpg"
                alt="codeKeep Logo"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow-lg relative top-[-8px]"
            />




            {/* Title and Description */}
            <h1 className='text-3xl font-bold text-white'>CodeKeep</h1>
            <p className='text-gray-300 text-center max-w-lg'>
                Store and recall your coding memories with ease. Save, edit, and manage your code snippets effortlessly.
            </p>

            {/* Input Fields */}
            <input
                type="text"
                className="p-3 w-full max-w-lg rounded-2xl bg-gradient-to-r from-[#3e4249] to-[#2a2f36] shadow-md focus:ring-2 focus:ring-blue-400 outline-none placeholder-gray-300 text-white"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                className="p-3 w-full max-w-lg h-48 rounded-2xl bg-gradient-to-r from-[#2f3228] to-[#3d5740] shadow-md focus:ring-2 focus:ring-green-400 outline-none placeholder-gray-300 text-white"
                placeholder="Enter Content"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />

            {/* Create/Update Button */}
            <button
                className={`p-2 w-full max-w-lg rounded-lg text-white transition duration-300 ${title.trim() && value.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
                onClick={createPaste}
                disabled={!title.trim() || !value.trim()}
            >
                {pasteId ? 'Update Paste' : 'Create Paste'}
            </button>
        </div>
    );
}

export default Home;
