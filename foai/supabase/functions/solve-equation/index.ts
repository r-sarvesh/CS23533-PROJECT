import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { problemId, imageUrl } = await req.json();

    if (!problemId || !imageUrl) {
      throw new Error("Missing problemId or imageUrl");
    }

    console.log(`Processing problem ${problemId} with image ${imageUrl}`);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the LOVABLE_API_KEY
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Step 1: Use AI to recognize the equation from the image
    console.log("Step 1: Recognizing equation with AI...");
    
    const recognitionResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert at recognizing handwritten mathematical equations. Analyze the image and extract the mathematical equation. Return ONLY the equation in plain text format, using standard mathematical notation (e.g., x^2 + 5x + 6 = 0).",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please recognize this handwritten mathematical equation and return it in plain text format.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!recognitionResponse.ok) {
      const errorText = await recognitionResponse.text();
      console.error("AI recognition error:", recognitionResponse.status, errorText);
      throw new Error(`AI recognition failed: ${recognitionResponse.status}`);
    }

    const recognitionData = await recognitionResponse.json();
    const recognizedEquation = recognitionData.choices?.[0]?.message?.content?.trim() || "";
    
    if (!recognizedEquation) {
      throw new Error("Failed to recognize equation from image");
    }

    console.log("Recognized equation:", recognizedEquation);

    // Step 2: Solve the equation using AI
    console.log("Step 2: Solving equation with AI...");
    
    const solvingResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a mathematical solver. Given an equation, provide:
1. The equation in LaTeX format
2. Step-by-step solution as a JSON object with numbered steps
3. The final answer

Format your response as JSON with these exact keys:
{
  "latex": "LaTeX format of equation",
  "steps": {
    "1": "First step explanation",
    "2": "Second step explanation",
    ...
  },
  "answer": "Final answer"
}`,
          },
          {
            role: "user",
            content: `Solve this equation: ${recognizedEquation}`,
          },
        ],
      }),
    });

    if (!solvingResponse.ok) {
      const errorText = await solvingResponse.text();
      console.error("AI solving error:", solvingResponse.status, errorText);
      throw new Error(`AI solving failed: ${solvingResponse.status}`);
    }

    const solvingData = await solvingResponse.json();
    const solutionText = solvingData.choices?.[0]?.message?.content?.trim() || "";
    
    // Parse the JSON response
    let solution;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = solutionText.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      const jsonText = jsonMatch ? jsonMatch[1] : solutionText;
      solution = JSON.parse(jsonText);
    } catch (e) {
      console.error("Failed to parse solution JSON:", e);
      // Fallback if JSON parsing fails
      solution = {
        latex: recognizedEquation,
        steps: { "1": solutionText },
        answer: "See steps for solution",
      };
    }

    console.log("Solution:", solution);

    // Step 3: Update the database with the solution
    const { error: updateError } = await supabase
      .from("problems")
      .update({
        recognized_eq: recognizedEquation,
        latex_form: solution.latex || recognizedEquation,
        steps: solution.steps || {},
        final_answer: solution.answer || "Solution completed",
        status: "solved",
      })
      .eq("id", problemId);

    if (updateError) {
      throw updateError;
    }

    console.log(`Problem ${problemId} solved successfully`);

    return new Response(
      JSON.stringify({
        success: true,
        recognizedEquation,
        solution,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in solve-equation:", error);

    // Try to update the problem status to error
    if (error.problemId) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        await supabase
          .from("problems")
          .update({
            status: "error",
            error_message: error.message || "Unknown error occurred",
          })
          .eq("id", error.problemId);
      } catch (updateError) {
        console.error("Failed to update error status:", updateError);
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An unknown error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});