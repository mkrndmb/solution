import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import "./cardlist.css";
import { getTotalData } from "../../redux/mailSlice";
import { useState } from "react";

export default function CardList({ setBodyId, filter ,bodyId}) {
  const [nextPage, setNextPage] = useState(true);
  const unreadData = useSelector((state) => state.mail?.unread?.res);
  const readData = unreadData?.filter(data=>data.hasRead)
  const FavData = unreadData?.filter(data=>data.isFav)

  const data =
     filter === 2
      ? readData
      : filter === 3
      ? FavData
      : nextPage ? unreadData?.slice(0,10): unreadData?.slice(10);

  const dispatch = useDispatch();

  const handleClick = (id, card) => {
   
      setBodyId(id);
      let readData = unreadData.map(data=>data.id===id ? {...data,hasRead:true}:data)
      dispatch(getTotalData({...unreadData,res:readData}))
      
  };

  return (
    <div className="cardlist">
      {data?.map((card) => {
        return (
          <div key={card.id} onClick={() => handleClick(card.id, card)}>
            <Card card={card} bodyId={bodyId}/>
          </div>
        );
      })}
      {data && filter===1 && <button
        className="pagebutton"
        onClick={() => {
          setNextPage(!nextPage);
          setBodyId(null);
        }}
      >
        {nextPage ? 'Next Page' : 'Prev Page'}
      </button>}
    </div>
  );
}
