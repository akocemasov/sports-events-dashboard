import { EventDetailView } from '@/features/events/components/EventDetailView';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <EventDetailView eventId={id} />;
}
