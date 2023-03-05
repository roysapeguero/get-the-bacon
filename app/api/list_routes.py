from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import User, List, Task, db
from app.forms import ListForm
import datetime

list_routes = Blueprint('lists', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

# Get all lists
@list_routes.route('')
@login_required
def get_all_lists():
    """
    Query for all lists and returns them in a list of task dictionaries
    """
    # lists = List.query.all()
    # lists = current_user.lists
    # if not lists:
    #     return 'no lists'
    lists = List.query.filter(List.user_id == current_user.id).all()

    return {list.id: list.to_dict() for list in lists}

# Get list by id
@list_routes.route('/<int:id>')
@login_required
def get_list(id):
    """
    Query for one lists and returns in list a dictionary
    """
    list = List.query.get(id)

    if not list:
        return {"errors": "List not found"}

    return list.to_dict()


# Create list
@list_routes.route('/', methods=['POST'])
@login_required
def create_list():
    """
    Creates a task
    """
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        list = List(
        user_id = current_user.id,
        name = form.data['name'],
        notes = form.data['notes'],
        # due = form.data['due'],
        status = 'Not Started',
        created_at = datetime.datetime.now(),
        updated_at = datetime.datetime.now()
        )

        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


# Edit list by id
@list_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_list(id):
    """
    Query for one list and returns in list a dictionary
    """

    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    list = List.query.get(id)

    if current_user.id == list.user_id and form.validate_on_submit():
        list.name = form.data['name']
        list.notes = form.data['notes']
        # list.due = form.data['due']
        list.status = 'Not Started'
        list.updated_at = datetime.datetime.now()

        db.session.add(list)
        db.session.commit()
        return list.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# Delete a list by list id
@list_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_list(id):
    list = List.query.get(id)
    if not list:
        return {"Error": "List not found"}

    db.session.delete(list)
    db.session.commit()
    return{"message": "Delete successful"}
