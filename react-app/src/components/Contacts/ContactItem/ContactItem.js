import ContactShow from "../ContactShow/ContactShow";
import OpenModalButton from "../../OpenModalButton";
import './ContactItem.css'

const ContactItem = ({ contact }) => {

  return (
    <div className="contact-item">
      <OpenModalButton
        className="open-task-modal-button contact list"
        modalComponent={
          <ContactShow contact={contact}/>
        }
        buttonText={
          <>
          <div>{contact.first_name} {contact.last_name}</div>
          <div>{contact.position} at {contact.company_name}</div>

          </>
        }
      />
    </div>
  );
};

export default ContactItem;
