import fetchNotes from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

const NotePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    // Передаємо аргумент з queryKey у fetchNotes, щоб уникнути помилки "expected 1, got 0"
    queryFn: () => fetchNotes({ search: "", page: 1 }),
  });

  return (
    // HydrationBoundary передає "заморожений" кеш у клієнтську частину
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotePage;
