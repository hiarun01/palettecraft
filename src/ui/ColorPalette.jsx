import React, {useState} from "react";

const ColorPalette = ({paletteName, colors, addOnUISdk}) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (hex, index) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(hex)
        .then(() => {
          setCopiedIndex(index);
          setTimeout(() => setCopiedIndex(null), 1000);
        })
        .catch(() => {
          // fallback for older browsers
          const textarea = document.createElement("textarea");
          textarea.value = hex;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
          setCopiedIndex(index);
          setTimeout(() => setCopiedIndex(null), 1000);
        });
    } else {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = hex;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1000);
    }
  };

  return (
    <div className="palette">
      <h2 className="palette-title">{paletteName}</h2>
      <div className="colors-grid">
        {colors.map((color, index) => (
          <div key={index} className="color-item">
            <p className="color-name">{color.name}</p>
            <div
              className="color-square"
              style={{backgroundColor: color.hex}}
              title={`Click to copy ${color.hex}`}
              onClick={() => copyToClipboard(color.hex, index)}
            />
            <p className="color-hex" style={{cursor: "pointer"}}>
              {color.hex}
              {copiedIndex === index && (
                <span
                  style={{marginLeft: 8, color: "green", fontSize: "0.85em"}}
                >
                  Copied!
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
