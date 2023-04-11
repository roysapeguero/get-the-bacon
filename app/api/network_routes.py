from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import User, Network, db
from app.forms import NetworkForm
import datetime

network_routes = Blueprint('network', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# Get all contacts
@network_routes.route('')
@login_required
def get_all_contacts():
    """
    Query for all contacts and returns them in a list of contact dictionaries
    """

    contacts = Network.query.filter(Network.user_id == current_user.id).all()

    return {contact.id: contact.to_dict() for contact in contacts}

# Get contact by id
@network_routes.route('/<int:id>')
@login_required
def get_contact(id):
    """
    Query for one contacts and returns in contact a dictionary
    """
    contact = Network.query.get(id)

    if not contact:
        return {"errors": "Contact not found"}

    return contact.to_dict()

# Create contact
@network_routes.route('/', methods=['POST'])
@login_required
def create_contact():
    """
    Creates a job
    """
    form = NetworkForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        contact = Network(
        user_id = current_user.id,
        # list_id = form.data['list_id'],
        position = form.data['position'],
        first_name = form.data['first_name'],
        last_name = form.data['last_name'],
        company_name = form.data['company_name'],
        # company_image_url = form.data['company_image_url'],
        company_location = form.data['company_location'],
        linkedin = form.data['linkedin'],
        github = form.data['github'],
        number = form.data['number'],
        email =  form.data['email'],
        site =  form.data['site'],
        position_of_interest =  form.data['position_of_interest'],
        contact_notes =  form.data['contact_notes'],
        created_at = datetime.datetime.now(),
        updated_at = datetime.datetime.now()
        )

        db.session.add(contact)
        db.session.commit()
        return contact.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Edit contact by id
@network_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_contact(id):
    """
    Query for one contact and returns in contact a dictionary
    """

    form = NetworkForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    contact = Network.query.get(id)

    if current_user.id == contact.user_id and form.validate_on_submit():
        contact.user_id = current_user.id
        # contact.list_id = form.data['list_id']
        contact.first_name = form.data['first_name']
        contact.last_name = form.data['last_name']
        contact.position = form.data['position']
        contact.company_name = form.data['company_name']
        contact.company_location = form.data['company_location']
        contact.contact_notes =  form.data['contact_notes']
        contact.linkedin = form.data['linkedin']
        contact.github = form.data['github']
        contact.number = form.data['number']
        contact.email = form.data['email']
        contact.site =  form.data['site']
        contact.position_of_interest =  form.data['position_of_interest']
        contact.updated_at = datetime.datetime.now()

        db.session.add(contact)
        db.session.commit()
        return contact.to_dict()

    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# Delete a contact by contact id
@network_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_contact(id):
    contact = Network.query.get(id)
    if not contact:
        return {"Error": "Contact not found"}

    db.session.delete(contact)
    db.session.commit()
    return{"message": "Delete successful"}
