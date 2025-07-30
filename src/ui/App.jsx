// To support: system="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/

import {Theme} from "@swc-react/theme";
import React, {useState} from "react";
import "./App.css";
import {generateResult} from "../services/Gen-ai-config";
import ColorPalette from "./ColorPalette";
import {ResponseModify} from "../services/Response-modifyer";
import {useColorGenerator} from "../hook/useFetch";
import Loader from "./Loader";

const App = ({addOnUISdk, sandboxProxy}) => {
  const [userPrompt, setUserPrompt] = useState("");
  const {isLoading, colorPalettes, generateColors} = useColorGenerator(
    generateResult,
    ResponseModify
  );

  return (
    // Please note that the below "<Theme>" component does not react to theme changes in Express.
    // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
    <Theme system="express" scale="medium" color="light">
      <div className="container">
        {/* hero section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h1 style={{fontSize: "20px", fontWeight: "bold"}}>
            <span
              style={{
                color: "#ff1a1aff",
                fontSize: "24px",
                fontWeight: "extra-bold",
              }}
            >
              PaletteCraft{" "}
            </span>{" "}
            - Paint Your Ideas with Just Words
          </h1>
          <p style={{fontSize: "12px", color: "#666"}}>
            Generate beautiful color palettes with the power of AI.
          </p>
        </div>

        {/* user input section */}
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
            <button onClick={() => generateColors(userPrompt)} className="btn">
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Loader />
                  <span style={{padding: "0 10px"}}>Generating</span>
                </div>
              ) : (
                <span style={{padding: "0 10px"}}>Generate</span>
              )}
            </button>
          </div>
        </div>

        {/* Generating result section */}
        <div
          className="result-container"
          style={{
            overflow: "scroll",
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          {!isLoading &&
            colorPalettes.map((palette, index) => (
              <div key={index} className="palette-container">
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
