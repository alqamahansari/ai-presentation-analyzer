import { useState } from "react";

import HomeScreen from "./components/HomeScreen";
import InterviewScreen from "./components/InterviewScreen";
import ProcessingScreen from "./components/ProcessingScreen";
import Dashboard from "./components/Dashboard";

function App() {

  const [screen, setScreen] = useState("home");
  const [results, setResults] = useState(null);

  if (screen === "home")
    return <HomeScreen startInterview={() => setScreen("interview")} />;

  if (screen === "interview")
    return (
      <InterviewScreen
        finishInterview={(data) => {
          setResults(data);
          setScreen("processing");
        }}
      />
    );

  if (screen === "processing")
    return (
      <ProcessingScreen
        done={() => setScreen("results")}
      />
    );

  if (screen === "results")
    return <Dashboard analytics={results} />;

  return null;
}

export default App;