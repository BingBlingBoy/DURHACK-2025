from flask import Flask, request

from TitanicDemos import createModel, predictSurvival

app = Flask(__name__)


@app.route("/api/health")
def health():
    return {
        "alive": True,
    }


@app.route("/api/predict", methods=["POST"])
def predict():
    pclass = request.args.get("Pclass", int)
    sex = request.args.get("Sex", int)
    age = request.args.get("Age", int)
    fare = request.args.get("Fare", int)
    embarked = request.args.get("Embarked", int)

    model = createModel()
    res = predictSurvival(model, pclass, sex, age, fare, embarked)

    return res.to_json()


if __name__ == "__main__":
    app.run()
