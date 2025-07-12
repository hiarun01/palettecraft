import React, {useState} from "react";

const ColorPalette = ({paletteName, colors}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {hoveredIndex === index && (
              <div className="color-tooltip">{color.hex}</div>
            )}
            <p className="color-name">{color.name}</p>
            <p className="color-hex">{color.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
