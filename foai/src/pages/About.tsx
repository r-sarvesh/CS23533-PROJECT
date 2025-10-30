import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Brain, Database, Zap, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl font-bold">About Our Project</h1>
              <p className="text-xl text-muted-foreground">
                An AI-powered solution for recognizing and solving handwritten
                mathematical equations
              </p>
            </div>
          </div>
        </section>

        {/* Purpose */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Our Purpose</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We believe that technology should make learning mathematics more
                  accessible and engaging. Our AI-powered math solver helps students
                  understand complex problems through step-by-step solutions.
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-2xl font-bold mb-8 text-center">
                  Technology Stack
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Brain className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">AI Recognition</h4>
                        <p className="text-sm text-muted-foreground">
                          CNN model (Keras/TensorFlow) for optical character
                          recognition of handwritten equations
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <Zap className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Math Engine</h4>
                        <p className="text-sm text-muted-foreground">
                          SymPy for symbolic computation and step-by-step solution
                          generation
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Database className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Backend</h4>
                        <p className="text-sm text-muted-foreground">
                          Lovable Cloud for authentication, database, storage, and
                          serverless functions
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 hover-lift">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary/10">
                        <Users className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Frontend</h4>
                        <p className="text-sm text-muted-foreground">
                          React + TypeScript + Tailwind CSS for a modern,
                          responsive interface
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Architecture */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  How It Works
                </h3>
                <Card className="p-8">
                  <ol className="space-y-4 text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">1.</span>
                      <span>
                        User uploads a handwritten equation image via drag-and-drop
                        or file picker
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">2.</span>
                      <span>
                        Image is uploaded to secure cloud storage and preprocessed
                        (grayscale, threshold)
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">3.</span>
                      <span>
                        CNN model recognizes individual symbols and reconstructs the
                        mathematical equation
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">4.</span>
                      <span>
                        Equation is converted to LaTeX format and passed to SymPy
                        for symbolic solving
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">5.</span>
                      <span>
                        Step-by-step solution is generated and displayed in
                        handwriting-style font
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-bold text-primary">6.</span>
                      <span>
                        Results are saved to database and can be downloaded as PDF
                        or copied
                      </span>
                    </li>
                  </ol>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contributors */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Built with AI</h2>
              <p className="text-lg text-muted-foreground">
                This project demonstrates the power of combining computer vision,
                symbolic computation, and modern web technologies to solve real-world
                educational challenges.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Handwritten Math Solver. Powered by AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;