import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemove: () => void;
}

const FileUploader = ({ onFileSelect, selectedFile, onRemove }: FileUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileSelect(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
  });

  const handleRemove = () => {
    setPreview(null);
    onRemove();
  };

  if (selectedFile && preview) {
    return (
      <Card className="p-6 relative">
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-4 right-4 z-10"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="space-y-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-96 object-contain rounded-lg border border-border"
          />
          <p className="text-sm text-muted-foreground text-center">
            {selectedFile.name}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      {...getRootProps()}
      className={`p-12 border-2 border-dashed transition-colors cursor-pointer hover:border-primary ${
        isDragActive ? "border-primary bg-primary/5" : "border-border"
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="p-4 rounded-full bg-primary/10">
          {isDragActive ? (
            <Upload className="h-8 w-8 text-primary animate-bounce" />
          ) : (
            <ImageIcon className="h-8 w-8 text-primary" />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold">
            {isDragActive ? "Drop your image here" : "Upload handwritten equation"}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag and drop or click to browse
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: PNG, JPG, JPEG, GIF, WEBP
          </p>
        </div>
      </div>
    </Card>
  );
};

export default FileUploader;