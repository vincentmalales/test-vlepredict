import numpy as np
import pandas as pd
import pickle
from flask import Flask, render_template, request, session, jsonify
from sklearn.compose import make_column_transformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

app = Flask(__name__)
app.secret_key = 'my_secret_key_123'

# Load the pickled model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

num = StandardScaler()
cat = OneHotEncoder()

preprocessor = make_column_transformer(
    (num, ['Credits', 'Engagement']),  # Replace with actual numerical column names
    (cat, ['Gender', 'Education', 'Deprivation', 'Disability', 'Age'])
)

@app.route('/')
def index():
    return render_template('index.html')

# Route to handle file upload and data processing
@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']  # Get the uploaded file
    data = process_csv(file)  # Process the CSV file

    # Store the data in session or database for later use
    session['table_data'] = data

    return jsonify({'status': 'success'})

# Route to perform prediction using the uploaded data
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Retrieve the uploaded data from session or database
    table_data = data['tableData']

    # Perform prediction logic using the table_data
    predicted_data = []
    for row in table_data:
        credits = row['credits']
        engagement = row['engagement']
        gender = row['gender']
        education = row['education']
        deprivation = row['deprivation']
        disability = row['disability']
        age = row['age']

        input_data = np.array([[credits, engagement, gender, education, deprivation, disability, age]])

        # Convert the NumPy array to a DataFrame
        input_df = pd.DataFrame(input_data, columns=['Credits', 'Engagement', 'Gender', 'Education', 'Deprivation', 'Disability', 'Age'])

        # Use the loaded model to make predictions
        predictions = model.predict(input_df)
        result = {
            'intervention': predictions.tolist()[0],
        }
        predicted_data.append(result)
        print("Predictions:", predictions)

    # Return the updated table_data as a JSON response
    response = {'tableData': predicted_data}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
