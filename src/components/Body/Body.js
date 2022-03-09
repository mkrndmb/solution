import { useDispatch, useSelector } from "react-redux";
import "./body.css";
import { getTotalData} from "../../redux/mailSlice";

export default function Body({ filter }) {
  const bodyData = useSelector((state) => state.mail.bodyData);
  const unreadData = useSelector((state) => state.mail?.unread?.res);
  const selected = unreadData?.filter((item) => bodyData.id === item.id)?.[0];
  const dispatch = useDispatch();
  // bahutek selected chi garaj nahi
  

  const handleClick = () => {
    let FavData = unreadData.map(data=>data.id===bodyData.id ? {...data,isFav:true}:data)
    dispatch(getTotalData({...unreadData,res:FavData}))
  };


  return (
    <div className="body">
      <div className="body-icon"><div className='icon-wrap'>{(selected?.from?.name)?.slice(0,1)}</div></div>
      <div className="body-info">
        <div className="body-head">
          <div className="head-name">{selected?.subject}</div>
          <div className="head-fav" onClick={() => handleClick()}>
            Mark as Favourite
          </div>
        </div>
        <div className="body-date">
          {new Date(selected?.date).toLocaleDateString("en-IN", {
            hour: "numeric",
            hour12: true
          })}
        </div>
        <div className="body-desc" dangerouslySetInnerHTML={{ __html: bodyData?.body }}/>
      </div>
    </div>
  );
}
