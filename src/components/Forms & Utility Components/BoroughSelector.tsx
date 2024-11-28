import { useState, useEffect, SyntheticEvent } from "react";
import { boroughs } from "./boroughsList";

interface BoroughSelectorProps {
  boroughData: string;
  area: string;
  updateBoroughData: (e: SyntheticEvent) => void;
}

function BoroughSelector({
  boroughData,
  area,
  updateBoroughData,
}: BoroughSelectorProps) {
  const [boroughOptions, setBoroughOptions] = useState<string[]>([]);

  useEffect(() => {
    setBoroughOptions(boroughs[area as keyof typeof boroughs] || []);
  }, [area]);

  return (
    <div className="field">
      <label className="label">Borough</label>
      <div className="control">
        <div className="select">
          <select
            name="borough"
            value={boroughData}
            onChange={updateBoroughData}
          >
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
