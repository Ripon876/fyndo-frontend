import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND, FRIENDSHIP_STATUS } from "../../queries/profile";
import { ShowError, ShowSuceess } from "../../utils/Alerts";
import { Circle2 } from "react-preloaders2";

function FriendShipStatus({ user }) {
  const { loading: fsLoading, data: fsData } = useQuery(FRIENDSHIP_STATUS, {
    variables: { id: user?.id },
    fetchPolicy: "network-only",
  });

  const [addFriend, { data, error, loading }] = useMutation(ADD_FRIEND, {
    update: (cache, { data: { addFriend } }) => {
      cache.writeQuery({
        query: FRIENDSHIP_STATUS,
        variables: { id: user?.id },
        data: {
          friendshipStatus: addFriend === "Cancel Request" ? "pending" : null,
        },
      });
    },
  });
  const sendRequest = () => {
    addFriend({
      variables: { id: user?.id },
    });
  };
  return (
    <div>
      {loading && <Circle2 color={"#9ca3af"} />}
      {error && <ShowError />}
      {data && (
        <ShowSuceess
          msg={fsData?.friendshipStatus ? "Request sent" : "Request canceled"}
        />
      )}
      {!fsLoading && (
        <div className="text-end">
          {!fsData?.friendshipStatus && (
            <button className="btn p-btn" onClick={sendRequest}>
              Add Friend
            </button>
          )}
          {fsData && fsData.friendshipStatus === "pending" && (
            <button className="btn p-btn" onClick={sendRequest}>
              Cancel Request
            </button>
          )}
          {fsData && fsData.friendshipStatus === "accepted" && (
            <button className="btn p-btn" onClick={sendRequest}>
              Friends
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default FriendShipStatus;
