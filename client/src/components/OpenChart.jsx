import React from 'react';
import { useDispatch } from 'react-redux';
import { openChat } from '../app/features/chatSlice';

const ChatButton = ({ listing }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openChat({ listing, chatId: listing.id }));
  };

  return (
    <button
      onClick={handleClick}
      className="bg-purple-600 text-white px-4 py-2 rounded-lg"
    >
      Open Chat
    </button>
  );
};

export default ChatButton;
