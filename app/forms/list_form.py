from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

# def check_length(form, field):
#     name = field.data
#     notes = form.data['notes']
#     if len(name) < 2 or len(name) > 100:
#         raise ValidationError('List names must be between 2 and 50 characters long.')
#     if len(notes) > 2000:
#         raise ValidationError('Notes must be less than 2000 characters long.')


class ListForm(FlaskForm):
    user_id = IntegerField('user_id')
    name = StringField('name', validators=[DataRequired(), Length(min=2,max=100, message='List names must be between 2 and 100 characters long.')])
    notes = TextAreaField('notes', validators=[Length(max=1500, message='Notes must be less than 1500 characters long.')])
    # due = StringField('due')
    status = StringField('status', default='Not Started')
