import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SolutionDisplayProps {
  recognizedEq: string;
  latexForm?: string;
  steps?: any;
  finalAnswer: string;
}

const SolutionDisplay = ({
  recognizedEq,
  latexForm,
  steps,
  finalAnswer,
}: SolutionDisplayProps) => {
  const [handwrittenView, setHandwrittenView] = useState(true);

  const handleCopy = () => {
    const text = `Equation: ${recognizedEq}\n\nSteps:\n${JSON.stringify(steps, null, 2)}\n\nFinal Answer: ${finalAnswer}`;
    navigator.clipboard.writeText(text);
    toast.success("Solution copied to clipboard!");
  };

  const handleDownload = () => {
    const text = `Handwritten Math Solution\n\nEquation: ${recognizedEq}\n\nSteps:\n${JSON.stringify(steps, null, 2)}\n\nFinal Answer: ${finalAnswer}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "math-solution.txt";
    a.click();
    toast.success("Solution downloaded!");
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Solution</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setHandwrittenView(!handwrittenView)}
          >
            {handwrittenView ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Typed View
              </>
            ) : (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Handwritten View
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Recognized Equation */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">
          Recognized Equation
        </h3>
        <p
          className={`text-3xl ${
            handwrittenView ? "font-handwritten" : "font-mono"
          }`}
        >
          {recognizedEq}
        </p>
        {latexForm && (
          <p className="text-sm text-muted-foreground mt-2">LaTeX: {latexForm.replace(/\$/g, '')}</p>
        )}
      </Card>

      {/* Steps */}
      {steps && (
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">
            Step-by-Step Solution
          </h3>
          <div
            className={`space-y-4 ${
              handwrittenView ? "font-handwritten text-xl" : ""
            }`}
          >
            {typeof steps === "object" ? (
              Object.entries(steps).map(([key, value], index) => (
                <div key={index} className="pb-4 border-b border-border last:border-0">
                  <p className="text-muted-foreground text-sm mb-2">
                    Step {index + 1}
                  </p>
                  <p>{String(value).replace(/#/g, '')}</p>
                </div>
              ))
            ) : (
              <p>{String(steps)}</p>
            )}
          </div>
        </Card>
      )}

      {/* Final Answer - Enhanced for Student Understanding */}
      <Card className="p-8 bg-gradient-primary text-primary-foreground border-2 border-primary shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-xl font-bold">Final Answer</h3>
        </div>
        <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
          <p
            className={`text-5xl font-bold text-center text-white ${
              handwrittenView ? "font-handwritten" : ""
            }`}
          >
            {finalAnswer}
          </p>
        </div>
        <p className="text-sm mt-4 opacity-90 text-center">
          This is the solution to your equation. Review the steps above to understand how we got here.
        </p>
      </Card>
    </div>
  );
};

export default SolutionDisplay;