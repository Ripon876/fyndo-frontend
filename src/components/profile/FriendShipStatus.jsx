import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_FRIEND,
  FRIENDSHIP_STATUS,
  ACCEPT_REQUEST,
} from "../../queries/profile";
import { ShowError } from "../../utils/Alerts";
import { Circle2 } from "react-preloaders2";
import { Link } from "react-router-dom";

function FriendShipStatus({ user, uId }) {
  const { loading: fsLoading, data: fsData } = useQuery(FRIENDSHIP_STATUS, {
    variables: { id: user?.id },
    fetchPolicy: "network-only",
  });

  const [addFriend, { error, loading }] = useMutation(ADD_FRIEND, {
    update: (cache, { data: { addFriend } }) => {
      const { friendshipStatus } = cache.readQuery({
        query: FRIENDSHIP_STATUS,
        variables: { id: user?.id },
      });
      cache.writeQuery({
        query: FRIENDSHIP_STATUS,
        variables: { id: user?.id },
        data: {
          friendshipStatus:
            addFriend !== "Cancel Request"
              ? null
              : {
                  ...friendshipStatus,
                  status: "pending",
                },
        },
      });
    },
  });

  const [acceptRequest, { loading: arLoading }] = useMutation(ACCEPT_REQUEST, {
    update: (cache, { data: { acceptRequest } }) => {
      const { friendshipStatus } = cache.readQuery({
        query: FRIENDSHIP_STATUS,
        variables: { id: user?.id },
      });
      cache.writeQuery({
        query: FRIENDSHIP_STATUS,
        variables: { id: user?.id },
        data: {
          friendshipStatus: {
            ...friendshipStatus,
            status: acceptRequest ? "accepted" : "pending",
          },
        },
      });
    },
  });

  const sendRequest = () => {
    addFriend({
      variables: { id: user?.id },
    });
  };
  const acceptFriendRequest = () => {
    acceptRequest({
      variables: { id: fsData?.friendshipStatus?.id },
    });
  };

  return (
    <div>
      {(loading || arLoading) && <Circle2 color={"#9ca3af"} />}
      {error && <ShowError />}
      {!fsLoading && (
        <div className="text-end">
          {!fsData?.friendshipStatus && (
            <button className="btn p-btn" onClick={sendRequest}>
              Add Friend
            </button>
          )}
          {fsData && fsData.friendshipStatus?.status === "pending" && (
            <>
              <button className="btn p-btn" onClick={sendRequest}>
                Cancel Request
              </button>

              {fsData.friendshipStatus?.sender === user?.id && (
                <button className="btn p-btn" onClick={acceptFriendRequest}>
                  Accept Request
                </button>
              )}
            </>
          )}
          {fsData && fsData.friendshipStatus?.status === "accepted" && (
            <>
              <button className="btn p-btn" onClick={sendRequest}>
                Friends
              </button>
              <Link className="btn p-btn" to={"/messages/" + user?.id}>
                Message
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default FriendShipStatus;
