import BusinessCardClient from "@/components/_basic/client/BusinessCardClient";

export default async function BusinessCardPage({ searchParams }: { searchParams: { id: string } }) {
  const id = searchParams.id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/business-cards/preview?id=${id}`, {
    cache: "no-store",
  });

  const { businessCard } = await res.json();

  return <BusinessCardClient data={businessCard} />;
}
