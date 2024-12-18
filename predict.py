import joblib
import numpy as np
import json
import sys

def predict_price(input_data):
    try:
        # Carregar modelo e scaler
        model = joblib.load('./models/house_price_model.joblib')
        scaler = joblib.load('./models/scaler.joblib')
        
        # Converter input para array
        features = np.array([
            float(input_data['area']),
            float(input_data['bedrooms']),
            float(input_data['bathrooms']),
            float(input_data['stories']),
            float(input_data['mainroad']),
            float(input_data['guestroom']),
            float(input_data['basement']),
            float(input_data['hotwaterheating']),
            float(input_data['airconditioning']),
            float(input_data['parking']),
            float(input_data['prefarea']),
            float(input_data['furnishingstatus'])
        ]).reshape(1, -1)
        
        # Normalizar dados
        features_scaled = scaler.transform(features)
        
        # Fazer previsão e arredondar
        prediction = model.predict(features_scaled)
        rounded_price = round(prediction[0])
        
        # Formatar com $ e vírgulas
        formatted_price = "${:,}".format(rounded_price)
        
        return {
            "predicted_price": formatted_price
        }
        
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    # Ler input do stdin
    input_data = json.loads(sys.argv[1])
    result = predict_price(input_data)
    print(json.dumps(result))