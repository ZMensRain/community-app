import { LatLng } from "react-native-maps";

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

export { Issue, IssueType, IssueTypeEnum };
