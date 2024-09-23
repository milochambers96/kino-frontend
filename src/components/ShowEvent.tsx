import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IEvent } from "../interfaces/event";
import { IComment } from "../interfaces/comment";

function ShowEvent() {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);

  return <h1>Event Details</h1>;
}

export default ShowEvent;
