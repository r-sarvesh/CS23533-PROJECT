import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import SolutionDisplay from "@/components/SolutionDisplay";
import Loader from "@/components/Loader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Result = () => {
  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProblem();
    }
  }, [id]);

  const fetchProblem = async () => {
    try {
      const { data, error } = await supabase
        .from("problems")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setProblem(data);
      
      // If still processing, poll for updates
      if (data.status === "processing") {
        setTimeout(fetchProblem, 2000);
      }
    } catch (error: any) {
      console.error("Error fetching problem:", error);
      toast.error("Failed to load solution");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !problem) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader />
        </main>
      </div>
    );
  }

  if (problem.status === "processing") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader message="Still processing your equation..." />
        </main>
      </div>
    );
  }

  if (problem.status === "error") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl font-bold text-destructive">Error Processing Equation</h1>
            <p className="text-muted-foreground">{problem.error_message}</p>
            <Link to="/upload">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Link to="/upload">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Upload Another
              </Button>
            </Link>
          </div>

          <SolutionDisplay
            recognizedEq={problem.recognized_eq || "No equation recognized"}
            latexForm={problem.latex_form}
            steps={problem.steps}
            finalAnswer={problem.final_answer || "No solution found"}
          />
        </div>
      </main>
    </div>
  );
};

export default Result;