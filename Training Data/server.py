from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

from TitanicDemos import createModel, predictSurvival

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


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


if __name__ == "__main__":
    app.run()
