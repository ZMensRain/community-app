import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const renderBackdrop = (props: any) => (
  <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
);

export default renderBackdrop;
