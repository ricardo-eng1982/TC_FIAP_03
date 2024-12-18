import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib
import numpy as np

def train_model():
    # Carregar dados
    df = pd.read_csv('./data/housing.csv')
    
    # Convertendo variáveis categóricas para numéricas
    categorical_columns = ['mainroad', 'guestroom', 'basement', 'hotwaterheating', 
                         'airconditioning', 'prefarea', 'furnishingstatus']
    
    for col in categorical_columns:
        df[col] = pd.Categorical(df[col]).codes
    
    # Separar features e target
    X = df.drop('price', axis=1)
    y = df['price']
    
    # Dividir dados em treino e teste
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Normalizar dados
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Treinar modelo
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Avaliar modelo
    train_score = model.score(X_train_scaled, y_train)
    test_score = model.score(X_test_scaled, y_test)
    
    print(f'R² Score (Train): {train_score:.4f}')
    print(f'R² Score (Test): {test_score:.4f}')
    
    # Importância das features
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print('\nFeature Importance:')
    print(feature_importance)
    
    # Salvar modelo e scaler
    joblib.dump(model, 'models/house_price_model.joblib')
    joblib.dump(scaler, 'models/scaler.joblib')

if __name__ == "__main__":
    # Criar pasta models se não existir
    import os
    if not os.path.exists('models'):
        os.makedirs('models')
    
    train_model()