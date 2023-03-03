import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListsThunk } from "../../../store/lists";
import "./AllLists.css";
import OpenModalButton from "../../OpenModalButton";
// import ListShow from "../ListShow/ListShow";
import ListItem from "../ListItem/ListItem";
import CreateList from "../CreateList/CreateList";

const AllLists = () => {
  const dispatch = useDispatch();
  const allLists = useSelector((state) => state.Lists.allLists);
  const allListsArr = Object.values(allLists);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getListsThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  let listItems;
  if (Object.values(allLists).length) {
    listItems = allListsArr.map((list) => {
      return <ListItem key={list.id} list={list} listId={list.id} />;
    });
  }

  // if (!Object.values(allLists).length) return null;
  // if (!allListsArr.length) return null;

  return (
    <div className="all-lists-container">
      <div className="list-top-container">
        <h2 className="all-lists-header">Lists</h2>
      </div>
      {allListsArr.length ? (
        <>
          <div className="lists-container">
            <ul className="lists-wrapper">{listItems}</ul>
          </div>
        </>
      ) : (
        <>
          <h2>no listkies bro</h2>
        </>
      )}
      <div className="lists-button-container">
        <OpenModalButton
          className="add-list-modal-button"
          modalComponent={<CreateList />}
          buttonText="Add List"
        />
      </div>
    </div>
  );
};

export default AllLists;
