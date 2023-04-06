from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

# def check_length(form, field):
#     name = field.data
#     notes = form.data['notes']
#     if len(name) < 2 or len(name) > 50:
#         raise ValidationError('Task names must be between 2 and 50 characters long.')
#     if len(notes) > 1000:
#         raise ValidationError('Notes must be less than 1000 characters long.')

class JobForm(FlaskForm):
    user_id = IntegerField('user_id')
    list_id = IntegerField('list_id')
    job_title = StringField('job_title', validators=[DataRequired()])
    company_name = StringField('company_name', validators=[DataRequired()])
    company_image_url = StringField('company_image_url')
    job_location = StringField('job_location', validators=[DataRequired()])
    status = StringField('status')
    benefits = StringField('benefits')
    listing_url = StringField('listing_url')
    job_description = TextAreaField('job_description')
    salary = IntegerField('salary')
    job_notes = TextAreaField('job_notes')
    hooks = TextAreaField('hooks')
    extra_notes = TextAreaField('status')
