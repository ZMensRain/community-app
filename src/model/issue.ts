import { LatLng } from "react-native-maps";
import { Database } from "~/database.types";

enum IssueTypeEnum {
  PotHole,
  Dumping,
  BrokenLight,
}

type IssueType = string | IssueTypeEnum;

interface Issue {
  type: IssueType;
  coordinates: LatLng;
  description: string;
  creatorId: string;
  createdAt: Date;
}

const IssueFromDatabase = (
  data: Database["public"]["Tables"]["issues"]["Row"]
) => {
  const location = data.location as { coordinates: number[] };
  let issue: Issue = {
    createdAt: new Date(data.created_at),
    creatorId: data.created_by,
    description: data.description ?? "error",
    type: data.type ?? "error",
    coordinates: {
      latitude: location.coordinates[1],
      longitude: location.coordinates[0],
    },
  };
  return issue;
};

export { Issue, IssueType, IssueTypeEnum, IssueFromDatabase };
