from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import io
import base64

from TitanicDemos import createModel, predictSurvival

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_graphs(config):
    print(config["graphicsConfig"])
    config = config["graphicsConfig"]
    if "graphs" not in config or not isinstance(config["graphs"], list):
        raise ValueError("Input must contain a 'graphs' list.")
    
    image_results = []

    for i, graph in enumerate(config["graphs"], start=1):
        gtype = graph.get("type", "").lower()
        desc = graph.get("description", f"Graph {i}")
        axis = graph.get("axis", {})
        data_points = graph.get("data_points", [])

        if not data_points:
            raise ValueError(f"Graph {i} has no data_points.")

        # Convert data_points → DataFrame
        df = pd.DataFrame(data_points)

        # Rename x/y columns if provided in axis
        if "x" in axis:
            df.rename(columns={"x": axis["x"]}, inplace=True)
        if "y" in axis:
            df.rename(columns={"y": axis["y"]}, inplace=True)

        # Map simple type to seaborn function
        seaborn_func_name = gtype
        if not hasattr(sns, seaborn_func_name):
            raise ValueError(f"Unsupported graph type: {gtype}")

        plot_func = getattr(sns, seaborn_func_name)

        # Plot setup
        plt.figure(figsize=(7, 5))

        # Prepare plotting args (some plots don't use y)
        plot_kwargs = {"data": df}
        if "x" in axis:
            plot_kwargs["x"] = axis["x"]
        if "y" in axis:
            plot_kwargs["y"] = axis["y"]

        # Make the plot
        plot_func(**plot_kwargs)
        plt.title(desc)
        plt.xlabel(axis.get("x", ""))
        plt.ylabel(axis.get("y", ""))
        plt.tight_layout()

        # --- Export the current Seaborn/Matplotlib figure as Base64 PNG ---
        fig = plt.gcf()  # Get current figure object

        # Save figure to an in-memory bytes buffer
        buf = io.BytesIO()
        fig.savefig(buf, format="png", bbox_inches="tight")
        buf.seek(0)

        # Convert bytes to Base64-encoded string
        img_bytes = buf.read()
        img_b64 = base64.b64encode(img_bytes).decode("utf-8")

        # Clean up figure and buffer
        plt.close(fig)
        buf.close()

        # Append to results list in a JSON-safe format
        image_results.append({
            "description": str(desc),
            "type": str(gtype),
            "image_base64": img_b64
        })

    return image_results


@app.route("/api/health")
def health():
    return {
        "alive": True,
    }


@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        logger.info(f"Received prediction request: {data}")

        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        # Validate required fields
        required_fields = ["Pclass", "Sex", "Age", "Fare", "Embarked"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Convert to proper types
        pclass = int(data.get("Pclass"))
        sex = int(data.get("Sex"))
        age = float(data.get("Age"))
        fare = float(data.get("Fare"))
        embarked = int(data.get("Embarked"))

        logger.info(
            f"Parsed values - Pclass: {pclass}, Sex: {sex}, Age: {age}, Fare: {fare}, Embarked: {embarked}"
        )

        model = createModel()
        res = predictSurvival(model, pclass, sex, age, fare, embarked)

        result = {"prediction": int(res), "survived": bool(res)}
        logger.info(f"Prediction result: {result}")

        return jsonify(result)
    except ValueError as e:
        logger.error(f"ValueError: {str(e)}")
        return jsonify({"error": f"Invalid data type: {str(e)}"}), 400
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}", exc_info=True)
        return jsonify({"error": "Prediction failed", "message": str(e)}), 500

@app.route("/generate_graphs", methods=["POST"])
def generate_graphs_api():
    try:
        config = request.get_json()
        result = generate_graphs(config)
        # Ensure everything in result is JSON-serializable
        safe_graphs = []
        for g in result:
            safe_graphs.append({
                "description": str(g.get("description", "")),
                "type": str(g.get("type", "")),
                "image_base64": str(g.get("image_base64", ""))
            })

        response = {
            "status": "success",
            "graph_count": len(safe_graphs),
            "graphs": safe_graphs
        }

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == "__main__":
    app.run()
