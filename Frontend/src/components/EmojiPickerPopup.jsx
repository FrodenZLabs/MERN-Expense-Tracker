import React, { useState } from "react";
import { LuImage, LuX } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="flex items-center cursor-pointer gap-4"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
          {icon ? (
            <img src={icon} alt="Selected emoji" className="w-12 h-12" />
          ) : (
            <LuImage />
          )}
        </div>
        <p>{icon ? "Change Icon" : "Pick Icon"}</p>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
          >
            <LuX />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl || "");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
