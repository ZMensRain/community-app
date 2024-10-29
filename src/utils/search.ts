import { pascalToTitleCase } from "./stylingValue";

export function getSearchResults(searched: string, quickAccess: string[]) {
  let match: Boolean = false;

  return (
    quickAccess
      .filter((value) => {
        // sets match to true so the user input will not be shown if not needed
        if (!match)
          match =
            value.toLowerCase().replaceAll(" ", "").trim() ===
            searched.toLowerCase().replaceAll(" ", "").trim();

        return (
          isNaN(Number(value)) &&
          value
            .toLowerCase()
            .startsWith(searched.toLowerCase().replaceAll(" ", "").trim())
        );
      })
      /*Adds the content the UserTyped if necessary*/
      .concat(searched !== "" && match === false ? [searched] : [])
      .map((value) => pascalToTitleCase(value))
  );
}
