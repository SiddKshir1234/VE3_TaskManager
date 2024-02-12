# app.py

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Task model
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {'id': self.id, 'title': self.title, 'description': self.description}


# Routes

# Get all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    with app.app_context():
        tasks = Task.query.all()
        tasks_list = [task.to_dict() for task in tasks]
    return jsonify(tasks_list)

# Get a specific task
@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    with app.app_context():
        task = Task.query.get_or_404(task_id)
    return jsonify(task.to_dict())

# Create a new task       
@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    new_task = Task(title=data['title'], description=data.get('description'))
    with app.app_context():
        db.session.add(new_task)
        db.session.commit()
    return jsonify({'message': 'Task created successfully'})

# Update a task
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    with app.app_context():
        task = Task.query.get_or_404(task_id)
        task.title = data['title']
        task.description = data.get('description')
        db.session.commit()
    return jsonify({'message': 'Task updated successfully'})

# Delete a task
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    with app.app_context():
        task = Task.query.get_or_404(task_id)
        db.session.delete(task)
        db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create the database tables
    app.run(debug=True)
