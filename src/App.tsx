import { useState } from "react";
import { MultiSelect, SelectOption } from "./MultiSelect";

const options = [
  {label: 'Education 🎓', value: 1 },
  {label: 'Science 🔮', value: 2 },
  {label: 'Art 🎨', value: 3 },
  {label: 'Sport ⚽️', value: 4 },
  {label: 'Games 🎮', value: 5 },
  {label: 'Health 🏥', value: 6 },
];

function App() {
  const [value, setValue] = useState<SelectOption[]>([options[0]]);
  return (
    <>
    <MultiSelect multiple options={options} value={value} onChange={ o => setValue(o)}/>
    </>
)}

export default App
