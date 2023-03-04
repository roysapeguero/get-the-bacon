from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

def check_length(form, field):
    name = field.data
    notes = form.data['notes']
    if len(name) < 2 or len(name) > 50:
        raise ValidationError('Task names must be between 2 and 50 characters long.')
    if len(notes) > 1000:
        raise ValidationError('Notes must be less than 1000 characters long.')

class TaskForm(FlaskForm):
    user_id = IntegerField('user_id')
    list_id = IntegerField('list_id')
    name = StringField('name', validators=[DataRequired(),check_length])
    notes = TextAreaField('notes', validators=[Length(max=1000, message='Notes must be less than 1000 characters long.')])
    # due = StringField('due')
    status = StringField('status', default='Not Started')
