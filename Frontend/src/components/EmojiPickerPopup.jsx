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
        <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-2xl bg-purple-50 text-purple-500 rounded-lg">
          {icon ? (
            <img
              src={icon}
              alt="Selected emoji"
              className="h-8 w-8 md:w-12 md:h-12"
            />
          ) : (
            <LuImage />
          )}
        </div>
        <p className="text-sm md:text-lg">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute top-2 md:-top-2 -right-2 z-10 cursor-pointer p-0.5"
          >
            <LuX className="text-base" />
          </button>
          {/* Emoji Picker Wrapper */}
          <div className="max-w-[95vw] md:max-w-[350px] w-full overflow-hidden rounded-md shadow-lg border border-gray-200 bg-white mt-5">
            <EmojiPicker
              open={isOpen}
              onEmojiClick={(emoji) => {
                onSelect(emoji?.imageUrl || "");
                setIsOpen(false);
              }}
              width="100%" // Ensures it fits container
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
