interface PointsListProps {
  text: string;
}

import { BsDot } from "react-icons/bs";

const PointsList: React.FC<PointsListProps> = ({ text }) => {
  const formattedText = text?.replace(/\\n/g, "\n");

  const points = formattedText
    ?.split("\n")
    .filter((point) => point.trim() !== "");

  return (
    <ul className="space-y-1">
      {points?.map((point, index) => (
        <li key={index} className="flex items-start">
          {points.length > 1 && (
            <p>
              <BsDot size={28} />
            </p>
          )}
          <p>{point}</p>
        </li>
      ))}
    </ul>
  );
};

export default PointsList;
