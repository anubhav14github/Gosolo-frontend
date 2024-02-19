import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";


export function Madal(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    p: 4,
  };
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className=" w-1/2  max-w-md p-4 ml-20 bg-white border  rounded-lg shadow-2xl sm:p-8">
        {/* <Button onClick={handleOpen}>HANUMAN BHAGWAN</Button> */}
        <Modal
          open={props.show}
          cancel={props.close}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} classname="shadow-2xl rounded-lg" >
            <div>
              <div>
                <h1 className="flex justify-center mt-4 mb-4 text-4xl leading-8 text-gray-700 py-6">
                  Message
                </h1>
              </div>
              <div className="flex justify-center text-xl my-4 leading-6 text-gray-700">
                {props.message}
              </div>
              <div className="flex justify-center my-8 text-base font-semibold text-gray-900 p-2 dark:text-white">
                <button onClick={props.close}
                  className="mr-2 my-1 uppercase tracking-wider p-4 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-base font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                  close
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Madal;