import React from "react";

const ProfileBio = ({ currentProfile }) => {
  const point = currentProfile?.point
  return (
    <div>
      <div>
        <h4>Points Scored: {point} </h4>
        {
          currentProfile?.subscription === 0 ?(
            <h5>Subscribed to Free Users</h5>
          ):currentProfile?.subscription === 1 ?(
            <h5>Subscribed to Siver User</h5>
          ):currentProfile?.subscription === 2 ?(
            <h5>Subscribed to Golden user</h5>
          ):(
            <p></p>
          )
        }
      </div>
      <div>
        {currentProfile?.tags.length !== 0 ? (
          <>
            <h4>Tags watched</h4>
            {currentProfile?.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </>
        ) : (
          <p>0 tags watched</p>
        )}
      </div>
      <div>
        {currentProfile?.about ? (
          <>
            <h4>About</h4>
            <p>{currentProfile?.about}</p>
          </>
        ) : (
          <p>No bio found</p>
        )}
      </div>
    </div>
  );
};

export default ProfileBio;