// To support: system="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/

import {Theme} from "@swc-react/theme";
import React, {useState} from "react";
import "./App.css";
import {generateResult} from "../../services/Gen-ai-config";
import ColorPalette from "./ColorPalette";
import {ResponseModify} from "../../services/Response-modifyer";

const App = ({addOnUISdk, sandboxProxy}) => {
  const [userPrompt, setuserPrompt] = useState("");
  const [colorPalattes, setcolorPalattes] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  console.log(colorPalattes);

  const handleGenerate = async () => {
    try {
      setisLoading(true);
      const response = await generateResult(userPrompt);
      console.log("ress", response);
      if (response) {
        const parsed = ResponseModify(response);
        setcolorPalattes(parsed);
      }
    } catch (error) {
      console.log(`${error} while generating color palattes..`);
    } finally {
      setisLoading(false);
    }
  };

  // console.log("by useState:", colorPalattes);

  return (
    // Please note that the below "<Theme>" component does not react to theme changes in Express.
    // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
    <Theme system="express" scale="medium" color="light">
      <div className="container">
        {/* user input section */}
        <div className="user-input-section">
          <div>
            <textarea
              value={userPrompt}
              onChange={(e) => setuserPrompt(e.target.value)}
              type="text"
              rows={5}
              className="input"
              placeholder="tell us the mood, style, or theme you'd like your color palette to capture."
            />
          </div>
          <div>
            <button onClick={handleGenerate} className="btn">
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {/* Generating result section */}
        <div className="result-container">
          {!isLoading &&
            colorPalattes.map((palette, index) => (
              <div key={index} className="mb-8">
                <ColorPalette
                  paletteName={palette.palette_name}
                  colors={palette.colors}
                />
              </div>
            ))}
        </div>
      </div>
    </Theme>
  );
};

export default App;
