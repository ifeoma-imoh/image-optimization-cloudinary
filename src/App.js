import "./App.css";
import { UploadOutlined } from "@ant-design/icons";
import { message, Menu } from "antd";
import ImageGrid from "./components/ImageGrid";
import ImageUpload from "./components/ImageUpload";
import { useEffect, useState } from "react";
import { getImages } from "./util/api";

const items = [
  {
    label: "Upload Image",
    key: "upload",
    icon: <UploadOutlined />,
  },
];

const App = () => {
  const [images, setImages] = useState([]);
  const [showImageUpload, setShowImageUpload] = useState(true);

  useEffect(() => {
    getImages({
      successCallback: (response) => {
        setImages(response);
        setShowImageUpload(response.length === 0);
      },
    });
  }, []);

  const onCompletion = (response) => {
    setImages(response);
    message.success("Images uploaded successfully");
    setShowImageUpload(false);
  };

  return (
    <div style={{ margin: "1%" }}>
      <div
        className="overlay"
        style={{
          display: `${showImageUpload ? "block" : "none"}`,
        }}
      >
        <ImageUpload onCompletion={onCompletion} />
      </div>
      <Menu
        onClick={() => {
          setShowImageUpload(true);
        }}
        mode="horizontal"
        items={items}
        style={{ marginBottom: "10px" }}
      />
      <ImageGrid images={images} />
    </div>
  );
};

export default App;
