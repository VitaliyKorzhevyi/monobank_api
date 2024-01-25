import { useState } from "react";
import "./App.css";
import { PersonalPage } from "./Pages/PersonalPage";
import { PublicPage } from "./Pages/PublicPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const App = () => {
  const [openModal, setOpenModal] = useState(null);
  const closeModal = () => setOpenModal(null);

  const openPublicModal = () => setOpenModal("public");
  const openPersonalModal = () => setOpenModal("personal");

  return (
    <div className="app">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="btns-container">
        <button
          type="button"
          onClick={openPublicModal}
          className={`base-btns-data ${openModal === "public" ? "active" : ""}`}
        >
          Публічні дані
        </button>
        <button
          type="button"
          onClick={openPersonalModal}
          className={`base-btns-data ${
            openModal === "personal" ? "active" : ""
          }`}
        >
          Персональні дані
        </button>
      </div>
      {openModal === "public" && <PublicPage onClose={closeModal} />}
      {openModal === "personal" && <PersonalPage onClose={closeModal} />}
    </div>
  );
};
