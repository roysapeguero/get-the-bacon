// import { useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
import ListShow from "../ListShow/ListShow";
import OpenModalButton from "../../OpenModalButton";
import './ListItem.css'

const ListItem = ({ list }) => {

  return (
    <div className="list-name-item">

      <OpenModalButton
        className="open-list-modal-button"
        modalComponent={
        <ListShow list={list}/>
        }
        buttonText={list.name}
      />
    </div>
  );
};

export default ListItem;
