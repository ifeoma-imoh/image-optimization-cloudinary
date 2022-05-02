import { Upload, Button, Card, Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { uploadFiles } from "../util/api";

const ImageUpload = ({ onCompletion }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setShowSubmitButton(selectedFiles.length > 0);
  }, [selectedFiles]);

  const addFile = (file) => {
    setSelectedFiles((currentSelection) => [...currentSelection, file]);
  };

  const removeFile = (file) => {
    setSelectedFiles((currentSelection) => {
      const newSelection = currentSelection.slice();
      const fileIndex = currentSelection.indexOf(file);
      newSelection.splice(fileIndex, 1);
      return newSelection;
    });
  };

  const beforeUpload = (file) => {
    addFile(file);
    return false;
  };

  const successCallback = (response) => {
    setIsUploading(false);
    onCompletion(response);
  };

  const handleSubmit = () => {
    setIsUploading(true);
    uploadFiles({ selectedFiles, successCallback });
  };

  return (
    <Card
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Upload
        onRemove={removeFile}
        addFile={addFile}
        beforeUpload={beforeUpload}
        fileList={selectedFiles}
        multiple={true}
        accept="image/*"
      >
        {!showSubmitButton && <Button>Select files</Button>}
      </Upload>
      {showSubmitButton && (
        <Row>
          <Col offset={9} span={6}>
            <Button
              icon={<UploadOutlined />}
              type="primary"
              onClick={handleSubmit}
              loading={isUploading}
            >
              Upload
            </Button>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default ImageUpload;
