import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, Brain, Zap, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero flex-1 flex items-center">
        <div className="container py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="p-4 rounded-2xl bg-primary/10 inline-block mb-6">
                <Brain className="h-12 w-12 text-primary animate-float" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Solve <span className="text-primary">Handwritten</span> Math
              <br />
              with AI Power
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your handwritten equations and get instant AI-powered solutions
              with step-by-step explanations. Math homework has never been easier.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/upload">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 gradient-accent">
                  <Upload className="h-5 w-5" />
                  Start Solving
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Solver?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI and designed for students, teachers, and math
              enthusiasts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-card border border-border hover-lift">
              <div className="p-3 rounded-lg bg-primary/10 inline-block mb-4">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Recognition</h3>
              <p className="text-muted-foreground">
                Advanced CNN model recognizes handwritten equations with high accuracy
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover-lift">
              <div className="p-3 rounded-lg bg-secondary/10 inline-block mb-4">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Solutions</h3>
              <p className="text-muted-foreground">
                Get step-by-step solutions in seconds with symbolic computation
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover-lift">
              <div className="p-3 rounded-lg bg-primary/10 inline-block mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is encrypted and stored securely in the cloud
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 p-12 rounded-2xl bg-gradient-primary text-primary-foreground">
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg opacity-90">
              Upload your first handwritten equation and experience the power of AI
            </p>
            <Link to="/upload">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-lg px-8 py-6"
              >
                <Upload className="h-5 w-5" />
                Upload Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

export default Index;