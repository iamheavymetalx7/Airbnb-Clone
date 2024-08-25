// import { FaHeart } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
//   return (
//     <Button size="icon" variant="outline" className="p-2 cursor-pointer">
//       <FaHeart />
//     </Button>
//   );
// }
// export default FavoriteToggleButton;

import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";
async function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
  const { userId } = auth();
  if (!userId) return <CardSignInButton />;
  const favoriteId = await fetchFavoriteId({ propertyId });

  return <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />;
}
export default FavoriteToggleButton;
