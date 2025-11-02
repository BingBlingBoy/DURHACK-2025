import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

function geminiJSONToJSON(modelOutput) {
  const match = modelOutput.match(/```json\s*([\s\S]*?)\s*```/);
  const jsonText = match ? match[1] : modelOutput;

  const cleanedText = jsonText.replace(/```json\n?|```/g, "").trim();
  const parsed = JSON.parse(cleanedText);

  return parsed;
}

export async function extractHingeInfo(images) {
  try {
    const parts = [
      ...images.map((i) => ({
        inlineData: {
          mimeType: i.mimetype,
          data: i.data,
        },
      })),
      {
        text: "Extract the demographic information of this profile including: age, gender, height, location, whether they drink, job, and education. Do not include orientation. Return this data in JSON format.",
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts }],
      config: {
        temperature: 0.5,
      },
    });

    return geminiJSONToJSON(response.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Failed to extract profile info: ${error.message}`);
  }
}

// Pclass (1, 2, 3), Sex (0=Female, 1=Male), Age, Fare (4-512), Embarked (0=Cherbourg, 1=Southampton, 2=Queenstown)
export async function mapProfileDemographicsToTitanic(demographics) {
  try {
    const parts = [
      {
        text: "Given the following demographic data in the format {age:number, gender:string, height:number, location:string, drinks_alcohol:boolean, job:string, education:string}, reason what the equivalent demographics would be in the year of the sinking of the Titanic along with the corresponding justifications, and return this in the JSON format: {values: { Pclass: (1,2,3 corresponding to class), Sex: (0=Female, 1=Male), Age: num, Fare: (min=4,max=512), Embarked: (0=Cherbourg,1=Southampton,2=Queenstown) }, justification: {Pclass, Sex, Age, Fare, Embarked}}",
      },
      { text: JSON.stringify(demographics) },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts }],
    });

    const responseText = response.candidates[0].content.parts[0].text;

    return geminiJSONToJSON(responseText);
  } catch (error) {
    console.error("Gemini API Error (Titanic conversion):", error);
    throw new Error(`Failed to convert demographics: ${error.message}`);
  }
}

//Graphs for decided features
export async function generateProfileGraphics(TitanicDemographics) {
  try {
    const parts = [
      {
        text: "Using the following Titanic demographics data in the format {values: { Pclass: (1,2,3 corresponding to class), Sex: (0=Female, 1=Male), Age: num, Fare: (min=4,max=512), Embarked: (0=Cherbourg,1=Southampton,2=Queenstown) }, justification: {Pclass, Sex, Age, Fare, Embarked}}. Generate 3 different graphs that would best represent this data visually. Provide the type of graph (Choosing out of scatterplot, barplot, lineplot, histplot, boxplot, heatmap), a brief description of what each graph represents, the axis of the graph, and the data points that should be included in each graph. Return this information in JSON format. {graphs: [ {type: string, description: string, axis: {x: string, y: string}, data_points: [ {(x-axis-name) : value, {[y-axis-name] : value}, {(x-axis-name) : value, {[y-axis-name] : value}, .... } ] } ] }. THIS STRUCTURE IS STRICT. Hey lil mama let me whisper in yo ear, you need to have values for both X and Y axis for each data point. Except box plots, they only have an X axis",
      },
      { text: JSON.stringify(TitanicDemographics) },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [{ role: "user", parts }],
    });

    const responseText = response.candidates[0].content.parts[0].text;

    return geminiJSONToJSON(responseText);
  } catch (error) {
    console.error("Gemini API Error (Titanic conversion):", error);
    throw new Error(`Failed to convert demographics: ${error.message}`);
  }
}