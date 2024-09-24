import { useState, useEffect, SyntheticEvent } from "react";

interface BoroughSelectorProps {
  boroughData: string;
  area: string;
  updateForm: (e: SyntheticEvent) => void;
}

function BoroughSelector({
  boroughData,
  area,
  updateForm,
}: BoroughSelectorProps) {
  const [boroughOptions, setBoroughOptions] = useState<string[]>([]);

  useEffect(() => {
    switch (area) {
      case "North":
        setBoroughOptions([
          "Barnet",
          "Camden",
          "Enfield",
          "Harringey",
          "Islington",
        ]);
        break;
      case "East":
        setBoroughOptions([
          "Barking and Dagenham",
          "Hackney",
          "Havering",
          "Newham",
          "Redbridge",
          "Tower Hamlets",
          "Waltham Forest",
        ]);
        break;
      case "South":
        setBoroughOptions([
          "Bexley",
          "Bromley",
          "Croydon",
          "Greenwich",
          "Kingston upon Thames",
          "Lambeth",
          "Lewisham",
          "Merton",
          "Sutton",
          "Southwark",
          "Wandsworth",
        ]);
        break;
      case "West":
        setBoroughOptions([
          "Brent",
          "Ealing",
          "Hammersmith and Fulham",
          "Harrow",
          "Hillingdon",
          "Hounslow",
          "Kensington and Chelsea",
          "Richmond upon Thames",
        ]);
        break;
      case "Central":
        setBoroughOptions(["City of London", "Westminster"]);
        break;
      default:
        setBoroughOptions([]);
        break;
    }
  }, [area]);

  return (
    <div className="field">
      <label className="label">Borough</label>
      <div className="control">
        <div className="select">
          <select name="borough" value={boroughData} onChange={updateForm}>
            <option value="">Select a borough</option>
            {boroughOptions?.map((borough) => (
              <option key={borough} value={borough}>
                {borough}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default BoroughSelector;
