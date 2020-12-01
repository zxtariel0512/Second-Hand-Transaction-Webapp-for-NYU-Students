import React, { useParams } from "react";

export default function Index(props) {
  const query = new URLSearchParams(props.location.search);
  const sessionId = query.get("session_id");

  return (
    <div>
      <div>hello</div>
      <div>{sessionId}</div>
    </div>
  );
}
