import { useEffect, useState } from "react";
// import { compressToUTF16, decompressFromUTF16 } from "lz-string";
import Toast from "../../utils/ToastAlert";
import { fileAtom } from "../../store/store";
import { useRecoilState } from "recoil";
import { Bars } from "react-loader-spinner";
import { Fade } from "react-reveal";
import ClickOutside from "react-click-outside";
import socket from "../../socket/socket";
import axios from "axios";

function UpdateImg({ id, type }) {
  // const [file, setFile] = useRecoilState(fileAtom);
  const [file, setFile] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [preview, setPreview] = useState("");

  const savePhoto = () => {
    setShowUploader(false);
    console.log(file);

    socket.emit("savePhoto", { type, file }, id, (res) => {
      console.log(res, "============");

      if (res.status) {
        console.log(res);
        Toast({
          type: "success",
          icon: "success",
          title: "Image Uploaded",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    });
  };

  const getImg = (file) => {
    setShowLoader(true);
    setFile(file);
    const size = Math.round(file.size / 1024);

    if (size >= 1000) {
      setShowLoader(false);
      Toast({
        type: "error",
        icon: "error",
        title: "Image too big",
      });
    } else {
      readURL(file);
    }

    function readURL() {
      if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          setPreview((prev) => e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const clearImg = () => {
    setFile("");
  };

  useEffect(() => {
    if (file) {
      setShowLoader(false);
    }
    console.log(file);
  }, [file]);

  return (
    <>
      {showUploader && (
        <div className="uploaderContainer">
          <div className="h-100 position-relative w-100">
            <ClickOutside
              onClickOutside={() => {
                setShowUploader(false);
              }}
            >
              <div id="file-upload-form" className="uploader">
                <input
                  id="file-upload"
                  onChange={(e) => {
                    getImg(e.target.files[0]);
                  }}
                  type="file"
                  name="fileUpload"
                  accept="image/*"
                />

                {file && (
                  <i
                    className="fa fa-xmark mb-2 clearImg"
                    onClick={clearImg}
                    aria-hidden="true"
                  ></i>
                )}

                <label htmlFor="file-upload" id="file-drag">
                  {file && (
                    <div className="demoImg">
                      <img
                        id="file-image"
                        src={preview}
                        alt="Preview"
                        className=""
                      />
                    </div>
                  )}

                  <div id="start" className="text-center">
                    {!showLoader && !file && (
                      <>
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div>Select a Image</div>
                        {/* <span id="file-upload-btn" className="btn btn-primary">Select a file</span>*/}
                      </>
                    )}

                    {showLoader && (
                      <div className="fileLoadingAnm">
                        <Bars color="#9CA3AF" height={80} width={80} />
                      </div>
                    )}
                  </div>
                </label>
                {file && (
                  <span
                    id="file-upload-btn"
                    onClick={savePhoto}
                    className="btn btn-primary"
                  >
                    Save
                  </span>
                )}
              </div>
            </ClickOutside>
          </div>
        </div>
      )}

      <i
        className="fa-solid fa-camera"
        onClick={() => {
          setShowUploader(true);
        }}
      ></i>
    </>
  );
}

export default UpdateImg;
