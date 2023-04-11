const GET_CONTACTS = "contacts/GET_CONTACTS";
const GET_CONTACT = "contacts/GET_CONTACT";
const CREATE_CONTACT = "contacts/CREATE_CONTACT";
const EDIT_CONTACT = "contacts/EDIT_CONTACT";
const DELETE_CONTACT = "contacts/DELETE_CONTACT";

const loadContacts = (contacts) => {
  return {
    type: GET_CONTACTS,
    payload: contacts
  }
};

const loadContact = (contact) => {
  return {
    type: GET_CONTACT,
    payload: contact
  }
};

const createContact = (contact) => {
  return {
    type: CREATE_CONTACT,
    payload: contact,
  }
};


const editContact = (contact) => {
  return {
    type: EDIT_CONTACT,
    payload: contact
  };
};

const deleteContact = (contactId) => {
  return {
    type: DELETE_CONTACT,
    payload: contactId
  }
};


// Get contacts
export const getContactsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/contacts`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadContacts(data));
  }
};

// Get contact
export const getContactThunk = (contactId) => async (dispatch) => {
  const res = await fetch(`/api/contacts/${contactId}`);

  if (res.ok) {
    const data = await res.json();
    dispatch(loadContact(data));
  }
};

// Edit contact
export const editContactThunk = (contact, contactId) => async (dispatch) => {
  console.log('hi', contact, contactId)
  const res = await fetch(`/api/contacts/${contact.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  console.log('ummm', res)

  if (res.ok) {
    const contact = await res.json();
    dispatch(editContact(contact));
    return contact
  } else {
    const data = await res.json();
    if (data.errors) return data;
  }
};

// Create contact
export const createContactThunk = (contact) => async (dispatch) => {
  console.log('hi', contact)
  const res = await fetch("/api/contacts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact),
  });

  console.log('res', res)
  if (res.ok) {
    const contact = await res.json();
    dispatch(createContact(contact));
    // return contact
  } else {
    const data = await res.json();
    if (data.errors) return data;
  }
};


// Delete contact
export const deleteContactThunk = (contactId) => async (dispatch) => {
  const res = await fetch(`/api/contacts/${contactId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    const data = await res.json()
    dispatch(deleteContact(contactId));
    return data
  }
};

const initialState = { allContacts: {}, singleContact: {}}

const contactsReducer = (state = initialState, action) => {
  let newState = { allContacts: { ...state.allContacts }, singleContact: {...state.singleContact} };
  switch (action.type) {
    case GET_CONTACTS:
      newState = {...state}
      newState.allContacts = action.payload
      return newState

    case GET_CONTACT:
      newState.singleContact = action.payload
      return newState

    case EDIT_CONTACT:
      newState.allContacts = {...newState.allContacts, [action.payload.id]: action.payload}
      newState.singleContact = {...state.singleContact, ...action.payload}
      return newState

    case CREATE_CONTACT:
      newState.allContacts = {...state.allContacts, [action.payload.id]: action.payload}
      return newState

    case DELETE_CONTACT:
      delete newState.allContacts[action.payload]
      newState.singleContact = {}
      return newState

    default:
      return state
  }
}

export default contactsReducer;
