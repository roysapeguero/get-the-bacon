from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

class NetworkForm(FlaskForm):
    user_id = IntegerField('user_id')
    list_id = IntegerField('list_id')
    position = StringField('position', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    company_name = StringField('company_name', validators=[DataRequired()])
    company_location = StringField('company_location', validators=[DataRequired()])
    company_notes = StringField('company_notes', validators=[DataRequired()])
    linkedin = StringField('linkedin')
    github = StringField('github')
    number = StringField('number')
    email = TextAreaField('email')
    site = IntegerField('site')
    position_of_interest = IntegerField('position_of_interest')
    contact_notes = IntegerField('contact_notes')
    # hooks = TextAreaField('hooks')
    # extra_notes = TextAreaField('status')
