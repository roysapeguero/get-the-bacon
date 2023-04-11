from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

class NetworkForm(FlaskForm):
    user_id = IntegerField('user_id')
    # list_id = IntegerField('list_id')
    position = StringField('position', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    company_name = StringField('company_name', validators=[DataRequired()])
    company_location = StringField('company_location', validators=[DataRequired()])
    linkedin = StringField('linkedin')
    github = StringField('github')
    number = StringField('number')
    email = StringField('email')
    site = StringField('site')
    position_of_interest = StringField('position_of_interest')
    contact_notes = StringField('contact_notes')
    # hooks = TextAreaField('hooks')
    # extra_notes = TextAreaField('status')
