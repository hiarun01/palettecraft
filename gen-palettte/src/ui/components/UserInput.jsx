import React from "react";
import {useColorGenerator} from "../../hook/useFetch";

const UserInput = () => {
  const {userPrompt, setUserPrompt} = useColorGenerator();
  return (
    <div className="user-input-section">
      <div>
        <textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          type="text"
          rows={5}
          className="input"
          placeholder="tell us the mood, style, or theme you'd like your color palette to capture."
        />
      </div>
      <div>
        <button onClick={handleClick} className="btn">
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};

export default UserInput;
