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

const App = ({addOnUISdk, sandboxProxy}) => {
  const [userPrompt, setuserPrompt] = useState("");
  const [colorPalattes, setcolorPalattes] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setisLoading(true);
      const res = await generateResult(userPrompt);

      //   console.log("response", res);
      setcolorPalattes(res);
      setisLoading(false);
    } catch (error) {
      console.log(`${error} while generating color palattes..`);
    } finally {
      setisLoading(false);
    }
  };

  console.log("by useState:", colorPalattes);

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
          <ul>
            {/* {Array.isArray(colorPalattes) && colorPalattes.length > 0 ? (
              colorPalattes.map((palette, idx) => (
                <div key={idx} className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {palette.palette_name}
                  </h2>
                  <div className="flex gap-3">
                    {palette.colors.map((color, i) => (
                      <div key={i} className="text-center">
                        <div
                          className="w-16 h-16 rounded"
                          style={{backgroundColor: color.hex}}
                        />
                        <p className="text-sm mt-1">{color.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>Start by generating a palette ✨</p>
            )} */}
          </ul>
        </div>
      </div>
    </Theme>
  );
};

export default App;
