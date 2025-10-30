
```markdown
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

---

## Project Structure

```

Handwritten-Math-Solver/
│
├── data/
│   ├── raw/                # Original handwritten datasets
│   ├── processed/          # Preprocessed training data
│
├── models/
│   ├── cnn_encoder.py      # CNN feature extraction model
│   ├── transformer_decoder.py  # Transformer sequence model
│   ├── math_solver.py      # SymPy integration and equation solving
│
├── utils/
│   ├── preprocess.py       # Image preprocessing functions
│   ├── latex_parser.py     # Converts LaTeX to SymPy expressions
│
├── app/
│   ├── main.py             # Streamlit/Flask app entry point
│   ├── templates/          # Frontend HTML/CSS
│
├── results/
│   ├── sample_outputs/     # Example predictions and solutions
│   └── metrics.json        # Model evaluation results
│
├── architecture_diagram.png
├── requirements.txt
├── README.md
└── LICENSE

````

---

## Installation and Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/<your-username>/Handwritten-Math-Solver-AI.git
cd Handwritten-Math-Solver-AI
````

### Step 2: Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # (Linux/macOS)
venv\Scripts\activate     # (Windows)
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Run the Application

```bash
python app/main.py
```

---

## Features

* Recognizes handwritten math equations
* Converts handwriting into LaTeX
* Solves equations step-by-step using SymPy
* Displays results in handwriting-style output
* Fast and accurate recognition using CNN + Transformer
* Optional Web UI for real-time interaction

---

## Model Performance

| Metric               | Value             |
| -------------------- | ----------------- |
| Symbol Accuracy      | 92.4%             |
| Expression Accuracy  | 88.7%             |
| Solving Accuracy     | 95.1%             |
| Avg. Processing Time | 1.2s per equation |

---

## Applications

* Educational Tools – AI tutors and learning assistants
* E-Learning Platforms – Integration into math-learning apps
* Accessibility Tools – Helping visually or physically challenged learners
* STEM Research Automation – Quick interpretation of handwritten notes

---

## Future Improvements

* Add multilingual handwriting support
* Integrate speech-based problem input
* Deploy using FastAPI backend and Streamlit UI
* Add real-time feedback and error correction
* Optimize Transformer models for mobile devices

---

## Contributors

| Name               | Role                      | ID           |
| ------------------ | ------------------------- | ------------ |
| Sarvesh R          | Developer / Research Lead | 230701294    |
| Siddarth Sakthi M  | ML Engineer               | 230701314    |
| Mrs. Jeyalakshmi M | Project Supervisor        | Dept. of CSE |

---

## References

1. Mouchère, H., Zanibbi, R., Garain, U., Viard-Gaudin, C., & Kim, J. (2016). Advances in the competition on recognition of online handwritten mathematical expressions (CROHME).
2. Vaswani, A. et al. (2017). Attention is All You Need.
3. Meurer, A. et al. (2017). SymPy: symbolic computing in Python.
4. Zhang, X. et al. (2018). Watch, Attend and Parse: End-to-End Neural Model for Handwritten Mathematical Expression Recognition.

---

## License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

---

## Acknowledgment

This project was developed under the guidance of Mrs. Jeyalakshmi M,
Department of Computer Science and Engineering,
as part of the academic coursework on Artificial Intelligence Applications.

---

"Turning handwritten thoughts into digital intelligence."

```

```
