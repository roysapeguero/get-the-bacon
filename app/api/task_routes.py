from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import User, Task, db
from app.forms import TaskForm
import datetime

task_routes = Blueprint('tasks', __name__)

# Get all tasks
@task_routes.route('/')
# @login_required
def get_all_tasks():
    """
    Query for all tasks and returns them in a list of task dictionaries
    """
    tasks = Task.query.all()
    return [task.to_dict() for task in tasks]

# Get task by id
@task_routes.route('/<int:id>')
@login_required
def get_task(id):
    """
    Query for one tasks and returns in task a dictionary
    """
    task = Task.query.get(id)

    if not task:
        return {"errors": "Task not found"}

    return task.to_dict()


# Create task
@task_routes.route('/', methods=['POST'])
# @login_required
def create_task():
    """
    Creates a task
    """
    print('im herre ----------------------------')
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('i made it ----------------------------', task)

    if form.validate_on_submit():
        print('herro--------------------sub')
        task = Task(
        user_id = current_user.id,
        list_id = form.data['list_id'],
        name = form.data['name'],
        notes = form.data['notes'],
        due = form.data['due'],
        status = 'Not Started',
        created_at = datetime.datetime.now(),
        updated_at = datetime.datetime.now()
        )
        print('hello', task)

        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    if form.errors:
        return form.errors

# Edit task by id
@task_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_task(id):
    """
    Query for one task and returns in task a dictionary
    """

    form = TaskForm()
    task = Task.query.get(id)

    if current_user.id == task.user_id:
        # task.user_id = current_user.id
        # task.list_id = form.data['list_id']
        task.name = form.data['name']
        task.notes = form.data['notes']
        task.due = form.data['due']
        task.status = 'Not Started'
        task.updated_at = datetime.datetime.now()
        # task.created_at = task.created_at

        db.session.add(task)
        db.session.commit()
        return task.to_dict()
    else:
        return {"Error": "Could not edit task"}


# Delete a task by task id
@task_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        return {"Error": "Task not found"}

    db.session.delete(task)
    db.session.commit()
    return{"message": "Delete successful"}
