# Handwritten Math Solver using AI

## Overview
The Handwritten Math Solver using AI is an intelligent deep learning system that can recognize, interpret, and solve handwritten mathematical expressions.  
It combines Optical Character Recognition (OCR) with Deep Learning (CNN + Transformer) and symbolic computation (SymPy) to generate step-by-step mathematical solutions.

This project bridges the gap between handwritten mathematical work and automated AI-driven problem solving, supporting students, teachers, and researchers in education and STEM learning.

---

## System Architecture

Workflow:
1. Input Image – Upload a handwritten equation.
2. Image Preprocessing – Noise removal, binarization, normalization.
3. Feature Extraction (CNN Encoder) – Extract visual features from handwriting.
4. Sequence Modeling (Transformer Decoder) – Convert features into LaTeX representation.
5. Equation Parsing – Convert LaTeX to symbolic math form.
6. Symbolic Solver (SymPy Engine) – Compute and provide step-by-step solution.
7. Output Renderer – Display results in handwriting-style font.

Refer to the “System_Architecture.png” diagram in the repository for visualization.

---

## Technologies Used

| Category | Tools / Frameworks |
|-----------|--------------------|
| Programming Language | Python 3.10 |
| Deep Learning | PyTorch / TensorFlow |
| Image Processing | OpenCV, NumPy |
| Symbolic Computation | SymPy |
| Data Handling | Pandas, Scikit-learn |
| Web Interface (optional) | Flask / Streamlit |
| Dataset | CROHME 2019, HW-SYNTH |
