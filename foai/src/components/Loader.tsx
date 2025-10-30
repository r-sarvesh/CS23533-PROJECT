import { Brain, Sparkles } from "lucide-react";

interface LoaderProps {
  message?: string;
}

const Loader = ({ message = "Analyzing your equation..." }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        <Brain className="h-16 w-16 text-primary animate-pulse" />
        <Sparkles className="h-6 w-6 text-secondary absolute -top-2 -right-2 animate-float" />
      </div>
      <div className="space-y-2 text-center">
        <p className="text-lg font-semibold">{message}</p>
        <div className="flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Loader;