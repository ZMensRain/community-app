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
}

export { Issue, IssueType, IssueTypeEnum };
