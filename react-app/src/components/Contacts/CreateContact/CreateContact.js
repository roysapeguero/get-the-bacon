import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactThunk,
  editContactThunk,
  getContactThunk,
  getContactsThunk,
  createContactThunk,
} from "../../../store/networks";
import { useModal } from "../../../context/Modal";
import "./CreateContact.css";

const CreateContact = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const currentUser = useSelector((state) => state.session.user);

  const currentContact = useSelector((state) => state.Contacts.singleContact);
  const [position, setPosition] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [site, setSite] = useState('');
  const [positionOfInterest, setPositionOfInterest] = useState('');
  const [contactNotes, setContactNotes] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const contact = {
      ...currentContact,
      userId: currentUser.id,
      position,
      first_name: firstName,
      last_name: lastName,
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

    const data = await dispatch(createContactThunk(contact));
    if (data) {
      setErrors(data.errors);
    } else {
      setErrors([]);
      dispatch(getContactsThunk());
      closeModal();
    }
  };

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  return (
    <div className="contact-modal">
      <form onSubmit={handleSubmit}>
        <h1 className="modal-form-title">Contact Details</h1>
        <ul className="errors-container">
          {errors.map((error, idx) => (
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
          <button className="todo-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContact;
