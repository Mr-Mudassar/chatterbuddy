import React, { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/Components/ui/button";
import { uploadCsv } from "@/redux/features/admin/adminApi";

const UploadCsvForm = (onSuccess) => {
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (
      file &&
      (file.name.endsWith(".csv") ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".xlsx")) &&
      file.size <= 50 * 1024 * 1024
    ) {
      setSelectedFile(file);
    } else {
      console.error("Invalid file: must be CSV/XLS/XLSX and <= 50MB");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.name.endsWith(".csv") ||
        file.name.endsWith(".xls") ||
        file.name.endsWith(".xlsx")) &&
      file.size <= 50 * 1024 * 1024
    ) {
      setSelectedFile(file);
    } else {
      console.error("Invalid file: must be CSV/XLS/XLSX and <= 50MB");
      e.target.value = "";
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    const data = {
      apiEndpoint: `/company/${user?.company?.id}/users/upload`,
      requestData: formData,
    };

    dispatch(uploadCsv(data)).then((res) => {
      if (res?.type === "uploadCsv/fulfilled") {
        onSuccess();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-primary rounded-lg p-8 text-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-primary mb-4" />
        <p className="text-gray-600 mb-2">
          Browse your document or drag and drop here
        </p>
        <p className="text-sm text-gray-500 mb-4">Supported types: XLS CSV</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xls,.xlsx"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="mb-4 rounded-full border border-primary"
        >
          Browse
        </Button>
        {selectedFile && (
          <p className="text-sm text-gray-600 mt-2">
            Selected: {selectedFile.name}
          </p>
        )}
        <div className="mt-4">
          <p className="text-xs text-gray-500">Max file: 50MB</p>
        </div>
      </div>
      <Button
        className="w-full text-white rounded-full h-12"
        onClick={handleUpload}
        disabled={!selectedFile}
      >
        Add Users
      </Button>
    </div>
  );
};

export default UploadCsvForm;
