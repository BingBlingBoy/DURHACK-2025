import xgboost as xgb
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Custom transformer: multiply values by 3 to reduce their regularization effect
def weight_features(X):
    return X * 3

def createModel():
    df = pd.read_csv('Titanic-Dataset.csv')

    df = df.drop(['PassengerId','SibSp','Parch','Cabin','Ticket', 'Name'], axis=1)

    df['Age'] = df['Age'].fillna(df['Age'].median())
    df['Embarked'] = df['Embarked'].fillna(df['Embarked'].mode()[0])

    mapping = {'C': 0, 'Q': 1, 'S': 2}
    df['Embarked'] = df['Embarked'].map(mapping)
    df['Sex'] = LabelEncoder().fit_transform(df['Sex'])

    X = df.drop('Survived', axis=1)
    print(X.head())
    y = df['Survived']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=444)
    feature_weights = [4.0, 6.0, 10.0, 1.0, 0.1] 

    dtrain = xgb.DMatrix(X_train, label=y_train, feature_weights=feature_weights)
    dtest = xgb.DMatrix(X_test, label=y_test)

    params = {
        'objective': 'binary:logistic',
        'eval_metric': 'logloss',
        'max_depth': 4,
        'eta': 0.1
    }

    bst = xgb.train(params, dtrain, num_boost_round=100)

    return bst

def predictSurvival(bst, Pclass, Sex, Age, Fare, Embarked):
    # New Data Format Pclass, Sex, Age, Fare, Embarked
    new_data = pd.DataFrame({
        'Pclass': [Pclass],
        'Sex': [Sex],
        'Age': [Age],
        'Fare': [Fare],
        'Embarked': [Embarked]
    })

    dnew = xgb.DMatrix(new_data)
    new_pred_prob = bst.predict(dnew)
    new_pred = (new_pred_prob > 0.5).astype(int)
    return new_pred[0]
