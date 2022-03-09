import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Body from "../Body/Body";
import CardList from "../CardList/CardList";
import { fetchBodyData, fetchTotalData } from "../../redux/mailSlice";
import "./mailbox.css";

export function MailBox() {
  const dispatch = useDispatch();
  const [bodyId, setBodyId] = useState(null);
  const [filter, setFilter] = useState(1);
  const [loading,setLoading] = useState(true)
  // ,1=unread ,2=read, 3=favourite

  useEffect(() => {
    dispatch(fetchBodyData(bodyId));
  }, [bodyId]);

  useEffect(() => {
      dispatch(fetchTotalData());
      setLoading(false)  
  }, []);

  return (
    <div className="mailbox-container">
      <div className="filter">
        <div className="filter-head">Filter By:</div>
        <div className={filter===1 ? "unread currentFilter" : 'unread'} onClick={() =>{ setFilter(1);setBodyId(null)}}>
          Unread
        </div>
        <div className={filter===2 ? "read currentFilter" : 'read'} onClick={() => { setFilter(2);setBodyId(null)}}>
          Read
        </div>
        <div className={filter===3 ? "favourites currentFilter" : 'favourites'} onClick={() => { setFilter(3);setBodyId(null)}}>
          Favourites
        </div>
      </div>
      {loading && <h2>Loading...</h2>}
      <div className="mailbox">
        <CardList setBodyId={setBodyId} filter={filter} bodyId={bodyId} />
        {bodyId && <Body filter={filter} />}
      </div>
    </div>
  );
}
