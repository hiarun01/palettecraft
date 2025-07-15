import React, {useState} from "react";

const ColorPalette = ({paletteName, colors}) => {
  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    alert(`Copied ${hex} to clipboard!`);
  };

  return (
    <div className="palette-container">
      <h2 className="palette-title">{paletteName}</h2>
      <div className="colors-grid">
        {colors.map((color, index) => (
          <div key={index} className="color-item">
            <div
              className="color-square"
              style={{backgroundColor: color.hex}}
              onClick={() => copyToClipboard(color.hex)}
              title={`Click to copy ${color.hex}`}
            />
            <p className="color-name">{color.name}</p>
            <p className="color-hex">{color.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
