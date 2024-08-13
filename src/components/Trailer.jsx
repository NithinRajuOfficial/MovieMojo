/* eslint-disable react/prop-types */
import { useState } from "react";
import ReactModal from "react-modal";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    color: "white",
    borderRadius: "8px",
    width: "100%",
    height: "100%",
  },
};

export default function Trailer({ isOpen, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ytVideo = useSelector((state) => state.movie.info?.videos);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      style={customStyles}
      className={"relative"}
    >
      <i
        className="ri-close-circle-line absolute  right-1 top-1 text-2xl text-black hover:scale-110 hover:cursor-pointer"
        onClick={toggleModal}
      ></i>
      <div className="w-full h-full p-7">
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          url={`https://www.youtube.com/watch?v=${ytVideo?.key}`}
        />
      </div>
    </ReactModal>
  );
}
