from flask import Flask, request, jsonify
from login import external_login, sso_login
import dtlpy as dl
from get_dataloop_data import get_datasets, get_projects

app = Flask(__name__)

def check_login_condition():
    if dl.token_expired():
        return True

@app.route('/check-login', methods=['GET'])
def check_login():
    if check_login_condition():
        return jsonify({'login_required': True})
    else:
        return jsonify({'login_required': False})

@app.route('/login', methods=['POST'])
def login_route():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if external_login(username, password):
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/sso-login', methods=['POST'])
def sso_login_route():
    if sso_login():
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'SSO login failed'}), 401

@app.route('/download', methods=['POST'])
def download():
    # Lógica de download
    pass

@app.route('/projects', methods=['GET'])
def dropdown_options():
    projects = get_projects()
    print(f"Projects: {projects}")  # Log para depuração
    return jsonify({'projects': projects})

@app.route('/datasets', methods=['GET'])
def datasets():
    project = request.args.get('project')
    datasets = get_datasets(project)
    return jsonify({'datasets': datasets})

@app.route('/upload', methods=['POST'])
def upload():
    # Lógica de upload
    pass

if __name__ == '__main__':
    app.run(debug=True, port=5421)
