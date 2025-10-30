import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import FileUploader from "@/components/FileUploader";
import Loader from "@/components/Loader";
import { supabase } from "@/integrations/supabase/client";
import { Send } from "lucide-react";

const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSolve = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setIsProcessing(true);

    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to use this feature");
        navigate("/auth");
        setIsProcessing(false);
        return;
      }

      // Upload image to storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("math-uploads")
        .upload(fileName, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("math-uploads")
        .getPublicUrl(fileName);

      // Create problem record
      const { data: problemData, error: insertError } = await supabase
        .from("problems")
        .insert({
          user_id: user.id,
          image_url: publicUrl,
          status: "processing",
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // Call edge function to process
      const { data: solveData, error: solveError } = await supabase.functions.invoke(
        "solve-equation",
        {
          body: { problemId: problemData.id, imageUrl: publicUrl },
        }
      );

      if (solveError) {
        throw solveError;
      }

      toast.success("Equation solved successfully!");
      navigate(`/result/${problemData.id}`);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to process equation");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Upload Your Equation</h1>
            <p className="text-muted-foreground">
              Take a photo of your handwritten math problem and let AI solve it
            </p>
          </div>

          {isProcessing ? (
            <Loader message="🧠 Analyzing your equation..." />
          ) : (
            <>
              <FileUploader
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemove={handleRemoveFile}
              />

              {selectedFile && (
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={handleSolve}
                    className="gap-2 px-8 gradient-accent"
                  >
                    <Send className="h-5 w-5" />
                    Solve Equation
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Upload;