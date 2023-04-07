from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import User, Job, db
from app.forms import JobForm
import datetime

job_routes = Blueprint('jobs', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


# Get all jobss
@job_routes.route('')
@login_required
def get_all_jobs():
    """
    Query for all jobs and returns them in a list of job dictionaries
    """

    jobs = Job.query.filter(Job.user_id == current_user.id).all()

    return {job.id: job.to_dict() for job in jobs}

# Get job by id
@job_routes.route('/<int:id>')
@login_required
def get_job(id):
    """
    Query for one jobs and returns in job a dictionary
    """
    job = Job.query.get(id)

    if not job:
        return {"errors": "Job not found"}

    return job.to_dict()


# Create job
@job_routes.route('/', methods=['POST'])
@login_required
def create_job():
    """
    Creates a job
    """
    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('i made it ----------------------------', task)

    if form.validate_on_submit():
        job = Job(
        user_id = current_user.id,
        list_id = form.data['list_id'],
        job_title = form.data['job_title'],
        company_name = form.data['company_name'],
        company_image_url = form.data['company_image_url'],
        job_location = form.data['job_location'],
        status = form.data['status'],
        benefits = form.data['benefits'],
        listing_url = form.data['listing_url'],
        job_description =  form.data['job_description'],
        salary =  form.data['salary'],
        job_notes =  form.data['job_notes'],
        hooks =  form.data['hooks'],
        extra_notes =  form.data['extra_notes'],
        created_at = datetime.datetime.now(),
        updated_at = datetime.datetime.now()
        )

        db.session.add(job)
        db.session.commit()
        return job.to_dict()
    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# Edit job by id
@job_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_job(id):
    """
    Query for one job and returns in job a dictionary
    """

    form = JobForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    job = Job.query.get(id)

    if current_user.id == job.user_id and form.validate_on_submit():
        job.job_title = form.data['job_title']
        # job.user_id = job.user_id,
        job.company_name = form.data['company_name']
        job.company_image_url = form.data['company_image_url']
        job.job_location = form.data['job_location']
        job.status = form.data['status']
        job.benefits = form.data['benefits']
        job.listing_url = form.data['listing_url']
        job.job_description =  form.data['job_description']
        job.salary =  form.data['salary']
        job.job_notes =  form.data['job_notes']
        job.hooks =  form.data['hooks']
        job.extra_notes =  form.data['extra_notes']
        job.updated_at = datetime.datetime.now()
        job.list_id = form.data['listId']

        db.session.add(job)
        db.session.commit()
        return job.to_dict()

    if form.errors:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# Delete a job by job id
@job_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_job(id):
    job = Job.query.get(id)
    if not job:
        return {"Error": "Job not found"}

    db.session.delete(job)
    db.session.commit()
    return{"message": "Delete successful"}
