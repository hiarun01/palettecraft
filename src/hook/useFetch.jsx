import {useState} from "react";

export function useColorGenerator(generateResult, ResponseModify) {
  const [isLoading, setIsLoading] = useState(false);
  const [colorPalettes, setColorPalettes] = useState([]);

  const generateColors = async (userPrompt) => {
    try {
      setIsLoading(true);
      const response = await generateResult(userPrompt);
      if (response) {
        const parsed = ResponseModify(response);
        setColorPalettes(parsed);
      }
    } catch (error) {
      console.log(`${error} while generating color palettes...`);
    } finally {
      setIsLoading(false);
    }
  };

  return {isLoading, colorPalettes, generateColors};
}
