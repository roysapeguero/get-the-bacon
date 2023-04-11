import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactThunk,
  editContactThunk,
  getContactThunk,
  getContactsThunk,
} from "../../../store/networks";
import { useModal } from "../../../context/Modal";
import "./ContactShow.css";

const ContactShow = ({ contact }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const currentContact = useSelector((state) => state.Contacts.singleContact);
  const [position, setPosition] = useState(contact?.position);
  const [firstName, setFirstName] = useState(contact?.first_name);
  const [lastName, setLastName] = useState(contact?.last_name);
  const [companyName, setCompanyName] = useState(contact?.company_name);
  const [companyLocation, setCompanyLocation] = useState(contact?.company_location);
  const [linkedin, setLinkedin] = useState(contact.linkedin || '');
  const [github, setGithub] = useState(contact.github || '');
  const [number, setNumber] = useState(contact.number || '');
  const [email, setEmail] = useState(contact.email || '');
  const [site, setSite] = useState(contact.site || '');
  const [positionOfInterest, setPositionOfInterest] = useState(contact.position_of_interest || '');
  const [contactNotes, setContactNotes] = useState(contact.contact_notes || '');

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const contact = {
      ...currentContact,
      first_name: firstName,
      last_name: lastName,
      position,
      company_name: companyName,
      company_location: companyLocation,
      linkedin,
      github,
      number,
      email,
      site,
      position_of_interest: positionOfInterest,
      contact_notes: contactNotes,
    };
    console.log('contact?', contact)

    const data = await dispatch(editContactThunk(contact, currentContact.id));
    if (data) {
      setErrors(data.errors);
      closeModal();
    } else {
      setErrors([]);
    }
  };

  useEffect(() => {
    dispatch(getContactThunk(contact.id));
  }, [dispatch]);

  return (
    <div className="contact-modal">
      <form onSubmit={handleSubmit}>
        <h1 className="modal-form-title contact">Contact Details</h1>
        <ul className="errors-container">
          {errors?.map((error, idx) => (
            <p className="errors" key={idx}>
              {error}
            </p>
          ))}
        </ul>
          <div className="basic-info-text">
            <label className="input-text-label" htmlFor="job-title">
              First Name:
            </label>
            <input
              name="job-title"
              className="job-title job-input-item"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label className="input-text-label" htmlFor="job-title">
              Last Name:
            </label>
            <input
              name="job-title"
              className="job-title job-input-item"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label className="input-text-label" htmlFor="job-title">
              Position:
            </label>
            <input
              name="job-title"
              className="job-title job-input-item"
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <label className="input-text-label" htmlFor="company-name">
              Company Name:
            </label>
            <input
              name="company-name"
              className="company-name job-input-item"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
            <label className="input-text-label" htmlFor="job-benefits">
              Company Location:
            </label>
            <input
              className="job-location job-input-item"
              type="text"
              value={companyLocation}
              onChange={(e) => setCompanyLocation(e.target.value)}
              required
            />
            <label className="input-text-label" htmlFor="job-benefits">
              LinkedIn:
            </label>
            <input
              className="job-status job-input-item"
              type="text"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <label className="input-text-label" htmlFor="job-benefits">
              GitHub:
            </label>
            <input
              name="job-benefits"
              className="job-benefits job-input-item"
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
            <label className="input-text-label" htmlFor="job-benefits">
              Number:
            </label>
            <input
              name="job-benefits"
              className="job-benefits job-input-item"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <label className="input-text-label" htmlFor="job-benefits">
              Email:
            </label>
            <input
              name="job-benefits"
              className="job-benefits job-input-item"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="input-text-label" htmlFor="job-benefits">
              Site:
            </label>
            <input
              name="job-benefits"
              className="job-benefits job-input-item"
              type="text"
              value={site}
              onChange={(e) => setSite(e.target.value)}
            />
            <label className="input-text-label" htmlFor="job-benefits">
              Position of Interest:
            </label>
            <input
              name="job-benefits"
              className="job-benefits job-input-item"
              type="text"
              value={positionOfInterest}
              onChange={(e) => setPositionOfInterest(e.target.value)}
            />
            <label className="input-text-label">Contact Notes:</label>
            <textarea
              name="extra-notes"
              className="job-text-area notes job-input-item"
              type="text"
              value={contactNotes}
              onChange={(e) => setContactNotes(e.target.value)}
            />
          </div>

          <div className="todo-action-buttons">
            <button
              className="todo-button"
              type="button"
              onClick={() => {
                dispatch(deleteContactThunk(contact.id)).then(() =>
                  closeModal()
                );
                dispatch(getContactsThunk());
              }}
            >
              Delete
            </button>
            <button className="todo-button" type="submit">
              Save
            </button>
          </div>
      </form>
    </div>
  );
};

export default ContactShow;
