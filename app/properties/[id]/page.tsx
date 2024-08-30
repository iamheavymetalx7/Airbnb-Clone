import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { fetchPropertyDetails } from "@/utils/actions";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";

const DynamicMap = dynamic(
  () => import("@/components/properties/PropertyMap"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  }
);

const DynamicBookingWrapper = dynamic(
  () => import("@/components/booking/BookingWrapper"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[200px] w-full" />,
  }
);

import Amenities from "@/components/properties/Amenities";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReviews from "@/components/reviews/PropertyReviews";

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const { userId } = auth();
  const property = await fetchPropertyDetails(params.id);
  if (!property) redirect("/");
  const isNotOwner = property.profile.clerkId !== userId;
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, property.id));
  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const firstName = property.profile.firstName;
  const profileImage = property.profile.profileImage;

  return (
    <section>
      <BreadCrumbs name={property.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold ">{property.tagline}</h1>
        <div className="flex items-center gap-x-4">
          {/* share button */}
          <div className="flex items-center gap-x-4">
            <ShareButton name={property.name} propertyId={property.id} />
            <FavoriteToggleButton propertyId={property.id} />
          </div>{" "}
        </div>
      </header>
      <ImageContainer mainImage={property.image} name={property.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className="mt-4" />
          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          {/* calendar */}
          <DynamicBookingWrapper
            propertyId={property.id}
            price={property.price}
            bookings={property.bookings}
          />{" "}
        </div>
      </section>
      <section>
        <section></section>
        {/* after two column section */}
        {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
        <PropertyReviews propertyId={property.id} />
      </section>
    </section>
  );
}
export default PropertyDetailsPage;

/*

Lazy Loading: Components wrapped with dynamic are lazy loaded. This means that the component code is
 not loaded until it is needed. For example, if you have a component that is only visible when a user
  clicks a button, you could use dynamic to ensure that the code for that component is not loaded 
  until the button is clicked.

Server Side Rendering (SSR) Control: By default, Next.js pre-renders every page. This means that it
 generates HTML for each page in advance, instead of doing it all on the client-side. However, with
  dynamic, you can control this behavior. You can choose to disable SSR for specific modules, which 
  can be useful for modules that have client-side dependencies.


*/
