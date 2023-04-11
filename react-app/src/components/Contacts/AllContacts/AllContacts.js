import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactsThunk } from "../../../store/networks";
import "./AllContacts.css";
import OpenModalButton from "../../OpenModalButton";
// import TaskShow from "../TaskShow/TaskShow";
import ContactItem from "../ContactItem/ContactItem";
import CreateContact from "../CreateContact/CreateContact";

const AllContacts = () => {
  const dispatch = useDispatch();
  const allContacts = useSelector((state) => state.Contacts.allContacts);
  const currentContact = useSelector((state) => state.Contacts.singleContact);

  const allContactsArr = Object.values(allContacts);
  // const [isLoaded, setsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getContactsThunk()).then(() => {
      // setIsLoaded(true);
    });
  }, [dispatch, currentContact]);

  let contactItems;
  if (Object.values(allContacts).length) {
    contactItems = allContactsArr.map((contact) => {
      return <ContactItem key={contact.id} contact={contact} contactId={contact.id} />;
    });
  }

  return (
    <div className="all-jobs-container">
      <div className="jobs-top-container">
        <h2 className="all-jobs-header">Contacts</h2>
      </div>
      {allContactsArr.length ? (
        <>
          <div className="jobs-container">
            <ul className="jobs-wrapper">{contactItems}</ul>
          </div>
        </>
      ) : (
        <>
          <h2>Click 'Add Contact' to make your first contact!</h2>
        </>
      )}
      <div className="jobs-button-container">
        <OpenModalButton
          className="add-job-modal-button"
          modalComponent={<CreateContact />}
          buttonText="Add Contact"
        />
      </div>
    </div>
  );
};

export default AllContacts;
