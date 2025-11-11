// ==========================================
// FILE: src/components/forms/FileUpload.tsx (FIXED)
// ==========================================
"use client";

import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload } from "lucide-react";

interface FileUploadProps {
  name: string;
  control: any;
  setValue: any;
  value?: string; // <-- 1. ADD THIS PROP
  label: string;
  accept?: string; // e.g. ".pdf,.jpg,.png"
}

export default function FileUpload({
  name,
  control,
  setValue,
  value,
  label,
  accept = ".pdf,.jpg,.jpeg,.png",
}: FileUploadProps) {
  
  const onDrop = (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setValue(name, reader.result as string);
    reader.readAsDataURL(file);
  };

  // Map extensions → real MIME types
  // (Using the corrected logic from our previous fix)
  const mimeMap: Record<string, string[]> = {
    ".pdf": ["application/pdf"],
    ".jpg": ["image/jpeg"],
    ".jpeg": ["image/jpeg"],
    ".png": ["image/png"],
    ".csv": ["text/csv"],
    ".txt": ["text/plain"],
  };

  const acceptObj = accept.split(",").reduce((obj, ext) => {
    const key = ext.trim().toLowerCase();
    if (mimeMap[key]) {
      mimeMap[key].forEach(mimeType => {
        if (!obj[mimeType]) {
          obj[mimeType] = [];
        }
        obj[mimeType].push(key);
      });
    }
    return obj;
  }, {} as Record<string, string[]>);
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptObj,
    multiple: false,
  });

  // const value = control._formValues?.[name]; // <-- 3. REMOVE THIS ERROR LINE

  return (
    <div>
      {value ? ( // <-- 4. 'value' is now the prop
        <div className="border-2 border-dashed border-green-200 rounded-xl p-4 text-center">
          {value.startsWith("data:image") ? (
            <Image
              src={value}
              alt="upload"
              width={200}
              height={200}
              className="mx-auto rounded"
            />
          ) : (
            <div className="bg-gray-100 border-2 border-dashed rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-green-600">File uploaded</p>
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition"
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-700 font-medium">{label}</p>
          <p className="text-xs text-gray-500 mt-1">
            {accept.replace(/,/g, ", ")} (≤10 MB)
          </p>
        </div>
      )}
    </div>
  );
}